# Mileston Payment Client

Mileston Payment Client is a versatile payment button component library designed for seamless integration into projects using plain JavaScript, React, Angular, and Vue. It provides a customizable button that triggers a payment popup and notifies you when the payment process is complete. Other components will be added in future updates. Feel free to open a PR!
Contact [tomiwaphilip@mileston.co](mailto:tomiwaphilip@mileston.co) if you have any issues integrating this.

## Installation

First, install the package via npm:

```bash
npm install mileston-payment-client
```

---

## Usage

### Core Class (Vanilla JavaScript)

For plain JavaScript users, the library provides the [`MilestonPayButton`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Fcore%2FMilestonPayButton.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A9%2C%22character%22%3A13%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Findex.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A1%2C%22character%22%3A9%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A19%2C%22character%22%3A54%7D%7D%5D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "Go to definition") class that can be instantiated and used directly.

#### Example

```javascript
import { MilestonPayButton } from 'mileston-payment-client';

const container = document.getElementById('payment-button-container');

const payButton = new MilestonPayButton(container, {
  buttonText: 'Pay Now',
  onPaymentComplete: () => {
    console.log('Payment complete!');
  },
  onPaymentDataReceived: (data) => {
    console.log('Payment data received:', data);
  },
  onPaymentError: (error) => {
    console.error('Payment error:', error);
  },
  paymentUrl: 'https://example.com/payment',
});

// Optional: Update button text or styles later
payButton.updateButtonText('Checkout');
payButton.updateButtonStyle({ backgroundColor: 'blue', color: 'white' });
```

### React Integration

For React projects, the library provides a dedicated React component.

#### Example

```tsx
import React from 'react';
import { PayButton } from 'mileston-payment-client';

function App() {
  return (
    <div>
      <PayButton
        onPaymentComplete={() => console.log('Payment complete!')}
        onPaymentDataReceived={(data) => console.log('Payment data received:', data)}
        onPaymentError={(error) => console.error('Payment error:', error)}
        paymentUrl="https://checkout.mileston.co/payment"
        style={{ backgroundColor: 'green', color: 'white' }}
      >
        Pay Now
      </PayButton>
    </div>
  );
}

export default App;
```

### Angular Integration

For Angular projects, the library provides a dedicated Angular component.

#### Example

```typescript
import { Component } from '@angular/core';
import { MilestonPayButton } from 'mileston-payment-client';

@Component({
  selector: 'app-root',
  template: `<div id="payment-button-container"></div>`,
})
export class AppComponent {
  ngOnInit() {
    const container = document.getElementById('payment-button-container');

    const payButton = new MilestonPayButton(container, {
      buttonText: 'Pay Now',
      onPaymentComplete: () => {
        console.log('Payment complete!');
      },
      onPaymentDataReceived: (data) => {
        console.log('Payment data received:', data);
      },
      onPaymentError: (error) => {
        console.error('Payment error:', error);
      },
      paymentUrl: 'https://example.com/payment',
    });
  }
}
```

### Vue Integration

For Vue projects, the library provides a dedicated Vue component.

#### Example

```vue
<template>
  <div id="payment-button-container"></div>
</template>

<script>
import { MilestonPayButton } from 'mileston-payment-client';

export default {
  name: 'App',
  mounted() {
    const container = this.$el.querySelector('#payment-button-container');

    const payButton = new MilestonPayButton(container, {
      buttonText: 'Pay Now',
      onPaymentComplete: () => {
        console.log('Payment complete!');
      },
      onPaymentDataReceived: (data) => {
        console.log('Payment data received:', data);
      },
      onPaymentError: (error) => {
        console.error('Payment error:', error);
      },
      paymentUrl: 'https://example.com/payment',
    });
  },
};
</script>
```

---

## Customization Options

### Configuration Options

All integrations support the following options:

| Option              | Type                  | Required | Description                                                 |
|---------------------|-----------------------|----------|-------------------------------------------------------------|
| [`container`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A26%2C%22character%22%3A6%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A147%2C%22character%22%3A3%7D%7D%5D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "Go to definition")         | [`HTMLElement`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A147%2C%22character%22%3A25%7D%7D%5D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "Go to definition")         | Yes      | The DOM element to attach the button to (Core only).        |
| [`buttonText`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A30%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A148%2C%22character%22%3A3%7D%7D%5D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "Go to definition")        | [`string`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A148%2C%22character%22%3A25%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Fcore%2FMilestonPayButton.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A1%2C%22character%22%3A15%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Freact%2FMilestonPayButtonReact.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A16%2C%22character%22%3A49%7D%7D%5D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "Go to definition")              | Yes      | Text displayed on the button.                              |
| [`onPaymentComplete`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Fcore%2FMilestonPayButton.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A4%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Freact%2FMilestonPayButtonReact.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A10%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A31%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A149%2C%22character%22%3A3%7D%7D%5D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "Go to definition") | `() => void`          | Yes      | Callback triggered when the payment is complete.           |
| [`onPaymentDataReceived`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Fcore%2FMilestonPayButton.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A5%2C%22character%22%3A2%7D%7D%5D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "Go to definition") | `(data: { walletAddress: string, id: string }) => void` | Yes | Callback triggered when payment data is received. |
| [`onPaymentError`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Fcore%2FMilestonPayButton.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A6%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Freact%2FMilestonPayButtonReact.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A18%2C%22character%22%3A2%7D%7D%5D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "Go to definition")    | `(error: Error) => void` | Yes    | Callback triggered when payment fails.                     |
| [`paymentUrl`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Fcore%2FMilestonPayButton.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A1%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Freact%2FMilestonPayButtonReact.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A24%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A34%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A150%2C%22character%22%3A3%7D%7D%5D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "Go to definition")        | [`string`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A148%2C%22character%22%3A25%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Fcore%2FMilestonPayButton.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A1%2C%22character%22%3A15%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Freact%2FMilestonPayButtonReact.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A16%2C%22character%22%3A49%7D%7D%5D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "Go to definition")              | No       | URL of the payment page.                                    |
| [`paymentType`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Fcore%2FMilestonPayButton.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A3%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Freact%2FMilestonPayButtonReact.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A28%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A151%2C%22character%22%3A3%7D%7D%5D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "Go to definition")       | `"payment-link" \| "invoice" \| "recurring-payment"` | No       | Type of payment (used to auto-generate [`paymentUrl`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Fcore%2FMilestonPayButton.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A1%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Freact%2FMilestonPayButtonReact.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A24%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A34%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A150%2C%22character%22%3A3%7D%7D%5D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "Go to definition")).       |
| [`paymentId`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Fcore%2FMilestonPayButton.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A2%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Freact%2FMilestonPayButtonReact.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A26%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A152%2C%22character%22%3A3%7D%7D%5D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "Go to definition")         | [`string`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A148%2C%22character%22%3A25%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Fcore%2FMilestonPayButton.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A1%2C%22character%22%3A15%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Freact%2FMilestonPayButtonReact.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A16%2C%22character%22%3A49%7D%7D%5D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "Go to definition")              | No       | ID of the payment (used to auto-generate [`paymentUrl`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Fcore%2FMilestonPayButton.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A1%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Fsrc%2Freact%2FMilestonPayButtonReact.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A24%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A34%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A150%2C%22character%22%3A3%7D%7D%5D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "Go to definition")).     |
| [`buttonStyle`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A60%2C%22character%22%3A8%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A153%2C%22character%22%3A3%7D%7D%5D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "Go to definition")       | `Partial<CSSStyleDeclaration>` | No       | Custom styles for the button.                              |

### API Methods

- **`updateButtonText(text: string): void`**: Updates the button's text.
- **`updateButtonStyle(styles: Partial<CSSStyleDeclaration>): void`**: Updates the button's styles.
- **`destroy(): void`**: Removes the button from the DOM and cleans up event listeners.

---

## Development Notes

### Common Issues

- **TypeScript Errors**: Ensure your [`tsconfig.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Ftsconfig.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "/Users/mac/Documents/Coding/mileston-payment-client/tsconfig.json") includes:

  ```json
  {
    "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
  }
  ```

- **JSX Error**: If you see errors about JSX not being set, make sure your [`tsconfig.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Ftsconfig.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "/Users/mac/Documents/Coding/mileston-payment-client/tsconfig.json") has:

  ```json
  {
    "jsx": "react-jsx"
  }
  ```

### Why `vite/client`?
If you see references to `vite/client` in the project, it's likely because your Vue component requires specific module resolution for `.vue` files. Ensure you include it in [`tsconfig.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2Ftsconfig.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "/Users/mac/Documents/Coding/mileston-payment-client/tsconfig.json") under [`types`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FCoding%2Fmileston-payment-client%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A184%2C%22character%22%3A196%7D%7D%5D%2C%2233ad9772-a863-4790-a829-82980026e161%22%5D "Go to definition"):

```json
{
  "compilerOptions": {
    "types": ["vite/client"]
  }
}
```

---

## License
This library is licensed under the MIT License. See the LICENSE file for details.