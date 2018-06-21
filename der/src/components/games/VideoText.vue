<template>
    <div class="bg" style="background-image: url('assets/video/bg1.jpg')">

        <video
                src="assets/video/videoplayback.mp4"
                width="850px"
                style="position: absolute;left: 400px;top: 250px;"
                frameborder="0"
                muted
                autoplay
        >
        </video>


        <div class="wolf-daemon" @click="onClickWolf"></div>
        <h1 class="video-text grey lighten-4 pa-4" style="line-height: 1.3em;">
            <span>{{text}}</span><span
                :class="[textPrimary.length === text.length ? 'cursor-anim' : '']">_</span>
        </h1>

        <v-btn v-if="showNext" large dark style="position: absolute;bottom: 120px; right:100px;"
               @click="skip">
            <span class="grey--text">{{$lang.value.skip}}</span>
        </v-btn>
        <!--<video-->
        <!--:src="videoSource"-->
        <!--width="850px"-->
        <!--style="position: absolute;left: 400px;top: 250px;"-->
        <!--frameborder="0"-->
        <!--muted-->
        <!--autoplay-->
        <!--&gt;-->
        <!--</video>-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                audioWolf: null,
                interval: {},
                text: '',
                showNext: false,
            }
        },
        mounted() {
            this.showNext = this.$lang.value.parts.length - 1 > this.$route.params.gameId;
            let self = this
            self.text = ''
            this.audioWolf = new Audio('assets/video/Sound_01450.mp3')
            setTimeout(() => {
                let length = 0;
                self.interval = setInterval(() => {
                    if (length === self.textPrimary.length) {
                        return;
                    }
                    self.text += self.textPrimary[length++]
                }, 60)
            }, 0)
        },
        beforeDestroy() {
            clearInterval(this.interval)
        },
        computed: {
            textPrimary() {
                return 'Операционная система – обеспечивает совместное функционирование всех устройств компьютера и предоставляет пользователю доступ к его ресурсам с использованием графического интерфейса ОС.'
            },
            videoSource() {
                return 'assets/video/videoplayback.mp4'
            }
        },
        methods: {
            skip() {
                this.$router.push({name: 'game', params: {gameId: +this.$route.params.gameId + 1}})
            },
            onClickWolf() {
                this.audioWolf.currentTime = 0;
                this.audioWolf.pause()
                this.audioWolf.play()
            }
        }
    }
</script>

<style>
    .video-text {
        position: absolute;
        left: 50%;
        bottom: 120px;
        margin-left: -450px;
        width: 900px;
        height: 180px;
    }

    .wolf-daemon {
        background: transparent;
        width: 200px;
        cursor: pointer;
        height: 220px;
        position: absolute;
        right: 50px;
        bottom: 200px;
    }
</style>