const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');

let router = new Router();
router.get('/insertAllGoodsInfo', async(ctx) => {
    fs.readFile('./newGoods.json', 'utf8', (err, data) => {
        if (err) console.log(err)
        data = JSON.parse(data);
        let saveCount = 0;
        const Goods = mongoose.model('Goods');
        data.map((value, index) => {
            console.log(value);
            let newGoods = new Goods(value);
            newGoods.save().then(() => {
                saveCount++;
                console.log('insert all ok' + saveCount)
            }).catch((error) => {
                console.log(error)
            })
        })
    })
    ctx.body = 'begin insert';
})
module.exports = router;