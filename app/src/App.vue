<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import IndexedDB from "./libs/IndexedDB";
export default {
  name: "App",
  data() {
    return {};
  },
  created: function() {
    // 本地存储数据库IdexedDB
    let _this = this;
    let vshopDB = null;
    // 当前时间
    // let date = new Date();
    // let nowTime = date.getTime();
    // let year = date.getFullYear();
    // let nowMonth = date.getMonth();
    // let month = date.getMonth() + 1;
    // let day = date.getDate();
    // function addZero(val) {
    //   if (val < 10) {
    //     val = "0" + val;
    //   }
    //   return val;
    // }
    // let today = year + "-" + addZero(month) + "-" + addZero(day);

    // 打开IndexedDB数据库
    IndexedDB.openDB('vshopDB', 1, vshopDB, {
      name: 'vshop',
      key: 'name'
    }, function(db) {

        IndexedDB.getData(db, "vshop", "todo", function(result) {
          console.log(result);

          if (result) {
            let data = new Object();
            data.name = "todo";
            data.result = result;
            // 将所有todo导入到
            _this.$store.commit("importDataFromIdxDB", data);

          } else {
            let todo = {
              name: "todo",
              todoList: []
            };
            IndexedDB.putData(db, "vshop", [todo]);
          }
        });
      }
    );
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
