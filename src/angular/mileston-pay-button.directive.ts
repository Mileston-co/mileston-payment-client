import { Directive, ElementRef, Input, OnDestroy, OnInit } from "@angular/core"
import { MilestonPayButton } from "../core/MilestonPayButton"

@Directive({
  selector: "[milestonPayButton]",
})
export class MilestonPayButtonDirective implements OnInit, OnDestroy {
  @Input() buttonText!: string
  @Input() onPaymentComplete!: () => void
  @Input() paymentUrl?: string
  @Input() paymentType?: "payment-link" | "invoice" | "recurring-payment"
  @Input() paymentId?: string
  @Input() buttonStyle?: Partial<CSSStyleDeclaration>

  private payButton?: MilestonPayButton

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.payButton = new MilestonPayButton({
      container: this.el.nativeElement,
      buttonText: this.buttonText,
      onPaymentComplete: this.onPaymentComplete,
      paymentUrl: this.paymentUrl,
      paymentType: this.paymentType,
      paymentId: this.paymentId,
      buttonStyle: this.buttonStyle,
    })
  }

  ngOnDestroy() {
    this.payButton?.destroy()
  }
}
