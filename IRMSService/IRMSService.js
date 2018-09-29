const Koa = require('koa');
const app = new Koa();

app.use(async(ctx) => {
    //if get method response user form
    if (ctx.url === '/' && ctx.method.toLowerCase() === 'get') {
        let html = `
        <h1>Koa2 request post demo</h1>
        <form method="POST"  action="/">
            <p>userName</p>
            <input name="userName" /> <br/>
            <p>age</p>
            <input name="age" /> <br/>
            <p>webSite</p>
            <input name='webSite' /><br/>
            <button type="submit">submit</button>
        </form>
        `;
        ctx.body = html;
    } else if (ctx.url === '/' && ctx.method.toLowerCase() === 'post') {
        let pastData = await parsePostData(ctx);
        ctx.body = pastData;
    } else {
        //其它请求显示404页面
        ctx.body = '<h1>404!</h1>';
    }

});
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