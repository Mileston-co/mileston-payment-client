# Mileston Payment Client

Mileston Payment Client is a versatile payment button component library designed for seamless integration into projects using plain JavaScript, React, Angular, and Vue. It provides a customizable button that triggers a payment popup and notifies you when the payment process is complete. Other components would be added in future updates. Feel free to open a PR!
Contact [tomiwaphilip@mileston.co](mailto:tomiwaphilip@mileston.co) if you have any issues integrating this.

## Installation

First, install the package via npm:

```bash
npm install mileston-payment-client
```

---

## Usage

### Core Class (Vanilla JavaScript)

For plain JavaScript users, the library provides the `MilestonPayButton` class that can be instantiated and used directly.

#### Example

```javascript
import { MilestonPayButton } from 'mileston-pay-button';

const container = document.getElementById('payment-button-container');

const payButton = new MilestonPayButton({
  container,
  buttonText: 'Pay Now',
  onPaymentComplete: () => {
    console.log('Payment complete!');
  },
  paymentUrl: 'https://example.com/payment',
});

// Optional: Update button text or styles later
payButton.updateButtonText('Checkout');
payButton.updateButtonStyle({ backgroundColor: 'blue', color: 'white' });
```

---

### React Integration

For React projects, the library provides a dedicated React component.

#### Example

```tsx
import React from 'react';
import { MilestonPayButtonReact } from 'mileston-pay-button/react';

function App() {
  return (
    <div>
      <MilestonPayButtonReact
        buttonText="Pay Now"
        onPaymentComplete={() => console.log('Payment complete!')}
        paymentUrl="https://example.com/payment"
        buttonStyle={{ backgroundColor: 'green', color: 'white' }}
      />
    </div>
  );
}

export default App;
```

---

### Angular Integration

For Angular projects, the library includes a module and directive for easy integration.

#### Step 1: Import the Module

In your Angular app module, import `MilestonPayButtonModule`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MilestonPayButtonModule } from 'mileston-pay-button/angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MilestonPayButtonModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

#### Step 2: Use the Directive

In your component template, use the `mileston-pay-button` directive:

```html
<div
  mileston-pay-button
  [buttonText]="'Pay Now'"
  [paymentUrl]="'https://example.com/payment'"
  (onPaymentComplete)="handlePaymentComplete()"
  [buttonStyle]="{ backgroundColor: 'red', color: 'white' }"
></div>
```

#### Step 3: Handle Events

In your component class:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  handlePaymentComplete() {
    console.log('Payment complete!');
  }
}
```

---

### Vue Integration

For Vue users, update is on the way. Feel free to open a PR.

---

## Customization Options

### Configuration Options

All integrations support the following options:

| Option              | Type                  | Required | Description                                                 |
|---------------------|-----------------------|----------|-------------------------------------------------------------|
| `container`         | `HTMLElement`         | Yes      | The DOM element to attach the button to (Core only).        |
| `buttonText`        | `string`              | Yes      | Text displayed on the button.                              |
| `onPaymentComplete` | `() => void`          | Yes      | Callback triggered when the payment is complete.           |
| `paymentUrl`        | `string`              | No       | URL of the payment page.                                    |
| `paymentType`       | `"payment-link" \| "invoice" \| "recurring-payment"` | No       | Type of payment (used to auto-generate `paymentUrl`).       |
| `paymentId`         | `string`              | No       | ID of the payment (used to auto-generate `paymentUrl`).     |
| `buttonStyle`       | `Partial<CSSStyleDeclaration>` | No       | Custom styles for the button.                              |

### API Methods

- **`updateButtonText(text: string): void`**: Updates the button's text.
- **`updateButtonStyle(styles: Partial<CSSStyleDeclaration>): void`**: Updates the button's styles.
- **`destroy(): void`**: Removes the button from the DOM and cleans up event listeners.

---

## Development Notes

### Common Issues

- **TypeScript Errors**: Ensure your `tsconfig.json` includes:
  
  ```json
  {
    "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
  }
  ```

- **JSX Error**: If you see errors about JSX not being set, make sure your `tsconfig.json` has:
  
  ```json
  {
    "jsx": "react-jsx"
  }
  ```

### Why `vite/client`?
If you see references to `vite/client` in the project, it's likely because your Vue component requires specific module resolution for `.vue` files. Ensure you include it in `tsconfig.json` under `types`:

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