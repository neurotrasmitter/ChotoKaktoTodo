<template>
  <div class="record-container">
    <input
      type="checkbox"
      :checked="checked"
      class="checkbox"
      @click="changeStatus"
    />
    <input
      type="text"
      v-if="editMode"
      v-model="textEditable"
      ref="textInput"
      minlength="1"
      maxlength="128"
      required
      class="text"
      @keyup.enter="confirmChange"
      @keyup.esc="discardChange"
    />
    <p
      v-else
      :title="text"
      class="text text-info"
      :class="{ 'text-completed': checked }"
    >
      {{ text }}
    </p>
    <button
      v-if="editMode"
      v-show="!checked"
      class="button left-button"
      @click="confirmChange"
      @mouseenter="confirmColor = '#6C7AC3'"
      @mouseleave="confirmColor = '#6C6C6C'"
    >
      <ConfirmIcon :color="confirmColor"></ConfirmIcon>
    </button>
    <button
      v-else
      v-show="!checked"
      class="button left-button"
      @click="changeMode"
      @mouseenter="pencilColor = '#6C7AC3'"
      @mouseleave="pencilColor = '#6C6C6C'"
    >
      <PencilIcon :color="pencilColor"></PencilIcon>
    </button>
    <button
      v-if="editMode"
      v-show="!checked"
      class="button right-button"
      @click="discardChange"
      @mouseenter="discardColor = '#D26161'"
      @mouseleave="discardColor = '#6C6C6C'"
    >
      <DiscardIcon :color="discardColor"></DiscardIcon>
    </button>
    <button
      v-else
      v-show="!checked"
      class="button right-button"
      @click="deleteRecord"
      @mouseenter="crossColor = '#D26161'"
      @mouseleave="crossColor = '#6C6C6C'"
    >
      <CrossIcon :color="crossColor"></CrossIcon>
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import PencilIcon from "@/components/icon/PencilIcon";
import CrossIcon from "@/components/icon/CrossIcon";
import ConfirmIcon from "@/components/icon/ConfirmIcon";
import DiscardIcon from "@/components/icon/DiscardIcon";

export default {
  name: "TodoRecord",
  components: {
    CrossIcon,
    PencilIcon,
    ConfirmIcon,
    DiscardIcon,
  },
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      checked: this.record.checked,
      text: this.record.text,
      textEditable: this.record.text,
      editMode: false,
      pencilColor: "#6C6C6C",
      crossColor: "#6C6C6C",
      confirmColor: "#6C6C6C",
      discardColor: "#6C6C6C",
    };
  },
  methods: {
    ...mapMutations([
      "mutationChangeStatus",
      "mutationSaveRecords",
      "mutationDeleteRecord",
      "mutationChangeText",
    ]),
    changeStatus() {
      this.$emit("changeStatus", { record: this.record });
    },
    async changeMode() {
      this.editMode = true;
      await this.$nextTick();
      this.$refs.textInput.focus();
    },
    deleteRecord() {
      this.$emit("deleteRecord", { record: this.record });
    },
    confirmChange() {
      if (this.textEditable.length > 0) {
        this.$emit("changeText", {
          record: this.record,
          text: this.textEditable,
        });
        this.text = this.textEditable;
        this.editMode = false;
        this.pencilColor = "#6C6C6C";
      } else {
        alert("Поле не должно быть пустым");
      }
    },
    discardChange() {
      this.textEditable = this.record.text;
      this.editMode = false;
      this.pencilColor = "#6C6C6C";
    },
  },
};
</script>

<style scoped>
.record-container {
  background-color: #eef4f3;
  border-radius: 7px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 45px;
}

.button {
  background-color: #eef4f3;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 7px;
}

.left-button {
  justify-self: flex-end;
}

.right-button {
  padding-right: 12px;
}

.text {
  background-color: #eef4f3;
  font-size: 16px;
  justify-self: flex-start;
  text-align: left;
  width: 100%;
  margin-top: 13px;
  margin-bottom: 13px;
}

.text-info {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 700;
}

.text-completed {
  text-decoration: line-through;
  color: #e4e4e4;
}

.checkbox {
  border: 3px solid #e4e4e4;
  border-radius: 3px;
  background-color: white;
  cursor: pointer;
  appearance: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  min-width: 26px;
  margin: 10px;
}

.checkbox:checked::before {
  content: "";
  background-color: #93b1c6;
  border-radius: 3px;
  width: 16px;
  height: 16px;
  margin: 2px;
}
</style>
