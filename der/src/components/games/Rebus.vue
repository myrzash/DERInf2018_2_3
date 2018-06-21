<template>
    <div :style="{backgroundImage: `url('${items.bg}')`}"
         class="bg" style="position: absolute;left: 0;top: 0;">
        <div style="position: relative;">
            <draggable class="drag-rebus" v-model="values" :options="{group:'drag'}"
                       style="position: absolute;left: 400px; top: 400px;"
            >
                <div v-for="(element,index) in values"
                     class="drag-elem"
                     :class="[game1over ? 'success--text pointer-none' : (element===trueAnswer[index] ? '': 'grey--text')]"
                >
                    {{element}}
                </div>
            </draggable>

            <draggable class="drag-rebus" v-model="values2" :options="{group:'drag2'}"
                       style="position: absolute;left: 540px; top: 540px;"
            >
                <div v-for="(element,index) in values2"
                     class="drag-elem"
                     :class="[game2over ? 'success--text pointer-none' : (element===trueAnswer2[index] ? '': 'grey--text')]"
                >
                    {{element}}
                </div>
            </draggable>

            <div style="position: fixed; top: 720px; left:700px;">
                <v-btn v-if="gameOver" large dark color="success" class="elevation-0 fadeInUp"
                       @click="next">
                    <span>{{$lang.value.next}}</span>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        // props: ['items'],
        components: {
            draggable
        },
        data: () => ({
            drag: false,
            items: {
                bg: 'assets/bg1.jpg',
                answer: ['operating', 'system']
            },
            trueAnswer: [],
            trueAnswer2: [],
            gameOver: false,
            game1over: false,
            game2over: false,
            values: [],
            values2: []
        }),
        mounted() {
            this.trueAnswer = this.items.answer[0].split('')
            this.values = this.$parent.shuffle(this.trueAnswer.slice())
            this.trueAnswer2 = this.items.answer[1].split('')
            this.values2 = this.$parent.shuffle(this.trueAnswer2.slice())
        },
        watch: {
            values(val) {
                for (let i = 0; i < val.length; i++) {
                    if (this.trueAnswer[i] !== val[i]) return;
                }

                this.game1over = true;
                if (this.game1over && this.game2over) {
                    this.gameOver = true;
                    this.$parent.$emit('game', true)
                }
            },
            values2(val) {
                for (let i = 0; i < val.length; i++) {
                    if (this.trueAnswer2[i] !== val[i]) return;
                }

                this.game2over = true;
                if (this.game1over && this.game2over) {
                    this.gameOver = true;
                    this.$parent.$emit('game', true)
                }
            }
        },
        methods: {
            next() {
                this.$router.push({name: 'game', params: {gameId: +this.$route.params.gameId + 1}})
            }
        }
    }
</script>

<style>
    .drag-rebus {
        display: flex;
        flex-direction: row;
        cursor: pointer;
    }

    .pointer-none {
        pointer-events: none;
    }

    .drag-elem {
        text-transform: uppercase;
        font-size: 100px;
        padding: 0 10px;
        min-width: 70px;
        text-align: center;
    }
</style>