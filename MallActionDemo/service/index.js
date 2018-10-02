const Koa = require('koa');
const app = new Koa();
const { connect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
    //
;
(async() => {
    await connect();
    initSchemas();
    const User = mongoose.model('User');
    let oneUser = new User({ userName: 'zhi02', password: '123' });
    oneUser.save().then(() => {
        console.log('insert user ok')
    })
    let user = await User.findOne({}).exec();
    console.log('------')
    console.log(user)
})();
app.use(async(ctx) => {
    ctx.body = '<h1>hellow</h1></h1>';
})
app.listen(3000);
console.log('listen ok')