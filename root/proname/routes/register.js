var express = require('express');
var router = express.Router();
const sql = require('../sql');
const User = require('../sql/model/users');
/* 注册用户 */
router.post('/', (req, res, next) => {
    // get req.query
    // post req.body
    // console.log(req.body) // 但是age的值为string类型，需要修改为number类型
    let resData = req.body;
    let { username, password, tel, sex } = req.body;
    const user = new User(resData) // 实例化插入数据，传入的是插入的对象
    sql.find(User,{username: username},{_id:0,__v:0}).then((data) => {
        user.sex = "男" ? '1':'0';
        user.tel ? tel : '';
        user.flag =  false
        console.log(user);
        if(data.length > 0) {
            res.send({code: '1', text: '用户名已存在!'});
        } else {
            var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
            var pPattern = /^[a-zA-Z0-9_-]{6,16}$/;
            if(!pPattern.test(password)){
                res.send({code: '0', text: '注册失败!密码格式不正确!'});
            } else if(!uPattern.test(username)){
                res.send({code: '0', text: '注册失败!用户名格式不正确!'});
            } else {
                sql.insert(user).then(() => { // 存入数据库
                    res.send({code: '1', text: '注册成功!'});
                })
            }
        }
    }).catch(()=> {
        res.send({code: '0', text: '查询失败!'});
    })
})
module.exports = router;
// username: { type: String },
// password: { type: String },
// tel: { type: String },
// sex: { type: String }