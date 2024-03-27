<script>
export default {
    data() {
        return {
            instruments :[
                'Chitarra',
                'Mandolino',
                'Basso',
                'Batteria',
                'Cantante',
                'Chitarra',
                'Mandolino',
                'Basso',
                'Batteria',
                'Cantante'
            ]
        }
     },
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
                        <div class="col-md-4">
                        <img src="..." class="img-fluid rounded-start" alt="Logo">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{{ instrument }}</h5>
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

</style>