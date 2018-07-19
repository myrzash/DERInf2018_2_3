<template>
    <div class="bg" :style="{backgroundImage: `url('${items.parts[position].bg}')`}">
        <div v-if="position===0">

            <Lect1></Lect1>

            <v-card class="grey lighten-3 pt-4 pr-4 pl-4 pb-0 elevation-8"
                    v-apparate:fadeInUp="{delay:5000}"
                    style="opacity: 0; position: absolute;left: 320px;bottom: 150px; width:880px;">
                <p class="lect-title">
                    {{items.title}}
                    <br>
                    {{items.subtitle}}
                </p>
                <p class="lect-text">
                    {{items.parts[position].text}}
                </p>
            </v-card>

        </div>
        <div v-else>

            <Lect2></Lect2>

            <v-card class="grey lighten-3 pt-4 pr-4 pl-4 pb-0 elevation-8 fadeInRight"
                    style="position: absolute;left: 320px;bottom: 80px; width:920px;">
                <p class="lect-title">
                    {{items.title}}
                    <br>
                    {{items.subtitle}}
                </p>
                <p class="lect-text">
                    {{items.parts[position].text}}
                </p>
            </v-card>
        </div>

        <div style="position: absolute;bottom: 140px; right:100px;">
            <v-btn large dark
                   class="fadeInUp"
                   @click="next">
                <span class="grey--text">{{$lang.value.skip}}</span>
            </v-btn>
        </div>
        <div style="position: absolute;bottom: 140px; left:100px;">
            <v-btn v-if="position===1"
                   class="fadeInUp"
                   @click="position=0"
                   large dark>
                <span class="grey--text">{{$lang.value.back}}</span>
            </v-btn>
        </div>
    </div>
</template>

<script>
    import Lect1 from './Lect1'
    import Lect2 from './Lect2'

    export default {
        props: ['items'],
        components: {
            Lect1,
            Lect2
        },
        data() {
            return {
                position: 0
            }
        },
        methods: {
            next(e) {
                if (this.position === 1) {
                    this.$router.push({name: 'game', params: {gameId: +this.$route.params.gameId + 1}})
                    return
                }
                this.position++;
            }
        }
    }
</script>

<style>
    .lect-title {
        font-size: 30px;
        line-height: 1.2em;
    }

    .lect-text {
        font-size: 26px;
        line-height: 1.2em;
    }
</style>