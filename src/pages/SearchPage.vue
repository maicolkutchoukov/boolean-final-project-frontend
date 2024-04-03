<script>
import axios from 'axios';

export default {
  data() {
    return {
        allMusicians: [],
        allRoles: [],
        selectedRoles: [], // Array per memorizzare i ruoli selezionati
        searchQuery: ''
    };
  },
  methods: {
    toggleRole(role) {
        // Aggiungi o rimuovi il ruolo selezionato dall'array
        if (this.selectedRoles.includes(role)) {
            this.selectedRoles = this.selectedRoles.filter(selectedRole => selectedRole !== role);
        } else {
            this.selectedRoles.push(role);
        }
    },
    isSelected(role) {
        // Verifica se il ruolo è selezionato
        return this.selectedRoles.includes(role);
    },
    search() {
        // Costruisci l'oggetto dei parametri per la richiesta API
        let params = {};

        // Aggiungi il nome alla richiesta API se è stato inserito
        if (this.searchQuery.trim() !== '') {
            params.name = this.searchQuery;
        }

        // Aggiungi i ruoli alla richiesta API se sono stati selezionati
        if (this.selectedRoles.length > 0) {
            // Trasforma l'array di ruoli in una stringa separata da virgole
            params.roles = this.selectedRoles.join(',');
        }

        // Esegui la ricerca solo se sono stati inseriti il nome o i ruoli
        if (Object.keys(params).length > 0) {
            axios.get('http://127.0.0.1:8000/api/users/search', { params })
                .then(response => {
                    console.log(response.data);
                    
                    // Gestisci la risposta della richiesta API qui
                })
                .catch(error => {
                    console.error('Errore durante la chiamata API:', error);
                });
        } else {
            console.log('Inserisci almeno un termine di ricerca o seleziona almeno un ruolo.');
        }
    }
},
  created() {
        axios.get('http://127.0.0.1:8000/api/users')
        .then(response => {
            this.allMusicians = response.data.results.data;
            console.log(this.allMusicians)
        })
        .catch(error => {
            console.error('Errore durante la chiamata API:', error);
        });

        axios.get('http://127.0.0.1:8000/api/roles')
        .then(response => {
            this.allRoles = response.data.results;
        })
        .catch(error => {
            console.error('Errore durante la chiamata API:', error);
        });
  }
};
</script>

<template>
    <div class="container-fluid">
        <h2 class="p-5 fw-bold">Trova artisti o band</h2>
            <form method="GET">
                <div class="mb-5">
                    <input type="text" v-model="searchQuery" class="form-control w-50 input-searchbar" name="searchArtist" placeholder="Cerca artisti o band...">
                </div>
                <div class="container d-flex flex-wrap text-center mb-5">
                    <div v-for="(role, index) in allRoles" :key="index"  class="mycol-2">
                        <button class="button-roles"
                                type="button"
                                :class="{ 'active': isSelected(role.title) }" 
                                @click="toggleRole(role.title)">
                            {{ role.title }}
                        </button>
                    </div>
                </div>
                <div class="text-center">
                    <button type="button" class="btn btn-primary px-5" @click="search">Cerca</button>
                </div>
            </form>
        </div>
        <div class="container-fluid">
            <h2 class="p-5 fw-bold">Artisti in evidenza</h2>
            <div class="row g-3">
                <div class="col-3" v-for="(singleMusician, index) in allMusicians" :key="singleMusician.id">
                    <div class="card">
                        <div>
                            <img :src="'http://127.0.0.1:8000/storage/' + singleMusician.user_details.picture" class="card-img-top" alt="Immagine artista">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{{ singleMusician.name }}</h5>
                            <p class="card-text">{{ singleMusician.city }}</p>
                            <!-- <a :href="singleMusician.link" class="btn btn-primary">Dettagli</a> -->
                            <router-link :to="{ name: 'profile', params: { id: singleMusician.id} }" class="btn btn-primary btn-sm">Vedi Profilo</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<style lang="scss" scoped>
.mycol-2{
    width: calc((100% / 5) - 40px );
    margin: 10px 20px;
    .button-roles{
        width: 90%;
        background-color: white;
        color: grey;
        border: 1px solid grey;
        padding: 10px 0;
        border-radius: 20px;
    }
    .active {
        background-color: black; /* Cambia lo stile del bottone quando è selezionato */
        color: white;
    }
}

.card-img-top{
    max-height: 200px;
}
.input-searchbar{
    margin: 0 auto;
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