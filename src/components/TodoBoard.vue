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
        <TodoRecord
          :record="record"
          @changeStatus="changeStatus"
          @changeText="changeText"
          @deleteRecord="deleteRecord"
        ></TodoRecord>
      </li>
    </ul>
    <h2 v-if="!isCompletedTaskEmpty" class="list-name">СДЕЛАНО</h2>
    <ul class="list">
      <li v-for="record of completedTask" :key="record.id" class="list-item">
        <TodoRecord
          :record="record"
          @changeStatus="changeStatus"
          @changeText="changeText"
          @deleteRecord="deleteRecord"
        ></TodoRecord>
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
import { mapState, mapMutations } from "vuex";

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
    currentTasks() {
      return this.storage[this.recordStorage].filter(
        (el) => el.checked === false
      );
    },
    isCurrentTaskEmpty() {
      return !this.currentTasks.length;
    },
    completedTask() {
      return this.storage[this.recordStorage].filter(
        (el) => el.checked === true
      );
    },
    isCompletedTaskEmpty() {
      return !this.completedTask.length;
    },
  },
  watch: {
    $route(to) {
      this.recordStorage = to.name;
    },
  },
  methods: {
    ...mapMutations([
      "mutationCreateRecord",
      "mutationSaveRecords",
      "mutationDeleteRecord",
    ]),
    createRecord() {
      if (this.text.length > 0) {
        this.mutationCreateRecord({
          text: this.text,
          storage: this.recordStorage,
        });
        this.text = "";
        this.mutationSaveRecords();
      } else {
        alert("Поле не должно быть пустым");
      }
    },
    changeStatus(event) {
      event.record.checked = !event.record.checked;
      this.mutationSaveRecords();
    },
    changeText(event) {
      event.record.text = event.text;
      this.mutationSaveRecords();
    },
    deleteRecord(event) {
      if (confirm("Вы действительно хотите удалить запись?")) {
        this.mutationDeleteRecord({
          record: event.record,
          storage: this.recordStorage,
        });
        this.mutationSaveRecords();
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
  color: #6c6c6c;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 31px;
  padding-bottom: 3px;
}

.main-container {
  padding-top: 36px;
}

.input-form {
  background: #ffffff;
  border: 3px solid #e4e4e4;
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  margin-left: 52px;
  margin-right: 52px;
  margin-top: 20px;
}

.input-text {
  width: 100%;
  height: 39px;
  padding: 0 0 0 12px;
}

.input-button {
  background: #eef4f3;
  border-radius: 0 3px 3px 0;
  align-self: center;
  margin-right: 2px;
  height: 35px;
  width: 123px;
}
</style>
