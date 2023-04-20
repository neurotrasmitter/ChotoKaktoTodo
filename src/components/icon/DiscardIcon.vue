<template>
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :style="strokeColor"
      d="M10.5 8.56L12 10.06M12 10.06L13.5 11.56M12 10.06L13.5 8.56M12 10.06L10.5 11.56M8.25 5H15.75C16.4404 5 17 5.58763 17 6.3125V19L12 15.5L7 19V6.3125C7 5.58763 7.55964 5 8.25 5Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: "DiscardIcon",
  props: {
    color: {
      type: String,
      default: "#6C6C6C",
    },
  },
  computed: {
    strokeColor() {
      return `stroke: ${this.color}`;
    },
  },
};
</script>

<style scoped></style>
