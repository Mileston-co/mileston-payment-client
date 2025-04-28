import { PaymentContextProps, PaymentProviderProps } from "@/types";
import { createContext, useContext, useState } from "react";

const PaymentContext = createContext<PaymentContextProps | null>(null);

export function MilestonPaymentProvider({ apikey, businessid, children }: PaymentProviderProps) {
  const [contextValue] = useState<PaymentContextProps>({ apikey, businessid });

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePaymentContext() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePaymentContext must be used inside a PaymentProvider");
  }
  return context;
}
