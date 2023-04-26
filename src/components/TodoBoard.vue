<template>
  <div class="main-container">
    <h2
      v-if="!isCurrentTaskEmpty || isCompletedTaskEmpty"
      class="list-name first-list"
    >
      СДЕЛАТЬ
    </h2>
    <ul class="list">
      <li v-for="record of currentTasks" :key="record.id" class="list-item">
        <TodoRecord :record="record" :storage="recordStorage"></TodoRecord>
      </li>
    </ul>
    <h2 v-if="!isCompletedTaskEmpty" class="list-name">СДЕЛАНО</h2>
    <ul class="list">
      <li v-for="record of completedTask" :key="record.id" class="list-item">
        <TodoRecord :record="record" :storage="recordStorage"></TodoRecord>
      </li>
    </ul>
    <div
      class="input-form"
      :class="{ 'empty-task': isCurrentTaskEmpty && isCompletedTaskEmpty }"
    >
      <input
        type="text"
        placeholder="Введите текст задачи"
        v-model.trim="text"
        minlength="1"
        maxlength="128"
        required
        class="input-text"
        @keyup.enter="createRecord()"
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
    isCurrentTaskEmpty() {
      if (
        this.storage[this.recordStorage].filter((el) => el.checked === false)
          .length > 0
      ) {
        return false;
      } else {
        return true;
      }
    },
    completedTask() {
      return this.storage[this.recordStorage].filter(
        (el) => el.checked === true
      );
    },
    isCompletedTaskEmpty() {
      if (
        this.storage[this.recordStorage].filter((el) => el.checked === true)
          .length
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    $route(to) {
      this.recordStorage = to.name;
    },
  },
  methods: {
    ...mapActions(["actionCreateRecord", "actionSetId", "actionSaveRecords"]),
    createRecord() {
      if (this.text.length > 0) {
        this.actionCreateRecord({
          text: this.text,
          storage: this.recordStorage,
          id: this.getMaxId + 1,
        });
        this.text = "";
        this.actionSaveRecords();
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
  margin: 0;
  padding-left: 52px;
  padding-right: 52px;
}

.list-item {
  margin-top: 5px;
  margin-bottom: 5px;
}

.list-name {
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 31px;
  padding-bottom: 3px;
  color: #6c6c6c;
}

.main-container {
  padding-top: 36px;
}

.input-form {
  margin-left: 52px;
  margin-right: 52px;
  margin-top: 20px;
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

.empty-task {
}
</style>
