let baseUrl = '';
let routerMode = 'hash';
let imgBaseUrl = '';

if (process.env.NODE_ENV == 'development') {
    imgBaseUrl = '/img/'
} else if (process.env.NODE_ENV == 'production') {
    baseUrl = '//localhost:8080';
    imgBaseUrl = '//localhost:8080/img/'
}
export {
    baseUrl,
    routerMode,
    imgBaseUrl
}