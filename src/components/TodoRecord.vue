<template>
  <div class="record-container">
    <input
      type="checkbox"
      class="checkbox"
      @click="changeStatus"
      :checked="checked"
    />
    <input
      v-if="editMode"
      type="text"
      class="text"
      ref="textInput"
      @keyup.enter="confirmChange"
      @keyup.esc="discardChange"
      v-model="textEditable"
      minlength="1"
      maxlength="128"
      required
    />
    <p
      v-else
      class="text text-info"
      :class="{ 'text-completed': checked }"
      :title="text"
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
      class="button"
      @click="discardChange"
      @mouseenter="discardColor = '#D26161'"
      @mouseleave="discardColor = '#6C6C6C'"
    >
      <DiscardIcon :color="discardColor"></DiscardIcon>
    </button>
    <button
      v-else
      v-show="!checked"
      class="button"
      @click="deleteRecord"
      @mouseenter="crossColor = '#D26161'"
      @mouseleave="crossColor = '#6C6C6C'"
    >
      <CrossIcon :color="crossColor"></CrossIcon>
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

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
    storage: {
      type: String,
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
    //...mapActions(["deleteRecord", "changeStatus", "changeText"]),
    ...mapActions({
      recordDelete: "deleteRecord",
      statusChange: "changeStatus",
      textChange: "changeText",
      saveRecords: "saveRecords",
    }),
    changeStatus() {
      try {
        this.statusChange({ record: this.record });
      } catch (e) {
        alert(e.text);
      }
      this.saveRecords();
    },
    async changeMode() {
      this.editMode = true;
      await this.$nextTick();
      this.$refs.textInput.focus();
    },
    deleteRecord() {
      if (confirm("Вы действительно хотите удалить эту запись?")) {
        try {
          this.recordDelete({ storage: this.storage, record: this.record });
        } catch (e) {
          alert(e.text);
        }
        this.saveRecords();
      }
    },
    confirmChange() {
      if (this.textEditable.length > 0) {
        try {
          this.textChange({ record: this.record, text: this.textEditable });
        } catch (e) {
          alert(e.text);
        }
        this.text = this.textEditable;
        this.editMode = false;
        this.saveRecords();
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
  width: 100%;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #eef4f3;
  border-radius: 7px;
}

.button {
  border-radius: 7px;
}

.left-button {
  justify-self: flex-end;
}

.text {
  width: 100%;
  margin-top: 13px;
  margin-bottom: 13px;
  justify-self: flex-start;
  text-align: left;
  background-color: #eef4f3;
  font-size: 16px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  outline: none;
  width: 26px;
  height: 26px;
  min-width: 26px;
  border: 3px solid #e4e4e4;
  border-radius: 3px;
  background-color: white;
  cursor: pointer;
  margin: 10px;
}

.checkbox:checked::before {
  content: "";
  width: 16px;
  height: 16px;
  margin: 2px;
  background-color: #93b1c6;
  border-radius: 3px;
}
</style>
