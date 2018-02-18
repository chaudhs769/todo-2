export default {
    // 用户列表
    users: {
        name: 'users',
        userList: [
            {
                name: 'Admin',
                coding: '000',
                position: '管理员',
                password: 'admin',
                jurisdiction: '一级',
                telephone: '###########',
                address: '############',
                avatar: 'http://img.qq1234.org/uploads/allimg/150128/20123A027-5.jpg'
            }
        ]
    },
    // 消息通知列表
    messages: {
        name: 'messages',
        today: '2017-11-12',
        name: 'messages',
        number: 0,
        // 保质期
        limitDate: 30,
        // 库存
        limitNumber: 3,
        messageList: []
    },
    // 待办事件列表
    todo: {
        name: 'todo',
        todoList: []
    },
    // 当前用户
    currUser: {
        name: '未登录',
        avatar: ''
    },
}