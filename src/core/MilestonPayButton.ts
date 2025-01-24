export interface MilestonPayButtonOptions {
  paymentUrl?: string
  paymentType?: "payment-link" | "invoice" | "recurring-payment"
  onPaymentComplete: () => void
  onPaymentError: (error: Error) => void
}

export class MilestonPayButton {
  private options: MilestonPayButtonOptions
  private button: HTMLButtonElement
  private isLoading = false
  private isVerifying = false
  private isComplete = false

  constructor(buttonElement: HTMLButtonElement, options: MilestonPayButtonOptions) {
    this.button = buttonElement
    this.options = options
    this.button.addEventListener("click", this.handleClick.bind(this))
  }

  private getVerificationEndpoint(type: string): string {
    switch (type) {
      case "invoice":
        return "https://invoice-service.mileston.co/invoice/verify"
      case "payment-link":
        return "https://payment-service.mileston.co/payment-link/verify"
      case "recurring-payment":
        return "https://recurring-service.mileston.co/recurring-payment/verify"
      default:
        throw new Error("Invalid payment type")
    }
  }

  private async verifyPayment(type: string, id: string, walletAddress: string): Promise<boolean> {
    try {
      const endpoint = this.getVerificationEndpoint(type)
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress, id }),
      })
      if (!response.ok) {
        throw new Error("Payment verification request failed")
      }
      const data = await response.json()
      if (data.success) {
        return true
      } else if (data.error) {
        return false
      } else {
        throw new Error("Invalid response from verification endpoint")
      }
    } catch (error) {
      console.error("Error verifying payment:", error)
      throw error
    }
  }

  private async handleClick() {
    if (this.isLoading || this.isVerifying || this.isComplete) return

    this.isLoading = true
    this.updateButtonState()

    try {
      const popupWidth = 500
      const popupHeight = 500

      const screenWidth = window.innerWidth || document.documentElement.clientWidth || screen.width
      const screenHeight = window.innerHeight || document.documentElement.clientHeight || screen.height

      const systemLeft = (screenWidth - popupWidth) / 2
      const systemTop = (screenHeight - popupHeight) / 2

      const url =
        this.options.paymentUrl ||
        (this.options.paymentType
          ? `https://checkout.mileston.co/${this.options.paymentType}`
          : "https://demo.mileston.co/pay")

      const authWindow = window.open(
        url,
        "_blank",
        `width=${popupWidth},height=${popupHeight},toolbar=no,menubar=no,scrollbars=yes,resizable=no,top=${systemTop},left=${systemLeft}`,
      )

      if (authWindow) {
        window.addEventListener(
          "message",
          async (event) => {
            if (event.origin === "https://checkout.mileston.co" && event.data.walletAddress && event.data.paymentId) {
              authWindow.close()
              this.isVerifying = true
              this.updateButtonState()
              try {
                const success = await this.verifyPayment(
                  this.options.paymentType || "payment-link",
                  event.data.paymentId,
                  event.data.walletAddress,
                )
                if (success) {
                  this.isComplete = true
                  this.options.onPaymentComplete()
                } else {
                  throw new Error("Payment was not successful")
                }
              } catch (error) {
                this.options.onPaymentError(error as Error)
              } finally {
                this.isVerifying = false
                this.isLoading = false
                this.updateButtonState()
              }
            }
          },
          { once: true },
        )

        const timer = setInterval(() => {
          if (authWindow.closed) {
            clearInterval(timer)
            this.isLoading = false
            this.updateButtonState()
          }
        }, 500)
      }
    } catch (error) {
      console.error("Error in payment flow:", error)
      this.options.onPaymentError(error as Error)
      this.isLoading = false
      this.updateButtonState()
    }
  }

  private updateButtonState() {
    this.button.disabled = this.isLoading || this.isVerifying || this.isComplete

    if (this.isVerifying) {
      this.button.textContent = "Verifying Payment"
    } else if (this.isComplete) {
      this.button.textContent = "Payment Complete"
    } else {
      this.button.textContent = this.button.textContent || "Pay Now"
    }

    if (this.isLoading || this.isVerifying) {
      const loadingIcon = document.createElement("span")
      loadingIcon.textContent = "⟳"
      loadingIcon.className = "loading-icon"
      this.button.prepend(loadingIcon)
    } else {
      const loadingIcon = this.button.querySelector(".loading-icon")
      if (loadingIcon) {
        loadingIcon.remove()
      }
    }
  }
}

