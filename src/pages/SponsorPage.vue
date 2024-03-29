<script>

import axios from 'axios';

export default {
  data() {
    return {
        allMusicians: [],
    };
  },
    created() {
        axios.get('http://127.0.0.1:8000/api/users') // URL DELL'API
            .then((response) => {
                console.log(response.data.results.data);
                this.allMusicians = response.data.results.data;
                console.log(this.allMusicians)
            })
            .catch(error => {
            console.error('Errore durante la chiamata API:', error);
            });
    }
}
</script>

<template>
    <div class="container">
        <div class="fw-bold fs-4 mb-4">
            Home / <span class="opacity-50">Profili sponsorizzati</span>
        </div>
        
        <div class="row">
            <!--SINGLE CARD
                aggiungere dettagli per caratterizzare profilo con lo sponsor
                (es:bordo marcato|bedge affianco all'imagine profilo)
            -->
            <div class="col-3">
                <div class="sponsor-user mb-3">
                    <div class="card-result">
                        
                        
                        <div class="card-result-top d-flex justify-content-center">
                            <div class="user-icon">icon</div>
                        </div>

                        <div class="card-result-bottom mt-3">
                            <h5>Nome artista</h5>
                            <div>Descrizione</div>
                            <div class="d-flex justify-content-around">
                                <div>Città</div>
                                <div>Valutazione</div>
                            </div>                           
                        </div>      
                    </div>
                </div>
            </div>
            
            <div class="col-3">
                <div class="sponsor-user mb-3">
                    <div class="card-result">
                        
                        
                        <div class="card-result-top d-flex justify-content-center">
                            <div class="user-icon">icon</div>
                        </div>

                        <div class="card-result-bottom mt-3">
                            <h5>Nome artista</h5>
                            <div>Descrizione</div>
                            <div class="d-flex justify-content-around">
                                <div>Città</div>
                                <div>Valutazione</div>
                            </div>                           
                        </div>      
                    </div>
                </div>
            </div>

            <div class="col-3">
                <div class="sponsor-user mb-3">
                    <div class="card-result">
                        
                        
                        <div class="card-result-top d-flex justify-content-center">
                            <div class="user-icon">icon</div>
                        </div>

                        <div class="card-result-bottom mt-3">
                            <h5>Nome artista</h5>
                            <div>Descrizione</div>
                            <div class="d-flex justify-content-around">
                                <div>Città</div>
                                <div>Valutazione</div>
                            </div>                           
                        </div>      
                    </div>
                </div>
            </div> 

            <div class="col-3">
                <div class="sponsor-user mb-3">
                    <div class="card-result">
                        
                        
                        <div class="card-result-top d-flex justify-content-center">
                            <div class="user-icon">icon</div>
                        </div>

                        <div class="card-result-bottom mt-3">
                            <h5>Nome artista</h5>
                            <div>Descrizione</div>
                            <div class="d-flex justify-content-around">
                                <div>Città</div>
                                <div>Valutazione</div>
                            </div>                           
                        </div>      
                    </div>
                </div>
            </div> 
        </div>

    </div>
    <!--
        <div class="scroll-watcher"></div>
    -->

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