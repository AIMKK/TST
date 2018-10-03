const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');
let router = new Router();

router.get('/insertAllCategory', async(ctx) => {
    fs.readFile('data_jason/category.json', 'utf8', (err, data) => {
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

module.exports = router;