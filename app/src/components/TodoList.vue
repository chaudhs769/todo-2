<template>
  <div id="todoList">
    <h1>Todo List</h1>
    <todo-add v-on:add="addTodo"></todo-add>
    <ul class="todos">
      <li v-for="(todo, index) in todos" class="todo" :key="index">
        <input
          type="checkbox"
          name=""
          value=""
          :checked="todo.isCompleted"
          @click="checkTodo(index)"
        >
        <span
          :class="todo.isCompleted ? 'completed' : ''"
          @click="checkTodo(index)"
        >
          <em>{{ index + 1 }}.</em>{{ todo.text }}
        </span>
      </li>
    </ul>
    <div>
      <p v-show="todos.length === 0">Have No todos</p>
      <p v-show="todos.length !== 0">
          <strong>{{todos.length}}</strong> task to do,
          {{completedCounts}} have done.
          {{notCompletedCounts}} not do.
      </p>
  </div>
  </div>
</template>

<script>
import TodoAdd from "./TodoAdd.vue";
export default {
  name: "TodoList",
  components: {
    TodoAdd
  },
  data() {
    return {};
  },
  methods: {
    checkTodo(index) {
      this.$store.dispatch("checkTodo", index);
    },
    addTodo(todoText) {
      this.$store.dispatch("addTodo", todoText);
    }
  },
  computed: {
    completedCounts() {
      return this.todos.filter(item => item.isCompleted).length;
    },
    notCompletedCounts() {
      return this.todos.filter(item => !item.isCompleted).length;
    },
    todos: function() {
      // 使用state中的todolist代替本地todolist
      return this.$store.state.todo.todoList;
    }
  }
};
</script>

<style scoped>
#todoList {
  margin: 0 auto;
  max-width: 350px;
}

.todos li {
  list-style: none;
}

.todo {
  text-align: left;
  cursor: pointer;
}

.completed {
  text-decoration: line-through;
}
</style>
