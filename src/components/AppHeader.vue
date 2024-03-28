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
    <div class="container mb-5">
        <header class="d-flex justify-content-between">
            <div class="logo-container">
                <router-link :to="{ name: 'home' }" class="">Logo BMusic</router-link>
            </div>
            <div class="d-flex">

                <router-link :to="{ name: 'instrumental' }" class="px-3">Strumenti</router-link>
                <router-link :to="{ name: 'sponsor' }" class="px-3">Sponsor</router-link>
                <router-link :to="{ name: 'search' }" class="px-3">Cerca</router-link>
                <router-link :to="{ name: 'login' }" class="px-3">Accedi/Registrati</router-link>

            </div>
        </header>
    </div>
</template>

<style lang="scss" scoped>
</style>
