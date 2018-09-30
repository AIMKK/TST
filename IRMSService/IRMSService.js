const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const static = require('koa-static');

const staticPath = './static';
//
const app = new Koa();
const router = new Router({
    prefix: ''
});

const home = new Router();
home.get('/hello', async(ctx) => {
    ctx.body = ctx.query;
}).get('/todo', async(ctx) => {
    ctx.body = ctx.query;
})
const page = new Router();
page.get('/hello', async(ctx) => {
    ctx.body = 'page hello'
}).get('/todo', async(ctx) => {
    ctx.body = 'page todo'
})

//
router.use('/home', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());
//
app.use(static(path.join(__dirname, staticPath)));
//
app.use(router.routes())
    .use(router.allowedMethods()).use(bodyParser());

// //
// app.use(async(ctx) => {
//     //if get method response user form
//     if (ctx.url === '/' && ctx.method.toLowerCase() === 'get') {
//         let html = `
//         <h1>Koa2 request post demo</h1>
//         <form method="POST"  action="/">
//             <p>userName</p>
//             <input name="userName" /> <br/>
//             <p>age</p>
//             <input name="age" /> <br/>
//             <p>webSite</p>
//             <input name='webSite' /><br/>
//             <button type="submit">submit</button>
//         </form>
//         `;
//         ctx.body = html;
//     } else if (ctx.url === '/' && ctx.method.toLowerCase() === 'post') {
//         // let postData = await parsePostData(ctx);
//         // ctx.body = postData;
//         let postData = ctx.request.body;
//         ctx.body = postData;
//     } else {
//         //其它请求显示404页面
//         ctx.body = '<h1>404!</h1>';
//     }

// });
app.listen(3000);
console.log('server start at 3000')
    //
function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = "";
            ctx.req.on('data', (data) => {
                postdata += data
            })
            ctx.req.addListener("end", function() {
                let parseData = parseQueryStr(postdata)
                resolve(parseData);
            })
        } catch (error) {
            reject(error);
        }
    });
}

function parseQueryStr(queryStr) {
    let queryData = {};
    let queryStrList = queryStr.split('&');

    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=');

        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    }
    return queryData
}