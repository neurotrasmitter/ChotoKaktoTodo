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
      d="M10.5 10.5L11.5 11.5L14 9M8.25 5H15.75C16.4404 5 17 5.58763 17 6.3125V19L12 15.5L7 19V6.3125C7 5.58763 7.55964 5 8.25 5Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: "ConfirmIcon",
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

<style scoped>
.path {
  stroke: black;
}

path:hover {
  stroke: red;
}
</style>
