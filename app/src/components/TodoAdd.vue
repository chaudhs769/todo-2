<template>
  <div id="addTodo">
      <input
        type="text"
        name=""
        class="input"
        value=""
        v-model="todoText"
        @keyup.enter="addTodo"
      >
      <button
        type="button"
        name="button"
        @click="addTodo"
      >
        Add
      </button>
  </div>
</template>

<script>
export default {
  name: "addTodo",
  data() {
    return {
      todoText: ""
    };
  },
  methods: {
    addTodo() {
      if (this.todoText) {
        this.$emit("add", this.todoText);
        this.todoText = "";
      }
    }
  }
};
</script>

<style scoped>
.input {
  min-width: 200px;
}
</style>
