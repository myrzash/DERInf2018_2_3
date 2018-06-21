<template>
    <div :style="{backgroundImage: `url('${items.bg}')`}"
         class="bg" style="position: absolute;left: 0;top: 0;">
        <div style="position: relative;">
            <p id="counter">{{position + 1}}<sup>
                <small>/{{items.count}}</small>
            </sup></p>
            <div id="test">
                <transition enter-active-class="fadeInDown"
                            leave-active-class="fadeOutUp">
                    <div id="test-task" v-show="animateButtons"
                    >
                        <div id="question" class="mr-3" v-if="item.question" v-html="item.question"></div>
                        <!--<image-zoomer v-if="item.image" :src="item.image"></image-zoomer>-->
                        <!--<div v-if="item.image" style="position: relative;">-->
                        <!--<v-btn fab class="deep-orange" dark style="position: absolute; left: 50%;top: 50%; margin: -28px 0 0 -28px;">-->
                        <!--<img src="assets/add.png" alt="">-->
                        <!--</v-btn>-->
                        <!--<img style="max-width: 500px; max-height: 300px;"  :src="item.image" :alt="item.image">-->
                        <!--</div>-->
                    </div>
                </transition>

                <div id="text-container">
                    <template v-for="(variant,index) in variants">
                        <transition
                                enter-active-class="fadeInUp"
                                leave-active-class="fadeOutDown"
                        >
                            <v-btn flat large @click.native="onClickVariant(variant)"
                                   v-show="animateButtons"
                                   :style="{pointerEvents: clicked ? 'none': ''}"
                                   :class="[getColorButton(variant), `btn-${item.type}`]"
                            >
                                <loading-image v-if="item.type==='image'" :src="variant.value"
                                               style="width: 100%; position: absolute;"></loading-image>
                                <span v-else>{{symbols[index]}}) {{variant.value}}</span>

                            </v-btn>
                        </transition>
                    </template>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['items'],
        data: () => ({
            colors: ['red', 'green', 'blue', 'yellow'],
            symbols: ['A', 'B', 'C', 'D', 'E', 'F'],
            correct: 0,
            position: 0,
            animateButtons: null,
            clicked: null
        }),
        created() {
            this.$parent.shuffle(this.items.data);
        },
        mounted() {
            this.animateButtons = true;
        },
        methods: {
            isTrue(variant) {
                return variant.key === 0
            },
            getColorButton(variant) {
                if (this.clicked === null) return ''
                if (this.isTrue(variant)) return 'success fadeIn'
                return variant.key !== this.clicked ? '' : 'error'
            },
            next() {
                this.animateButtons = false
                setTimeout(() => {
                    this.position++;
                    if (this.position >= this.items.count) {
                        this.$router.push({
                            name: 'res',
                            params: {result: this.correct / this.items.count * 100, resId: this.$route.params.gameId}
                        });
                        return
                    }
                    this.clicked = null
                }, 1000)
                setTimeout(() => {
                    this.animateButtons = true
                }, 1100)
            },
            onClickVariant(variant) {
                let isTrue = this.isTrue(variant)
                this.$parent.$emit('game', isTrue);
                if (isTrue) {
                    this.correct++
                }
                this.clicked = variant.key
                setTimeout(() => {
                    this.next()
                }, 1000)
            }
        },
        computed: {
            item() {
                return this.items.data[this.position];
            },
            variants() {
                let array = this.item.variants.map((item, index) => {
                    return {
                        key: index,
                        value: item
                    }
                })
                return this.$parent.shuffle(array);
            }
        }
    }
</script>

<style>

    #counter {
        position: absolute;
        right: 180px;
        top: 150px;
        z-index: 333;
        font-size: 58px;
        font-family: AppFont700;
    }

    #test {
        margin-top: 65px;
        width: 100%;
        /*background: lightblue;*/
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #test-task {
        font-size: 33px;
        line-height: 1.2em;
        max-width: 1200px;
        position: absolute;
        top: 220px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    #question {
        max-width: 1200px;
    }

    #text-container {
        position: absolute;
        left: 200px;
        top: 360px;
        max-width: 1200px;
    }

    .btn-image {
        width: 387px;
        height: 245px;
        margin: 40px;
    }

    .btn-text {
        font-family: AppFont700;
        width: 100%;
        height: 100px;
        font-size: 29px;
        margin: 0;
        text-transform: none;
        text-align: left;
    }

    .btn-text > .btn__content {
        white-space: inherit !important;
        line-height: 1.2em;
        flex: auto;
        font-size: 29px;
        justify-content: start;
    }

</style>