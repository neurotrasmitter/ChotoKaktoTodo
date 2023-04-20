<template>
  <div>
    <p class="list-name first-list">СДЕЛАТЬ</p>
    <ul class="list">
      <li v-for="record of currentTasks" :key="record.id" class="list-item">
        <TodoRecord :record="record" :storage="recordStorage"></TodoRecord>
      </li>
    </ul>
    <p class="list-name">СДЕЛАНО</p>
    <ul class="list">
      <li v-for="record of completedTask" :key="record.id" class="list-item">
        <TodoRecord :record="record" :storage="recordStorage"></TodoRecord>
      </li>
    </ul>
    <div class="input-form">
      <input
        type="text"
        class="input-text"
        placeholder="Введите текст задачи"
        @keyup.enter="createRecord()"
        v-model="text"
        minlength="1"
        maxlength="128"
        required
      />
      <button @click="createRecord" class="input-button">Создать</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import TodoRecord from "@/components/TodoRecord";

export default {
  name: "TodoBoard",
  components: { TodoRecord },
  data() {
    return {
      text: "",
      recordStorage: this.$route.name,
    };
  },
  computed: {
    ...mapState(["storage"]),
    ...mapGetters(["getMaxId"]),
    currentTasks() {
      return this.storage[this.recordStorage].filter(
        (el) => el.checked === false
      );
    },
    completedTask() {
      return this.storage[this.recordStorage].filter(
        (el) => el.checked === true
      );
    },
  },
  watch: {
    $route(to) {
      this.recordStorage = to.name;
    },
  },
  methods: {
    ...mapActions({
      recordCreate: "createRecord",
      saveRecords: "saveRecords",
      setId: "setId",
    }),
    createRecord() {
      this.text = this.text.trim();
      if (this.text.length > 0) {
        this.recordCreate({
          text: this.text,
          storage: this.recordStorage,
          id: this.getMaxId + 1,
        });
        this.text = "";
        this.saveRecords();
      } else {
        alert("Поле не должно быть пустым");
      }
    },
  },
};
</script>

<style scoped>
.list {
  list-style-type: none;
  padding-left: 52px;
  padding-right: 52px;
}

.list-item {
  margin-top: 5px;
  margin-bottom: 5px;
}

.list-name {
  text-align: center;
  padding-top: 31px;
  padding-bottom: 3px;
  color: #6c6c6c;
}

.first-list {
  padding-top: 67px;
}

.input-form {
  margin-left: 52px;
  margin-right: 52px;
  background: #ffffff;
  border: 3px solid #e4e4e4;
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
}

.input-text {
  padding: 0 0 0 12px;
  width: 100%;
  height: 39px;
}

.input-button {
  background: #eef4f3;
  border-radius: 0 3px 3px 0;
  height: 35px;
  width: 123px;
  align-self: center;
  margin-right: 2px;
}
</style>
