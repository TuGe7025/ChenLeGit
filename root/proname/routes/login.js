var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');//token
const sql = require('../sql');
const User = require('../sql/model/users');

// 查询所有用户
router.get('/getusers', (req, res) => {
    sql.find(User,{}, {_id:0,__v:0}).then((data)=> {
        res.send({code: '1', data});
    })
})
// 查询单个用户
router.get('/getuser', (req, res) => {
    const {username} = req.query;
    sql.find(User,{username: username}, {_id:0,__v:0}).then((data)=> {
        res.send({code: '1', data});
    })
})
// 登录用户
router.post('/', (req, res) => {
    let name = req.body.username;
    let pass = req.body.password;
    sql.find(User,{username: name}).then((data)=> {
        if(data.length!=0){
            let content={name: req.body.name};
            let secretOrPrivateKey = "jwt";
            let token = jwt.sign(content, secretOrPrivateKey, {
                expiresIn: 60*60*24
            });
            if (pass != data[0].password) {
                res.send({code: '0', text: '密码错误'});
                return false;
            }
            res.send({code: '1', token: token, user_name: data[0].username, sex: data[0].sex})
        } else {
            res.send({code: '0', text: '账户不存在!'});
        }
    })

})
//每次切换都去调用此接口 用来判断token是否失效 或者过期
router.post('/checkUser', (req,res)=>{
    let token = req.get("Authorization"); // 从Authorization中获取token
    let secretOrPrivateKey="jwt"; // 这是加密的key（密钥）
    jwt.verify(token, secretOrPrivateKey, (err, decode)=> {
        if (err) {  //  时间失效的时候 || 伪造的token
            res.send({'status':10010});
        } else {
            res.send({'status':10000});
        }
    })
});
module.exports = router;
// username: { type: String },
// password: { type: String },
// tel: { type: String },
// sex: { type: String }