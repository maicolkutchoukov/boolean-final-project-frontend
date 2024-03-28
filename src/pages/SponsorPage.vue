<script>

</script>

<template>
    <div class="container">
        <div class="fw-bold fs-4 mb-4">
            Home / <span class="opacity-50">Profili sponsorizzati</span>
        </div>
        <h2 class="mb-3">
            Profili sponsorizzati
        </h2>
        
        <div class="row">
            <div class="col-3">
                <div class="sponsor-user mb-3">
                    <div class="card-result">
                        <!--card-->
                        <div class="card-result-top d-flex justify-content-center">
                            <div class="user-icon">icon</div>
                        </div>

                        <div class="card-result-bottom mt-3">
                            <h5>Nome artista</h5>
                            <div>Città</div>
                            <div>Valutazione</div>                           
                        </div>
                        <!--
                            aggiungere dettagli per caratterizzare profilo con sponsor (bordo marcato|bedge)
                        -->
                    </div>
                </div>
            </div>

            <div class="col-3">
                <div class="sponsor-user mb-3">
                    <div class="card-result d-flex flex-column">
                        <div class="card-result-top">
                            <div class="user-icon">icon</div>
                        </div>

                        <div class="card-result-bottom mt-3">
                            <h5>nome artista</h5>
                            <div>città</div>
                            <div>valutazione</div>                           
                        </div>
                        
                    </div>
                </div>
            </div>
            
            <div class="col-3">
                <div class="sponsor-user mb-3">
                    <div class="card-result d-flex flex-column">
                        <div class="card-result-top">
                            <div class="user-icon">icon</div>
                        </div>

                        <div class="card-result-bottom mt-3">
                            <h5>nome artista</h5>
                            <div>città</div>
                            <div>valutazione</div>                           
                        </div>
                        
                    </div>
                </div>
            </div>
            
            <div class="col-3">
                <div class="sponsor-user mb-3">
                    <div class="card-result d-flex flex-column">
                        <div class="card-result-top">
                            <div class="user-icon">icon</div>
                        </div>

                        <div class="card-result-bottom mt-3">
                            <h5>nome artista</h5>
                            <div>città</div>
                            <div>valutazione</div>                           
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="scroll-watcher"></div>

</template>

<style lang="scss" scoped>

.sponsor-user {
    min-height: 100px;
    min-width: 100px;
    border: 1px dashed black;
}

.user-icon {
    text-align: center;
    border: 1px solid red;
    height: 75px;
    width: 75px;
    border-radius: 10px;
}
</style>