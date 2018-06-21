<template>
    <div class="bg" :style="{backgroundImage: `url('assets/intro/bg1_blur.jpg')`}">
        <v-layout row justify-center>
            <v-card v-if="dialog" v-apparate:bounceInUp="{delay:0}"
                    style="text-align: center;width: 420px; margin-top: 300px;"
                    class="shadow">
                <div class="pa-5 mr-4 ml-4 mt-4 grey lighten-3">
                    <h1 v-if="resWord" class="pt-2 mb-4">{{resWord}}</h1>
                    <h1 class="bolder pa-0 ma-0 text-xs-right font700"
                        :class="[value<25? 'error--text' :(value<50?'primary--text':'success--text')]">
                        {{ value }}%</h1>
                    <v-progress-linear
                            v-bind:value="value"
                            height="16"
                            style="border:none;"
                            :color="value<25? 'error' :(value<50?'primary':'success')"
                    >
                    </v-progress-linear>
                </div>
                <div class="pa-3 ma-2">
                    <!--<v-tooltip bottom>-->
                    <!--<v-btn icon large dark class="ml-4"-->
                    <!--slot="activator"-->
                    <!--@click.native="click('home')">-->
                    <!--<v-icon large>home</v-icon>-->
                    <!--</v-btn>-->
                    <!--<span>{{$lang.value.home}}</span>-->
                    <!--</v-tooltip>-->
                    <v-tooltip bottom>
                        <v-btn icon large dark class="ml-4"
                               slot="activator"
                               @click.native="click('repeat')">
                            <v-icon large>cached</v-icon>
                        </v-btn>
                        <span>{{$lang.value.repeat}}</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn v-if="showNext" icon large dark class="ml-4"
                               slot="activator"
                               @click.native="click('next')">
                            <v-icon large>arrow_forward</v-icon>
                        </v-btn>
                        <span>{{$lang.value.next}}</span>
                    </v-tooltip>
                </div>
            </v-card>
        </v-layout>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialog: false,
                interval: {},
                value: 0,
                showNext: false,
            }
        },
        beforeDestroy() {
            clearInterval(this.interval)
        },
        created() {
            this.showNext = this.$lang.value.parts.length - 1 > this.$route.params.resId;
            this.$store.commit('setResult', this.$route.params);
            this.dialog = false;
        },
        mounted() {
            this.dialog = true;
            this.interval = setInterval(() => {
                if (this.value >= this.$route.params.result) {
                    return;
                }
                this.value += 10
            }, 150);

            if (this.$store.state.soundEffects) {
                setTimeout(() => {
                    let soundNotify = new Audio();
                    soundNotify.volume = 1;
                    soundNotify.src = 'assets/sound/notify.mp3';
                    soundNotify.play();
                }, 500)
            }
        },
        computed: {
            resWord() {
                let resWords = this.$lang.value.resWords;
                let result = this.$route.params.result;
                var colStar = (result === 100) ? 3 : parseInt(result / 25);
                var rand = Math.floor(Math.random() * resWords[colStar].length);
                return resWords[colStar][rand];
            }
        },
        methods: {
            click(name) {
                let route = null;
                switch (name) {
                    case 'home':
                        route = {name: 'main'};
                        break;
                    case 'next':
                        route = {name: 'game', params: {gameId: parseInt(this.$route.params.resId) + 1}}
                        break;
                    case 'repeat':
                        this.$router.go(-1);
//                        this.$router.go({path: this.$router.path, force: true});
//                        route = {
//                            path: this.$router.path, force: true, query: {
//                                t: +new Date()
//                            }
//                        };
//                        route = {name: 'game', params: {gameId: parseInt(this.$route.params.gameId)}}
                        break;
                }
                if (route)
                    this.$router.push(route);
            },
        }
    }
</script>

<style lang="stylus">
    .progress-circular
        margin: 1rem

    .shadow
        background: #1f2f42 !important
        /*-webkit-box-shadow 0 0 100px 10px #ffffff*/
        box-shadow 0 10px 150px 10px #ffffff

    .shadow .progress-linear
        border: 8px solid #424242;

</style>