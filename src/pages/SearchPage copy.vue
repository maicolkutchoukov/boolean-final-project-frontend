<!-- PAGINA PRINCIPALE DOVE ANDRANNO INSERITI TUTTI I COMPONENTI  -->

<script>

import axios from 'axios';

export default {
  data() {
    return {
        allMusicians: [],
        allRoles: [,]
     /*  CheckBoxData: [
                {
                    title: 'Cantante',
                },
                {
                    title: 'Bassista',
                },
                {
                    title: 'Violista',
                },
                {
                    title: 'Percussionista',
                },
                {
                    title: 'Chitarrista',
                },
                {
                    title: 'Violista',
                },
                {
                    title: 'Violista',
                },
                {
                    title: 'Violista',
                },
            ] */
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
        axios.get('http://127.0.0.1:8000/api/roles') // URL DELL'API
        .then((res) => {
            console.log(res);
            this.allRoles = res.data.results.data;
            console.log(this.allRoles)
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
            Home / <span class="opacity-50">Ricerca musicisti</span>
        </div>
    </div>
    
    <div class="container d-flex">
        <div class="aside-container p-4">
            <!-- Aside-container -->
            <form>
                <div class="form-group w-75">
                    <label for="exampleInputEmail1">Search</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Inserisci il nome dell'artista">
                </div>
                <div class="form-group w-50">
                    <label for="exampleInputEmail1">Città</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Inserisci la città">
                </div>
                
                <h5 class="mt-3">Tipi di musicisti:</h5>
                <div v-for="(CheckBox, i) in CheckBoxData" :key="i" class="form-check form-check-inline d-flex mb-2">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                    <label class="form-check-label" for="inlineCheckbox1">{{ CheckBox.title }}</label>
                </div>
                

                <button type="submit" class="btn btn-primary mt-2 mb-2">Submit</button>
            </form>
        </div>
        <div class="main-container">
            <!-- main-container -->
            <div class="row d-flex p-3 g-4">                    
                <div v-for="(SingleMusician, i) in allMusicians" :key="SingleMusician.id" class="col-4">
                    <div class="card-result d-flex flex-column">
                        <div class="card-result-top d-flex flex-column">
                            <div class="background-img">background-img</div>
                            <div class="user-icon">icon</div>
                        </div>

                        <div class="card-result-bottom mt-3">
                            <h4>{{ SingleMusician.name }}</h4>
                            <div>{{ SingleMusician.city }}</div>
                            <div>valutazione</div>

                           <div class="d-flex justify-content-center mt-2">
                                <button type="button" class="btn btn-primary btn-sm me-2">contatta</button>
                                <!-- <button type="button" class="btn btn-primary btn-sm">profilo</button> -->
                                <router-link :to="{ name: 'profile', params: { id: SingleMusician.id} }" class="btn btn-primary btn-sm">Vedi Profilo</router-link>

                           </div>
                           
                        </div>
                        
                    </div>
                </div>
                
                <!--
                <div class="col-3 ">
                    <div class="card-result"></div>
                </div>
                <div class="col-3 ">
                    <div class="card-result"></div>
                </div>
                <div class="col-3">
                    <div class="card-result"></div>
                </div>
                -->                                   
            </div>

        </div>
    </div>

    <div class="scroll-watcher"></div>

</template>

<style lang="scss" scoped>

/* Aside Container */
.aside-container {
    border: 1px dashed black;
    width: 30%;
    min-height: 500px; 
}

/* Main Container */

.main-container {
    border: 1px dashed red;
    width: calc(100% - 400px);
    min-height: 500px;
}

/* Card-result */

.card-result {
    border: 1px solid black;
    border-radius: 20px;
}

.card-result-top {
    border: 1px dashed violet;
    height: 150px;
    position: relative;
}

.card-result-bottom {
    height: calc(100% - 150px);
}

.user-icon {
    text-align: center;
    border: 1px solid green;
    height: 100px;
    width: 100px;
    border-radius: 20px;
    position: absolute;
    bottom: -10px;
}

/*
.scroll-watcher{
    height: 5px;
    position: fixed;
    top: 0;
    z-index: 9999;
    background-color: black;
    width: 100%;
    scale: 0 1;
    transform-origin: left;
    animation: scroll-watcher linear;
    animation-timeline: scroll(y);
}
@keyframes scroll-watcher{
    to { scale: 1 1;}
}
*/
</style>