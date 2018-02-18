import IndexedDB from '../libs/IndexedDB'

export default {
    // 将IndexedDB中数据写入vuex
    getData (state, data) {
        state[data.name] = data.result;
    },
    // 设置当前用户
    setCurrUser (state, user) {
        state.currUser = user;
    },
    // 当前用户退出登录
    logoutAccount (state) {
        state.currUser = {
            name: '未登录',
            avatar: ''
        };
    },
    // 添加新用户
    addNewUser (state, user) {
        state.users.userList.push(user);
    },
    // 删除用户
    deleteUser (state, index) {
        if (state.users.userList[index].coding !== '000') {
            state.users.userList.splice(index, 1);
        }
    },
    // 重置新消息数字
    resetMessageNumber (state) {
        state.messages.number = 0;
    },
    // 删除消息通知
    deleteMessage (state, index) {
        state.messages.messageList.splice(index, 1);
    },
    // 设置消息通知
    changeMessage (state, newLimit) {
        for (let limit in newLimit) {
            if (newLimit[limit]) {
                state.messages[limit] = newLimit[limit];
            }
        }
    },
    // 添加新待办事件
    addNewTodo (state, todo) {
        state.todo.todoList.unshift(todo);
    },
    // 删除待办事件
    deleteTodo (state, index) {
        state.todo.todoList.splice(index, 1);
    },
    // 改变待办事件状态
    changeTodoState (state, time) {
        for (let i = 0, len = state.todo.todoList.length; i < len; i++) {
            if (state.todo.todoList[i].time === time) {
                state.todo.todoList[i].state = '已到期';
                state.todo.todoList[i].cellClassName = {
                    state: 'state-change'
                };
            }
        }
    }
}