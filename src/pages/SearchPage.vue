<!-- PAGINA PRINCIPALE DOVE ANDRANNO INSERITI TUTTI I COMPONENTI  -->

<script>

import axios from 'axios';

export default {
  data() {
    return {
      allMusicians: [],
      allRoles:[],
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
                console.log(res.data.results);
                this.allRoles = res.data.results;
                console.log(this.allRoles)
            })
            .catch(error => {
            console.error('Errore durante la chiamata API:', error);
            });
    }
}


</script>

<template>
    <div class="container-fluid">
        <h1 class="p-5 fw-bold">Trova artisti o band</h1>
        <form class="">
            <div class="mb-3">
                <input type="text" name="searchArtist" class="form-control w-100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Cerca artisti o band...">
                <button type="submit" class="btn btn-primary">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
            <div class="container d-flex flex-wrap text-center">
                <div v-for="(SingleRoles, i) in allRoles" class="mycol-2">
                    {{ SingleRoles.title }}
                </div>
            </div>
        </form>
    </div>

</template>

<style lang="scss" scoped>
.mycol-2{
    width: calc((100% / 5) - 40px );
    background-color: white;
    color: grey;
    border: 1px solid grey;
    margin: 10px 20px;
    padding: 10px 0;
    border-radius: 20px;

}
/* form{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    margin: 0 auto;
    div{
        width: 100%;
        
    }
} */
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