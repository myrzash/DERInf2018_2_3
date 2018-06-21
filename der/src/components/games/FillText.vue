<template>
    <div>
        <v-card dark color="grey darken-3" class="mr-5 ml-5 pa-5 headline"
                style="line-height: 1.4em !important; margin-top:100px;">
            <div>
                <template v-for="(item, index) in items.content">
                    <span v-if="item.text" class="pt-3 pl-1 pr-1">{{item.text}}</span>
                    <span v-else-if="item.span">
                        <v-btn dark style="min-height:50px;"
                               color="grey darken-2"
                               @click="showVariants(index)" :disabled="checked">
                             <span style="font-weight: 500;"
                                   class="headline"
                                   :class="[checked ? getColor(index) : selected==index ? 'amber--text':'']">
                                 {{answers[index] ? answers[index].value : '. . .'}}
                             </span>
                        </v-btn>
                    </span>
                </template>
            </div>
        </v-card>

        <div style="margin-top:130px;">
            <v-layout row wrap justify-center v-if="currentVariants">
                <v-btn v-for="(item, key) in currentVariants"
                       :key="key"
                       dark
                       style="min-height:60px;"
                       color="grey darken-2"
                       :disabled="checked"
                       @click="onClickVariant(item)">
                    <span style="font-weight: 500;" class="headline">{{item.value}}</span>
                </v-btn>
            </v-layout>
        </div>

        <div style=" position: absolute; bottom: 0; left: 0;width: 100%; text-align: center;">
            <v-btn dark
                   class="ma-5"
                   style="min-height:60px;"
                   color="grey darken-2"
                   :disabled="Object.keys(answers).length != count || checked"
                   @click="check">
                <span style="font-weight: 500;" class="headline">
                    {{$lang.value.check}}</span>
            </v-btn>
        </div>

        <v-btn dark
               class="ma-5"
               style="min-height:72px; position: absolute;left: 0;bottom: 0;"
               color="grey darken-2"
               :disabled="Object.keys(answers).length == 0 || checked"
               @click="reset">
            <v-icon large>cached</v-icon>
        </v-btn>

        <v-btn dark
               class="ma-5"
               style="min-height:72px; position: absolute;right: 0;bottom: 0;"
               color="grey darken-2"
               v-if="checked"
               @click="finishGame">
            <v-icon large>arrow_forward</v-icon>
            <!--<span style="font-weight: 500;" class="headline">{{$lang.value.next}}</span>-->
        </v-btn>

    </div>
</template>


<script>
    export default {
        props: ['items'],
        data: () => ({
            selected: null,
            checked: false,
            answers: {}
        }),
        mounted() {
            this.reset();
        },
        computed: {
            nextSpan() {
                let answered = Object.keys(this.answers)
                console.log(answered)
                let spans = this.spans.filter(item => {
                    return item > this.selected && !answered.includes(item.toString())
                })
                return spans[0]
            },
            spans() {
                return this.items.content.map((item, index) => {
                    return item.span ? index : null
                }).filter(item => {
                    return item
                })
            },
            count() {
                return this.spans.length
            },
            currentVariants() {
                if (!this.items || this.selected == null) return

                let variants = this.items.content[this.selected].span.split(', ')
                variants = variants.map((item, index) => {
                    return {key: index === 0, value: item}
                })

                variants = this.$parent.shuffle(variants);
                return variants
            }
        },
        methods: {
            getColor(index) {
                return this.answers[index].key ? 'lime--text text--accent-3' : 'error--text';
            },
            finishGame() {
                let correct = Object.values(this.answers).filter(item => {
                    return item.key
                }).length
                this.$router.push({
                    name: 'res',
                    params: {result: correct / this.count * 100, resId: this.$route.params.gameId}
                });
            },
            check() {
                this.checked = true;
            },
            reset() {
                this.answers = {};
                this.showVariants(this.spans[0]);
            },
            showVariants(index) {
                this.selected = index
            },
            onClickVariant(variant) {
                this.answers = Object.assign(this.answers, {[this.selected]: variant})
                if (this.answers.size != this.count) this.showVariants(this.nextSpan);
            }
        }
    }
</script>
