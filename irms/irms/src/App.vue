<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    html,
    body {
        margin: 0;
        height: 100%;
        width: 100%;
        background-color: #F5F5F5;
    }
    
    body,
    div,
    span,
    header,
    footer,
    nav,
    section,
    aside,
    article,
    ul,
    dl,
    dt,
    dd,
    li,
    a,
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    i,
    b,
    textarea,
    button,
    input,
    select,
    figure,
    figcaption,
    {
        padding: 0;
        margin: 0;
        list-style: none;
        font-style: normal;
        text-decoration: none;
        border: none;
        color: #333;
        font-weight: normal;
        font-family: "Microsoft Yahei";
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        -webkit-font-smoothing: antialiased;
    }
    
    input[type="button"],
    input[type="submit"],
    input[type="search"],
    input[type="reset"] {
        -webkit-appearance: none;
    }
    
    textarea {
        -webkit-appearance: none;
    }
    
    .clear:after {
        content: '';
        display: block;
        clear: both;
    }
    
    .clear {
        zoom: 1;
    }
</style>