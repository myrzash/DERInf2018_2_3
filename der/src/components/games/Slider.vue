<template>
    <v-card class="ma-3 mt-5" dark>
        <v-layout row>
            <v-flex xs5>
                <div :style="{maxHeight:`${items.maxHeightTextContainer}px`}" ref="scroller" id="container-text"
                     class="pl-4 pr-2">
                    <p v-for="pos in (position+1)" :key="pos" class="pb-4 pt-3 ma-0 fadeIn"
                       style="font-weight: 600; line-height: 1.3em; font-size: 22px;"
                       v-html="items.data[pos-1].html"></p>
                </div>
            </v-flex>
            <v-flex xs7>
                <div class="pr-2 pl-2 pt-2 pb-0">
                    <v-carousel hide-controls hide-delimiters :cycle="false" class="elevation-0"
                                :style="{height:`${items.heightImage}px`}"
                                v-model="position">
                        <v-carousel-item v-for="(item,i) in items.data"  :key="i" src="">

                            <loading-image :src="item.src ? item.src : ''"></loading-image>

                            <video v-if="item.video" :src="item.video.src" :id="`video-${i}`"
                                   :controls="item.video.controls">
                            </video>

                            <audio v-if="item.audio" :id="'audio-'+i" controls :style="item.audio.style">
                                <source :src="item.audio.src" type="audio/mpeg">
                                Тег audio не поддерживается вашим браузером.
                                <a :href="item.audio.src">Скачайте музыку</a>.
                            </audio>

                        </v-carousel-item>
                    </v-carousel>
                </div>

                <v-layout row class="pa-1">
                    <v-flex xs6 class="pa-1">
                        <v-btn :disabled="position===0"
                               @click="prev()" large class="grey darken-2 ma-0"
                               style="font-weight: 900; width:100%;">
                            <span style="text-align: left; width:100%;">{{$lang.value.back}}</span>
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="pa-1">
                        <v-btn v-if="position < items.data.length - 1" @click="next()"
                               large class="grey darken-2 ma-0" style="font-weight: 900; width:100%;">
                            <span style="text-align: right; width:100%;">{{$lang.value.next}}</span>
                        </v-btn>
                        <v-btn v-else @click="exit()"
                               color="success"
                               large class="ma-0" style="font-weight: 900; width:100%;">
                            <span style="text-align: right; width:100%;">{{$lang.value.finalize}}</span>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
    export default {
        props: ['items'],
        data() {
            return {
                position: 0
            }
        },
        mounted () {
          this.next();
          this.prev();
        },
        methods: {
            pauseVideo(position) {
                if (!this.items.data[position].video) return;
                var video = document.querySelector("#video-" + position);
                video.pause()
            },
            playVideo(position) {
                if (!this.items.data[position].video) return;
                let video = document.querySelector("#video-" + position);
                video.currentTime = 0;
                video.play()
            },
            pauseAudio(position) {
                if (!this.items.data[position].audio) return;
                var audio = document.querySelector("#audio-" + position);
                audio.pause()
            },
            playAudio(position) {
                if (!this.items.data[position].audio) return;
                let audio = document.querySelector("#audio-" + position);
                audio.currentTime = 0;
                audio.play()
            },
            prev() {
                if (this.items.data[this.position].audio) document.getElementById('audio-' + this.position).pause()
                this.pauseAudio(this.position)
                this.pauseVideo(this.position)
                this.position--
                this.playVideo(this.position)
                this.playAudio(this.position)
            },
            next() {
                this.pauseAudio(this.position)
                this.pauseVideo(this.position)
                this.position++
                this.playVideo(this.position)
                this.playAudio(this.position)
                let container = this.$refs.scroller
                setTimeout(() => {
                    container.scrollTop = container.scrollHeight
                }, 200)
            },
            exit() {
                this.$router.push({name: 'main'})
            }
        }
    }
</script>

<style>
    #container-text {
        overflow: scroll;
        overflow-x: hidden;
        -ms-overflow-style: none;
    }

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #656565;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #727272;
    }

</style>