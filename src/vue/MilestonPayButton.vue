<template>
  <button :style="computedStyles" @click="handleClick">{{ buttonText }}</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "MilestonPayButton",
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    paymentUrl: {
      type: String,
      required: true,
    },
    buttonStyle: {
      type: Object as PropType<Record<string, string | number>>,
      default: () => ({}),
    },
    onPaymentComplete: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  computed: {
    computedStyles(): Record<string, string | number> {
      return {
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        ...this.buttonStyle,
      };
    },
  },
  methods: {
    handleClick() {
      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      const popup = window.open(this.paymentUrl, "PaymentPopup", `width=${width},height=${height},left=${left},top=${top}`);

      if (popup) {
        const timer = setInterval(() => {
          if (popup.closed) {
            clearInterval(timer);
            this.onPaymentComplete();
          }
        }, 1000);
      }
    },
  },
});
</script>
