<script>
import axios from 'axios';

export default {
    data() {
        return {
            allMusicians: [],
            allRoles: [],
            selectedRoles: [],
            searchQuery: '',
            rating: null, // Valore delle stelle selezionate
            minimumReviews: null
        };
    },
    computed: {
        filteredMusicians() {
            let filtered = this.allMusicians;

            // Filtrare per ruoli selezionati, se presenti
            if (this.selectedRoles.length > 0) {
                filtered = filtered.filter(musician => musician.roles.some(role => this.selectedRoles.includes(role.title)));
            }

            // Filtrare per query di ricerca, se presente
            if (this.searchQuery.trim() !== '') {
                filtered = filtered.filter(musician => musician.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }

            // Filtrare per il voto minimo inserito dall'utente
            if (this.rating !== null) {
                filtered = filtered.filter(musician => {
                    if (musician.votes.length > 0) {
                        const averageRating = musician.votes.reduce((acc, vote) => acc + parseInt(vote.vote), 0) / musician.votes.length;
                        return averageRating >= this.rating;
                    } else {
                        return false; // Se non ci sono voti, escludi il musicista
                    }
                });
            }

            // Filtrare per il numero minimo di recensioni inserito dall'utente
            if (this.minimumReviews !== null) {
                filtered = filtered.filter(musician => {
                    return musician.reviews.length >= this.minimumReviews;
                });
            }

            return filtered;
        }
    },
    methods: {
        toggleRole(role) {
            if (this.selectedRoles.includes(role)) {
                this.selectedRoles = this.selectedRoles.filter(selectedRole => selectedRole !== role);
            } else {
                this.selectedRoles.push(role);
            }
        },
        isSelected(role) {
            return this.selectedRoles.includes(role);
        },
        search() {
            // Questo metodo viene chiamato quando viene inviato il modulo di ricerca
            // Qui puoi implementare la logica per effettuare la richiesta API di ricerca
            // Utilizzando this.searchQuery e this.selectedRoles
            axios.get('http://127.0.0.1:8000/api/users', {
                params: {
                    name: this.searchQuery,
                    roles: this.selectedRoles.join(',')
                }
            })
                .then(response => {
                    // Aggiorna allMusicians con i dati ricevuti dalla risposta API
                    this.allMusicians = response.data.results.data;
                })
                .catch(error => {
                    console.error('Errore durante la chiamata API:', error);
                });
        },
        selectRating(rating) {
            // Gestisce il click su una stella e aggiorna il valore delle stelle selezionate
            this.rating = rating;
        },
        resetFilters() {
            // Reimposta tutti i filtri ai valori predefiniti
            this.selectedRoles = [];
            this.searchQuery = '';
            this.rating = null;
            this.minimumReviews = null;
        }
    },
    created() {
        // Ottieni la lista di tutti i musicisti e i ruoli al caricamento del componente
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                this.allMusicians = response.data.results.data;
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
        <form @submit.prevent="search">
            <div class="mb-5">
                <input type="text" v-model="searchQuery" class="form-control w-50 input-searchbar" placeholder="Cerca artisti o band...">
            </div>
            <div class="mb-5">
                <div class="star-rating text-center">
                    <span class="star" v-for="star in 5" :key="star" @click="selectRating(star)">
                        {{ star <= rating ? '★' : '☆' }}
                    </span>
                </div>
            </div>
            <div class="mb-5">
                <input type="number" v-model="minimumReviews" class="form-control w-50 input-min-reviews" min="0" placeholder="Numero minimo di recensioni">
            </div>
            <div class="container d-flex flex-wrap text-center mb-5">
                <div v-for="(role, index) in allRoles" :key="index" class="mycol-2">
                    <button class="button-roles"
                            type="button"
                            :class="{ 'active': isSelected(role.title) }"
                            @click="toggleRole(role.title)">
                        {{ role.title }}
                    </button>
                </div>
            </div>
        </form>
        <button class="btn btn-secondary" @click="resetFilters">Reset</button>
    </div>
    <div class="container-fluid">
        <h2 class="p-5 fw-bold">Artisti in evidenza</h2>
        <div class="row g-3">
            <div class="col-3" v-for="(singleMusician, index) in filteredMusicians" :key="singleMusician.id">
                <div class="card">
                    <div>
                        <img :src="'http://127.0.0.1:8000/storage/' + singleMusician.user_details.picture" class="card-img-top" alt="Immagine artista">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ singleMusician.name }}</h5>
                        <p class="card-text">{{ singleMusician.city }}</p>
                        <!-- <a :href="singleMusician.link" class="btn btn-primary">Dettagli</a> -->
                        <router-link :to="{ name: 'profile', params: { name:singleMusician.name } }" class="btn btn-primary btn-sm">Vedi Profilo</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.mycol-2 {
    width: calc((100% / 5) - 40px );
    margin: 10px 20px;
    .button-roles {
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

.card-img-top {
    max-height: 200px;
}
.input-searchbar, .input-min-reviews{
    margin: 0 auto;
}

.star-rating {
    font-size: 24px;
}

.star {
    cursor: pointer;
}

</style>