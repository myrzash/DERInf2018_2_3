<template>
    <div>
        <v-progress-linear
                v-show="loading"
                style="position: absolute;right: 240px;top: 250px; width: 200px; height:20px;"
                indeterminate color="orange"></v-progress-linear>
        <!--LINES-->
        <img v-apparate:fadeInLeft="{delay:3000}" style="opacity:0; position: absolute; right:200px; top:280px;"
             src="assets/lect/1/b3-2.png" alt="">
        <img v-apparate:fadeInLeft="{delay:3500}" style="opacity:0; position: absolute; right:260px; top:280px;"
             src="assets/lect/1/b2-2.png" alt="">
        <img v-apparate:fadeInLeft="{delay:4000}" style="opacity:0; position: absolute; right:430px; top:280px;"
             src="assets/lect/1/b1-2.png" alt="">
        <!--TABLES-->
        <img style="position: absolute; right:100px; bottom:0;"
             src="assets/lect/1/k1.png" alt="">
        <img style="position: absolute; left:100px; bottom:0;"
             src="assets/lect/1/k2.png" alt="">
        <!--ITEMS-->
        <img v-apparate:bounceIn="{delay:1500}" style="opacity: 0; position: absolute; left:130px; bottom:520px;"
             src="assets/lect/1/b1.png" alt="">
        <img v-apparate:bounceIn="{delay:2000}" style="opacity: 0;  position: absolute; left:520px; bottom:520px;"
             src="assets/lect/1/b2.png" alt="">
        <img v-apparate:bounceIn="{delay:2500}" style="opacity: 0;  position: absolute; left:850px; bottom:520px;"
             src="assets/lect/1/b3.png" alt="">
    </div>
</template>

<script>
    export default {
        data: () => ({
            loading: false
        }),
        mounted() {
            let self = this
            setTimeout(() => {
                self.loading = true;
            }, 2000)
        }
    }
</script>