const mongoose = require('../db.js');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    tel: { type: String },
    sex: { type: String },
    flag: { type: Boolean }
});
// 执行时 会在数据库中创建 users 集合
module.exports = mongoose.model('User', UserSchema);