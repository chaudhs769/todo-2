import IndexedDB from '../libs/IndexedDB'

export default {

    // 添加新项
    addTodo({ commit, state, dispatch }, todoText){
        // 新的todo任务
        const todoItem = {
            text: todoText,
            isCompleted: false,
            cTime: new Date()
        }
        commit('addNewTodo', todoItem);
        dispatch('updateTodo2IndexedDB');
    },
    // 修改第index项
    checkTodo({ commit, state, dispatch }, index){
        commit('checkTodo', index);
        dispatch('updateTodo2IndexedDB');
    },

    // 更新IndexedDB中的todo
    updateTodo2IndexedDB({ state }){
        const vshopDB = null;
        IndexedDB.openDB('vshopDB', 1, vshopDB, {
            name: 'vshop',
            key: 'name'
        }, function (db) {
            console.log(state.todo.todoList);
            IndexedDB.putData(db, 'vshop', [state.todo]);
        });
    }
}