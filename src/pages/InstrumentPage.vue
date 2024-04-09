<script>
import axios from 'axios';

export default {
    data() {
        return {
            instruments: [],
            instrumentPicPath:'http://127.0.0.1:8000/storage/'
        }
    },
    created() {
        this.fetchRoles();
        console.log(this.instruments)

    },
    methods: {
        async fetchRoles() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/roles');
                this.instruments = response.data.results;
                console.log(response)
                /* this.instrumentPicPath = `http://127.0.0.1:8000/storage/${this.instruments.icon}`; */
                console.log(this.instrumentPicPath)
                console.log(this.instruments[1].icon)
            } catch (error) {
                console.error('Errore durante il recupero dei ruoli:', error);
            }
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="fw-bold fs-4 mb-4">
            Home / <span class="opacity-50">Strumenti</span>
        </div>
        <h2 class="mb-3">
            Strumenti
        </h2>
        <div class="row">
            <div class="col-6" v-for="(instrument, i) in instruments" :key="i">
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 d-flex align-items-center justify-content-center">
                            <img :src="'http://127.0.0.1:8000/storage/' + instrument.icon" class="img-fluid rounded-start" alt="Logo">
                        </div>
                        <div class="col-md-8 d-flex align-items-center justify-content-center">
                            <div class="card-body">
                                <h5 class="card-title">{{ instrument.title }}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="scroll-watcher"></div>
</template>

<style lang="scss" scoped>
img{
    max-width: 100px;
}
</style>