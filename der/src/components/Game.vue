<template>
    <div>
        <component :is="part.interactive.name" :items="part.interactive.items"></component>
    </div>
</template>

<script>
    // import Slider from './games/Slider.vue'
    import VideoText from './games/VideoText.vue'
    import Test from './games/Test.vue'
    import Sort from './games/Sortable.vue'
    import Lect from './games/Lect.vue'
    import Rebus from './games/Rebus.vue'

    export default {
        components: {
            Test,
            VideoText,
            Sort,
            Lect,
            Rebus
        },
        data() {
            return {}
        },
        created() {
            let soundCorrect = new Audio();
            soundCorrect.volume = 1;
            soundCorrect.src = 'assets/sound/correct1.mp3';
            let soundWrong = new Audio();
            soundWrong.volume = 1;
            soundWrong.src = 'assets/sound/error1.mp3';

            this.$on('game', (isCorrect) => {
                if (!this.$store.state.soundEffects) return;

                console.log('isCorrect: ', isCorrect);
                if (isCorrect) {
                    soundCorrect.play();
                } else {
                    soundWrong.play();
                }
            });
        },
        methods: {
            saveId(id) {
                let idsStorage = localStorage.getItem('ids') ? JSON.parse(localStorage.getItem('ids')) : []
                idsStorage.push(id)
                localStorage['ids'] = JSON.stringify(idsStorage)
                // console.log('saveId: ', id)
            },
            generateIds(itemsLength, neededCount) {
                let ids = this.generateArray(0, itemsLength)
                let idsStorage = localStorage.getItem('ids') ? JSON.parse(localStorage.getItem('ids')) : []
                ids = ids.filter(item => {
                    return !idsStorage.includes(item)
                })
                if (ids.length < neededCount) {
                    ids = idsStorage
                    idsStorage = []
                    localStorage['ids'] = JSON.stringify(idsStorage)
                }
                this.shuffle(ids)
                ids = ids.splice(0, neededCount)
                ids.sort(function (a, b) {
                    return a - b;
                });
                // console.log('idsStorage: ', idsStorage)
                return ids
            },
            generateArray: function (start, to) {
                var length = to - start + 1;
                var array = Array(length);
                var k = 0;
                for (var i = start; i <= to; i++) {
                    array[k++] = i;
                }
                return array;
            },
            shuffle: function (a) {
                var j, x, i;
                for (i = a.length; i; i--) {
                    j = Math.floor(Math.random() * i);
                    x = a[i - 1];
                    a[i - 1] = a[j];
                    a[j] = x;
                }
                return a;
            },
        },
        computed: {
            part() {
                return this.$lang.value.parts[this.$route.params.gameId];
            },
            /*  nextPart() {
                  let nextGameId = +this.$route.params.gameId + 1;
                  let end = nextGameId < this.$lang.value.parts.length;
                  if (!end) return null;
                  return {
                      title: this.$lang.value.parts[nextGameId].info,
                      image: this.$lang.value.parts[nextGameId].image,
                      route: {
                          name: 'game',
                          params: {gameId: nextGameId}
                      }
                  };
              }*/
        },
    }
</script>