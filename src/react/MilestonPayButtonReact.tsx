import React, { useEffect, useRef } from "react";
import { MilestonPayButton, MilestonPayButtonOptions } from "../core/MilestonPayButton";

interface Props extends Omit<MilestonPayButtonOptions, "container"> {}

const MilestonPayButtonReact: React.FC<Props> = ({ buttonText, onPaymentComplete, paymentUrl, paymentType, paymentId, buttonStyle }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const button = new MilestonPayButton({
        container: containerRef.current,
        buttonText,
        onPaymentComplete,
        paymentUrl,
        paymentType,
        paymentId,
        buttonStyle,
      })

      return () => button.destroy() // Clean up on unmount
    }
  }, [buttonText, onPaymentComplete, paymentUrl, paymentType, paymentId, buttonStyle])

  return <div ref={containerRef}></div>
}

export default MilestonPayButtonReact
