/**
 * Configuration options for the MilestonPayButton
 */
export interface MilestonPayButtonOptions {
  /** Element to attach the button to */
  container: HTMLElement
  /** Text to display on the button */
  buttonText: string
  /** Function to call when payment is complete */
  onPaymentComplete: () => void
  /** URL for the payment page */
  paymentUrl?: string
  /** Type of payment */
  paymentType?: "payment-link" | "invoice" | "recurring-payment"
  /** ID of the payment */
  paymentId?: string
  /** Custom styles for the button */
  buttonStyle?: Partial<CSSStyleDeclaration>
}

/**
 * MilestonPayButton class for creating and managing a payment button
 */
export class MilestonPayButton {
  private button: HTMLButtonElement
  private popupWindow: Window | null = null
  private options: MilestonPayButtonOptions

  constructor(options: MilestonPayButtonOptions) {
    this.options = options
    this.button = this.createButton()
    this.attachButton()
    this.setupEventListeners()
  }

  private createButton(): HTMLButtonElement {
    const button = document.createElement("button")
    button.textContent = this.options.buttonText
    this.applyStyles(button)
    return button
  }

  private applyStyles(button: HTMLButtonElement): void {
    const defaultStyles: Partial<CSSStyleDeclaration> = {
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
    }

    Object.assign(button.style, defaultStyles, this.options.buttonStyle)
  }

  private attachButton(): void {
    this.options.container.appendChild(this.button)
  }

  private setupEventListeners(): void {
    this.button.addEventListener("click", this.openPopup.bind(this))
  }

  private openPopup(): void {
    const width = 500
    const height = 600
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    const url = this.getPaymentUrl()

    if (!url) {
      console.error("MilestonPayButton: No payment URL provided")
      return
    }

    this.popupWindow = window.open(url, "PaymentPopup", `width=${width},height=${height},left=${left},top=${top}`)

    if (this.popupWindow) {
      this.checkPopupClosed()
    }
  }

  private getPaymentUrl(): string {
    if (this.options.paymentUrl) {
      return this.options.paymentUrl
    }

    if (this.options.paymentType && this.options.paymentId) {
      return `https://checkout.mileston.co/${this.options.paymentType}/${this.options.paymentId}`
    }

    return ""
  }

  private checkPopupClosed(): void {
    if (this.popupWindow && this.popupWindow.closed) {
      this.options.onPaymentComplete()
    } else {
      setTimeout(() => this.checkPopupClosed(), 1000)
    }
  }

  /**
   * Update the button text
   * @param text New text for the button
   */
  public updateButtonText(text: string): void {
    this.button.textContent = text
  }

  /**
   * Update the button styles
   * @param styles New styles for the button
   */
  public updateButtonStyle(styles: Partial<CSSStyleDeclaration>): void {
    Object.assign(this.button.style, styles)
  }

  /**
   * Remove the button from the DOM
   */
  public destroy(): void {
    this.button.removeEventListener("click", this.openPopup)
    this.options.container.removeChild(this.button)
  }
}

