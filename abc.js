var q = require('q')


var fs = require('fs')

function aaa(){
    fs.readFile("","utf-8",aa)
}

function a() {
    var deferred = q.defer();
    setTimeout(() => {
        console.log('a')
        deferred.resolve('a');
    }, 0);
    return deferred.promise;
}

function b() {
    var deferred = q.defer();
    setTimeout(() => {
        console.log('b')
        deferred.resolve('b');
    }, 0);
    return deferred.promise;
}

function c() {
    var deferred = q.defer();
    setTimeout(() => {
        console.log('c')
        deferred.resolve('c');
    }, 0);
    return deferred.promise;
}

function a1() {
    var deferred = q.defer();
    setTimeout(() => {
        console.log('a1')
        deferred.resolve('a1');
    }, 0);
    return deferred.promise;
}

function a2() {
    var deferred = q.defer();
    setTimeout(() => {
        console.log('a2')
        deferred.resolve('a2');
    }, 0);
    return deferred.promise;
}

a().then(() => { return a1().then(() => { return a2() }) }).then(() => { return b() }).then(() => { return c() })