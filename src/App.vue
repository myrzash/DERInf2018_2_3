<template>
    <v-app>
        <div class="screen">
            <div class="app-menu" v-if="$route.name!='error'">
                <v-menu offset-y open-on-hover>
                    <v-btn fab large dark color="grey darken-4"
                           slot="activator">
                        <v-icon color="grey darken-2">menu</v-icon>
                    </v-btn>
                    <v-list dark>
                        <v-list-tile v-for="(part,id) in $lang.value.parts" :key="id" @click="onClickPart(id)">
                            <v-list-tile-title
                            >
                                <span class="text--lighten-1" style="font-size: 1.4em;"
                                      :class="[id===$route.params.gameId?'amber--text':'grey--text']">
                                    {{ part.title }}
                                </span>
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>

                <v-btn fab large dark color="grey darken-4"
                       @click.native="onSwitchSound()">
                    <v-icon color="grey darken-2">{{soundEffects ? 'volume_up' : 'volume_off'}}</v-icon>
                </v-btn>
                <v-menu offset-y open-on-hover>
                    <v-btn slot="activator"
                           fab large dark color="grey darken-4">
                        <span class="grey--text text--darken-2"
                              style="font-size: 1.8em;"> {{currentLangName.title}}</span>
                    </v-btn>
                    <v-list dark>
                        <v-list-tile v-for="(item,index) in languages" :key="index" @click="onClickLang(index)">
                            <v-list-tile-title
                                    style="height:50px; display: flex; justify-content: center; align-items: center">
                                <span class="text--lighten-1" style="font-size: 1.4em;"
                                      :class="[index===$route.params.lang?'amber--text':'grey--text']">
                                    {{ item.title }}
                                </span>
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </div>

            <v-content>
                <transition name="fade">
                    <router-view/>
                </transition>
            </v-content>
        </div>
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            music: null,
            languages: {
                kz: {
                    title: 'ҚАЗ'
                },
                ru: {
                    title: 'РУС'
                },
                en: {
                    title: 'ENG'
                }
            },
            soundEffects: null,
            parts: null,
            // musicsAllowPages: ['start', 'res']
        }),
        beforeCreate() {
            if (!this.$route.params.lang) {
                this.$router.push('/ru');
            }
        },
        created() {
            this.music = new Audio();
            this.music.volume = 1;
            this.music.src = 'assets/sound/bg.mp3';
            this.music.loop = true;
            this.soundEffects = this.$store.state.soundEffects
        },
        beforeDestroy() {
            if (this.music.played) this.music.pause()
        },
        watch: {
            soundEffects: function (val) {
                this.$store.commit('setSoundKey', val);
                if (val == true) this.music.play();
                else this.music.pause();
            },
            '$store.state.muteMusic'(val) {
                console.log('$store.state.muteMusic: ', val)
                if (val) this.music.volume = 0
                else this.music.volume = 1
            }
            // '$route'(to, from) {
            //     if (this.musicsAllowPages.includes(to.name) && this.soundEffects) {
            //         this.music.play()
            //     }
            //
            //     if (this.musicsAllowPages.includes(from.name)) {
            //         this.music.pause()
            //     }
            // }
        },
        computed: {
            currentLangName() {
                return this.languages[this.$lang.getLang()];
            },
        },
        methods: {
            onClickLang(lang) {
                this.$router.push({params: {lang: lang}});
            },
            onSwitchSound() {
                this.soundEffects = !this.soundEffects;
            },
            onClickPart(id) {
                this.$router.push({name: 'game', params: {gameId: id}})
            }
        }
    }
</script>

<style>
    html {
        background: transparent !important;
    }

    #app {
        font-family: AppFont900;
        background-color: transparent !important;
    }

    .screen {
        position: relative;
        width: 1600px;
        height: 1200px;
    }

    .bg {
        position: relative;
        width: 1600px;
        height: 1200px;
        background-repeat: no-repeat;
        background-size: 1600px 1200px;
        background-position: center;
    }

    .app-menu {
        position: absolute;
        left: 40px;
        top: 40px;
        z-index: 2;
    }

    .app-menu .btn:hover {
        box-shadow: 0px 0px 15px white;
        transition: none;
    }

    .app-menu .btn:hover i,
    .app-menu .btn:hover span {
        color: white !important;
    }

    .button-anim {
        animation: anim-button 1.5s infinite linear;
    }

    @keyframes anim-button {
        from {
            opacity: 1;
        }
        to {
            opacity: 0.4;
        }
    }

    .cursor-anim {
        animation: anim-cursor 1.5s infinite;
    }

    @keyframes anim-cursor {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    .btn__content span {
        font-size: 22px;
    }
</style>
