<script>
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import AppFooter from './components/AppFooter.vue';
import axios from 'axios';
export default {
    data() {
        return {

        };
    },
    components: {
        AppHeader,
        AppMain,
        AppFooter
    },  
    methods: {

    },
    mounted(){
        axios.get('https://rickandmortyapi.com/api/character') // URL DELL'API
            .then((response) => {
                console.log(response);                         // Stampo il risultato della chiamata dell'api
                console.log(response.data.results);            // STUDIANDO il risultato trovo il percorso da seguire

            })
    }
}
</script>

<template>
    <h1 class="">
        Mio Template
    </h1>

    <AppHeader />

    <AppMain />

    <AppFooter />
</template>

<style lang="scss">
@use "assets/scss/main" as *;
</style>
