<template>
    <div>
        <img v-apparate:fadeIn="{delay:1000}" class="img1"
             src="assets/lect/2/k1.jpg" alt="">
        <img v-apparate:fadeIn="{delay:2000}" class="img1"
             src="assets/lect/2/k2.jpg" alt="">
        <img v-apparate:fadeIn="{delay:3000}" class="img1"
             src="assets/lect/2/k3.jpg" alt="">
        <img v-apparate:fadeIn="{delay:4000}" class="img1"
             src="assets/lect/2/k4.jpg" alt="">
        <h1 v-apparate:fadeIn="{delay:1000}" class="menu1" style="left: 215px;top: 485px;">{{menus[0]}}</h1>
        <h1 v-apparate:fadeIn="{delay:2000}" class="menu1" style="left: 200px;top: 870px;">{{menus[1]}}</h1>
        <h1 v-apparate:fadeIn="{delay:3000}" class="menu1" style="left: 1105px;top: 485px;">{{menus[2]}}</h1>
        <h1 v-apparate:fadeIn="{delay:4000}" class="menu1" style="left: 1225px;top: 870px;">{{menus[3]}}</h1>
    </div>
</template>

<script>
    export default {
        computed: {
            menus() {
                return this.$parent.$props.items.parts[1].points
            }
        }
    }
</script>

<style>

    .img1 {
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
    }

    .menu1 {
        position: fixed;
        opacity: 0;
        background: black;
        color: #ddd;
        font-size: 32px;
        padding: 3px 16px;
    }
</style>