<template>
  <div id="app">
    <NavigationMenu class="nav-bar"></NavigationMenu>
    <router-view class="main-content" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import NavigationMenu from "@/components/NavigationMenu";
export default {
  components: { NavigationMenu },
  computed: {
    ...mapState(["storage"]),
    ...mapGetters(["getMaxId"]),
  },
  methods: {
    ...mapActions(["restoreRecords", "resetRecordsToDefault"]),
  },
  mounted() {
    try {
      this.restoreRecords();
    } catch (e) {
      this.resetRecordsToDefault();
    }
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: Roboto;
  src: url("@/assets/fonts/Roboto/Roboto-Light.ttf");
}

#app {
  font-family: "Roboto", serif;
  font-weight: 100;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main-content {
  margin-left: 160px;
}

a {
  text-decoration: none;
  color: #6c6c6c;
}

body {
  margin: 0;
  padding-top: 0;
}

input,
button {
  border: none;
}

*:hover,
*:focus {
  outline: none;
}
</style>
