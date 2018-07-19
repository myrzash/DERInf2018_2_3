<template>
    <router-view></router-view>
</template>

<script>
    export default {
        beforeRouteEnter(to, from, next) {
            let languages = ['en', 'kz', 'ru']
            if (languages.includes(to.params.lang)) {
                next()
            }
            else {
                next(vm => {
                    vm.$router.replace({name: 'error'})
                })
            }
        },
        watch: {
            '$route.params.lang'(lang) {
                console.log('Lang $route.params.lang: ', lang)
                let languages = ['en', 'kz', 'ru']
                if (!languages.includes(lang)) {
                    this.$router.replace({name: 'error'})
                    return;
                }
                this.$lang.setLang(lang);
                document.title = this.$lang.value.title;
                this.$parent.$data.parts = this.$lang.value.parts;
            }
        },
        created() {
            this.$lang.setLang(this.$route.params.lang);
            document.title = this.$lang.value.title;
            this.$parent.$data.parts = this.$lang.value.parts;
        }
    }
</script>