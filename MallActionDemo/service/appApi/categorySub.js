const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');

let router = new Router();

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

module.exports = router;