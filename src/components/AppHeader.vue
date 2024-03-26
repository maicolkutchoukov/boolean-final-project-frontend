<script>
export default {
    data() {
        return {

        };
    },
    methods: {

    }
}
</script>

<template>
    <div class="container">
        <header class="d-flex justify-content-between">
            <div class="logo-container">
                <router-link :to="{ name: 'home' }" class="">Logo BMusic</router-link>
            </div>
            <div class="d-flex">

                <router-link :to="{ name: 'about' }" class="px-3">Contatti</router-link>
                <router-link :to="{ name: 'instrumental' }" class="px-3">Strumenti</router-link>
                <router-link :to="{ name: 'review' }" class="px-3">Recensioni</router-link>
                <router-link :to="{ name: 'login' }" class="px-3">Login</router-link>
                <router-link :to="{ name: 'registration' }" class="px-3">Registrati</router-link>

            </div>
        </header>
    </div>
</template>

<style lang="scss" scoped>
</style>
