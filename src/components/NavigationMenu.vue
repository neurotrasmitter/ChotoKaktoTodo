<template>
  <div class="navigation-menu">
    <ul class="routes-list">
      <li>
        <router-link to="/" tag="li" exact-active-class="active-link"
          ><p class="text">Работа</p></router-link
        >
      </li>
      <li>
        <router-link to="/home" tag="li" exact-active-class="active-link"
          ><p class="text">Дом</p></router-link
        >
      </li>
      <li>
        <router-link to="/family" tag="li" exact-active-class="active-link"
          ><p class="text">Семья</p></router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavigationMenu",
};
</script>

<style scoped>
.navigation-menu {
  margin-top: 0;
  padding-top: 0;
  position: fixed;
  z-index: 1;
  width: 160px;
  height: 100%;
  background-color: #f9f9f9;
}

.routes-list {
  list-style-type: none;
  margin-top: 0px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 104px;
}

.text {
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 5px;
  margin-right: 5px;
  font-weight: 700;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.active-link {
  background-color: #eef4f3;
  border-radius: 7px;
}
</style>
