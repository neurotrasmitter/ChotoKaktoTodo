<template>
  <div class="navigation-menu">
    <ul class="routes-list">
      <li>
        <router-link to="/work" tag="li" exact-active-class="active-link"
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
  position: fixed;
  z-index: 1;
  background-color: #f9f9f9;
  margin-top: 0;
  padding-top: 0;
  width: 212px;
  height: 100%;
}

.routes-list {
  list-style-type: none;
  margin-top: 0;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 104px;
}

.text {
  font-weight: 700;
  font-size: 16px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 5px;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 5px;
}

.active-link {
  background-color: #eef4f3;
  border-radius: 7px;
}
</style>
