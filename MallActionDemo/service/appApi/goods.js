const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');

let router = new Router();
router.get('/insertAllGoodsInfo', async(ctx) => {
    fs.readFile('./data_jason/newGoods.json', 'utf8', (err, data) => {
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

router.get('/insertAllCategory', async(ctx) => {
    fs.readFile('./data_jason/category.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        let saveCount = 0;
        const Category = mongoose.model('Category');
        data.RECORDS.map((value, index) => {
            console.log(value);
            let newCategory = new Category(value);
            newCategory.save().then(() => {
                saveCount++;
                console.log('insert ok' + saveCount)
            }).catch((error) => {
                console.log(error)
            })
        })
    })
    ctx.body = 'begin insert category'
})

router.get('/insertAllcategorySub', async(ctx) => {
    fs.readFile('./data_jason/category_sub.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        let saveCount = 0;
        const CategorySub = mongoose.model('CategorySub');

        data.RECORDS.map((value, index) => {
            console.log(value);
            let newCategorySub = new CategorySub(value);
            newCategorySub.save().then(() => {
                saveCount++;
                console.log('insert ok' + saveCount)
            }).catch((error) => {
                console.log('insert fail' + error)
            })
        })

    })
    ctx.body = "begin insert data";
})

//get goods detail info

router.post('/getDetailGoodsInfo', async(ctx) => {
    let goodsId = ctx.request.body.goodsId;
    const Goods = mongoose.model('Goods');
    await Goods.findOne({ ID: goodsId }).exec()
        .then(async(result) => {
            ctx.body = {
                code: 200,
                message: result
            }
        }).catch((error) => {
            console.log(error)
            ctx.body = {
                code: 500,
                message: error
            }
        })
})

module.exports = router;