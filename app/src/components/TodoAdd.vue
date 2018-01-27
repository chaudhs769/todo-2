<template>
  <div id="addTodo">
      <input 
        type="text"
        name=""
        class="input"
        value=""
        v-model="todo"
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
  name: 'addTodo',
  data: () => ({
      todo: ''
  }),
  methods:{
      addTodo(){
          if(this.todo){
              this.$emit('add', this.todo);
              this.todo = ''
          }
      }
  }
}
</script>

<style scoped>
.input{
    min-width: 200px;
}
</style>
