<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

  data (){
    return {

    }
  },
  created: function () {
    // 本地存储数据库IdexedDB
    let _this = this;
    let todoDB = null;
    // 当前时间
    let date = new Date();
    let nowTime = date.getTime();
    let year = date.getFullYear();
    let nowMonth = date.getMonth();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    function addZero(val) {
        if (val < 10) {
            val = '0' + val;
        } 
        return val;
    }
    let today = year + '-' + addZero(month) + '-' + addZero(day);

    // 打开IndexedDB数据库
    IndexedDB.openDB('TodoList_KING', 1, todoDB, {
      name: 'vshop',
      key: 'name'
    },, function (db) {
      let vshopDB = db;
      IndexedDB.getData(vshopDB, 'vshop', 'todo', function (result) {
        if (result) {
          let data = new Object();
          data.name = 'todo';
          data.result = result;
          _this.$store.commit('getData', data);
          setTimeout(function () {
            for (let i = 0, len = _this.$store.state.todo.todoList.length; i < len; i++) {
              if (_this.$store.state.todo.todoList[i].state === '待完成') {
                let timer = null;
                let content = _this.$store.state.todo.todoList[i].content;
                let time = _this.$store.state.todo.todoList[i].time;
                let planTime = new Date(_this.$store.state.todo.todoList[i].time).getTime();
                timer = setInterval(function () {
                  console.log(_this.$store.state.todo.todoList[i]);
                    let newTime = new Date().getTime();
                    if (planTime - newTime <= 0) {
                        _this.$store.commit('changeTodoState', time);
                        let vshopDB = null;
                        IndexedDB.openDB('vshopDB', 1, vshopDB, {
                            name: 'vshop',
                            key: 'name'
                        }, function (db) {
                            let vshopDB = db;
                            IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.todo]);
                        });
                        _this.$Notice.warning({ 
                            title: '待办事件提醒', 
                            desc: content,
                            duration: 0
                        });
                        clearInterval(timer);
                    }
                }, 1000);
              }
            }
          }, 0);
          // 启动定时器
        } else {
          let todo = {
            name: 'todo',
            todoList: []
          };
          IndexedDB.putData(vshopDB, 'vshop', [todo]);
        }
      });
    });
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
