<template>
    <div>
        <clazy-load class="loadimage" @load="loaded" :src="src">
            <transition name="fade">
                <img :src="src">
            </transition>
            <transition name="fade" slot="placeholder">
                <div class="preloader">
                    <div class="circle">
                        <div class="circle-inner"></div>
                    </div>
                </div>
            </transition>
        </clazy-load>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueClazyLoad from './vue-clazy-load'
    Vue.use(VueClazyLoad)

    export default {
        props: ['src'],
        methods: {
            loaded() {
                console.log('loaded')
            }
        }
    }

</script>


<style>

    .loadimage {
        position: relative;
    }

    .loadimage img {
        transition: all 250ms ease-out;
    }

    .loadimage .fade-enter,
    .loadimage .fade-leave-to {
        opacity: 0;
        transform: scale(.8);
    }

    /* preloader source: https://codepen.io/Alex-Miller/pen/qviHa */
    .loadimage .preloader {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -25px 0 0 -25px;
        width: 50px;
        height: 50px;
        transition: all 100ms ease-in;
    }

    .loadimage .preloader .circle,
    .loadimage .preloader .circle .circle-inner {
        width: inherit;
        height: inherit;
        border-radius: 50%;
        background: linear-gradient(rgba(64, 150, 238, 1) -50%, rgba(64, 150, 238, 0) 60%);
    }

    .loadimage .preloader .circle {
        animation: roll-load-image 6s linear infinite;
    }

    .loadimage .preloader .circle .circle-inner {
        padding: 5px;
        animation: roll-load-image 2s linear infinite reverse;
    }

    .loadimage .preloader .circle .circle-inner::after {
        content: '';
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #ddd;
    }

    @keyframes roll-load-image {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>