<template>
    <div class="bg"
         :style="{backgroundImage: `url(${switchedOn ? 'assets/starter/bg1.jpg' : 'assets/starter/bg0.jpg'})`}">

        <template v-if="switchedOn">
            <label v-apparate:fadeIn="{delay:0}"
                   style="position: absolute;left: 460px;top: 400px;"
                   class="display-1 cyan--text"
                   v-html="$lang.value.subject"></label>
            <label v-apparate:fadeIn="{delay:0}"
                   style="position: absolute;left: 460px;top: 440px;"
                   class="headline">{{$lang.value.grade}}</label>

            <label style="position: absolute;left: 460px;top: 510px; max-width:680px;"
                   class="display-1">
                <span style="color:transparent;">__</span>
                {{title}}<span
                    :class="[$lang.value.title.length === title.length ? 'cursor-anim' : '']">_</span>
            </label>

            <v-btn style="position: absolute;left: 1000px;top: 620px; " class="elevation-0"
                   dark large color="cyan"
                   v-apparate:fadeInUp="{delay:0}"
                   v-show="$lang.value.title.length === title.length"
                   @click="start">
                <v-icon large>play_arrow</v-icon>
            </v-btn>
        </template>
        <div v-else>
            <div id="window-button" @click="switchOn"></div>
        </div>
        <h2 class="grey--text text--darken-2"
            style="position: absolute;bottom: 30px;left: 0;width: 100%;text-align: center;">&copy;
            {{$lang.value.copyright}}</h2>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                switchedOn: false,
                interval: {},
                title: ''
            }
        },
        beforeDestroy() {
            clearInterval(this.interval)
        },
        methods: {
            switchOn() {
                this.switchedOn = true;
                let self = this
                let length = 0;
                self.title = ''
                this.interval = setInterval(() => {
                    if (length === self.$lang.value.title.length) {
                        return;
                    }
                    self.title += self.$lang.value.title[length++]
                }, 60)
            },
            start() {
                this.$router.push({name: 'intro'})
            }
        }
    }
</script>

<style>
    #window-button {
        background: transparent;
        cursor: pointer;
        position: absolute;
        left: 390px;
        top: 300px;
        width: 800px;
        height: 420px;
    }
</style>