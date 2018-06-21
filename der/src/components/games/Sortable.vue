<template>
    <!--<div :style="{backgroundImage: `url('${items.bg}')`}"-->
    <div :style="{backgroundImage: `url('assets/sort/bg1.jpg')`}"
         ref="background"
         class="bg" style="position: absolute;left: 0;top: 0;">
        <div style="position: absolute; top:320px; left:250px; width:1100px;">
            <h1 class="amber pa-3 mb-3">
                {{items.task}}
            </h1>
            <v-layout row>
                <v-flex xs3>
                    <h1 style="height:100px; line-height: 1.3em;" class="pa-3 mt-2 mb-2 blue-grey lighten-4"
                        v-for="element in items.sorts">
                        {{element}}
                    </h1>
                </v-flex>
                <v-flex xs9>
                    <draggable v-model="values" :options="{group:'sort'}" @start="drag=true" @end="drag=false">
                        <div style="height:100px" class="mt-2 mb-2 blue-grey lighten-4 pa-2"
                             v-for="(element,index) in values">
                            <v-card flat
                                    class="headline blue-grey lighten-3"
                                    style="box-sizing: border-box; padding:10px; min-height:80px;">
                                {{element}}
                                <!--:class="[element == items.values[index] && clicked?'success':'primary']"-->
                            </v-card>
                        </div>
                    </draggable>
                </v-flex>
            </v-layout>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        props: ['items'],
        components: {
            draggable
        },
        data() {
            return {
                values: [],
                mount: false,
                clicked: false,
                attempt: 0
            }
        },
        watch: {
            values(val) {
                if (this.clicked && this.compareArray(val, this.items.values)) {
                    this.$refs.background.style.backgroundImage = 'url("assets/sort/bg3.jpg")'
                    this.$parent.$emit('game', true)
                    let gameOver = () => {
                        let res = 100 + 20 - this.attempt * 10;
                        res = (res > 100) ? 100 : res;
                        res = (res < 0) ? 0 : res;
                        this.$router.push({
                            name: 'res',
                            params: {result: res, resId: this.$route.params.gameId}
                        });
                    }
                    setTimeout(function () {
                        gameOver()
                    }, 2000)
                }
                if (this.clicked) {
                    this.attempt++;
                    return;
                }
                if (this.mount) this.clicked = true;
            }
        },
        created() {
            this.values = this.$parent.shuffle(this.items.values.slice());
        },
        mounted() {
            setTimeout(() => {
                this.mount = true;
            }, 500)
        },
        methods: {
            compareArray(arr1, arr2) {
                for (let i in arr1) {
                    if (arr1[i] != arr2[i]) return false;
                }
                return true;
            }
        }
    }
</script>