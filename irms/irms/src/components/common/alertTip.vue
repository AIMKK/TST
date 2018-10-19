<template>
    <div class="alert-container">
        <section class="tip-text-container">
            <div class="tip-icon">
                <span class="tip-icon-top"></span>
                <span class="tip-icon-bottom"></span>
            </div>
            <p class="tip-text">{{alertText}}</p>
            <div class="confirm" @click="closeTip">确认</div>
        </section>
    </div>    
</template>
<script>
    export default {
        data() {
            return {
                positionY: 0,
                timer: null
            }
        },
        props: ['alertText'],
        methods: {
            closeTip() {
                this.$emit('closeTip');
            }
        },
    }
</script>
<style scoped>
    @keyframes tipMove {
        0% {
            transform: scale(1)
        }
        35% {
            transform: scale(.8)
        }
        70% {
            transform: scale(1.1)
        }
        100% {
            transform: scale(1)
        }
    }
    
    .alert-container {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
    }
    
    .tip-text-container {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -6rem;
        margin-left: -6rem;
        width: 12rem;
        animation: tipMove .4s;
        background-color: rgba(255, 255, 255, 1);
        border: 1px;
        padding-top: 0.6rem;
        border-radius: 0.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    
    .tip-icon {
        width: 3rem;
        height: 3rem;
        border: 0.15rem solid #f8cb86;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    
    .tip-icon-top {
        width: .12rem;
        height: 1.5rem;
        background-color: #f8cb86;
    }
    
    .tip-icon-bottom {
        width: .2rem;
        height: .2rem;
        border: 1px;
        border-radius: 50%;
        margin-top: .2rem;
        background-color: #f8cb86;
    }
    
    .tip-text {
        font-size: .7rem;
        color: #333;
        line-height: .9rem;
        text-align: center;
        margin-top: .8rem;
        padding: 0 .4rem;
    }
    
    .confirm {
        font-size: .8rem;
        color: #fff;
        font-weight: bold;
        margin-top: .8rem;
        background-color: #4cd964;
        width: 100%;
        text-align: center;
        line-height: 1.8rem;
        border: 1px;
        border-bottom-left-radius: .25rem;
        border-bottom-right-radius: .25rem;
    }
</style>