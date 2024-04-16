<script>
import { store } from '../store.js';
import axios from 'axios';

export default {
    data() {
        return {
            store,
            allMusicians: [],
            allRoles: [],
            selectedRoles: [],
            searchQuery: '',
            rating: null,
            minimumReviews: null,
            loading: false,
            selectedRoleHome: store.selectedRoleHome,
            selectedIdHome: store.selectedRoleId
        };
    },
    computed: {
        // Metodo di calcolo per filtrare gli artisti
        filteredMusicians() {
            let filtered = [];

            if (store.selectedRoleHome !== null) {
                // Trova il ruolo corrispondente a selectedRoleHome
                const selectedRole = this.allRoles.find(role => role.title === store.selectedRoleHome);
                // Se il ruolo corrisponde, aggiungilo ai filtri esistenti
                if (selectedRole && !this.selectedRoles.some(role => role.id === selectedRole.id)) {
                    this.selectedRoles.push(selectedRole);
                }
                // Rimuovi selectedRoleHome dopo averlo utilizzato
                store.selectedRoleHome = null;
            }

            if (store.filteredMusicians && store.filteredMusicians.length > 0) {
                filtered = [...store.filteredMusicians];
            } else {
                filtered = [...this.allMusicians];
            }

            // Applica i filtri aggiuntivi, se necessario
            if (this.selectedRoles.length > 0) {
                filtered = filtered.filter(musician =>
                    this.selectedRoles.every(selectedRole =>
                        musician.roles.some(role => role.id === selectedRole.id)
                    )
                );
            }

            if (this.searchQuery.trim() !== '') {
                filtered = filtered.filter(musician => musician.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }

            if (this.rating !== null) {
                filtered = filtered.filter(musician => {
                    const averageRating = musician.votes.reduce((acc, vote) => acc + parseInt(vote.vote), 0) / musician.votes.length;
                    return averageRating >= this.rating;
                });
            }

            if (this.minimumReviews !== null) {
                filtered = filtered.filter(musician => musician.reviews.length >= this.minimumReviews);
            }

            return filtered;
        }
    },
    methods: {
        async getMusicians(url = 'http://127.0.0.1:8000/api/users') {
            try {
                this.loading = true;
                const response = await axios.get(url);
                const allUsers = response.data.results.data;
                const sponsoredResponse = await axios.get('http://127.0.0.1:8000/api/sponsor');
                const sponsoredMusicians = sponsoredResponse.data.results;
                sponsoredMusicians.forEach(musician => {
                    musician.isSponsored = true;
                });
                const nonSponsoredUsers = allUsers.filter(user => !sponsoredMusicians.some(sponsored => sponsored.id === user.id));
                this.allMusicians = [...sponsoredMusicians, ...nonSponsoredUsers];
            } catch (error) {
                console.error('Errore durante la chiamata API:', error);
            } finally {
                this.loading = false;
            }
        },
        async getRoles() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/roles');
                this.allRoles = response.data.results;
            } catch (error) {
                console.error('Errore durante la chiamata API:', error);
            }
        },
        updateFilterMusicians() {
            store.filteredMusicians = this.filteredMusicians;
            this.$router.push({ query: null });
        }, 
        isRoleSelected(role) {
            return this.selectedRoles.some(selectedRole => selectedRole.id === role.id);
        },
        toggleRoleSelection(role) {
            const index = this.selectedRoles.findIndex(selectedRole => selectedRole.id === role.id);
            if (index !== -1) {
                this.selectedRoles.splice(index, 1);
            } else {
                this.selectedRoles.push(role);
            }
            this.updateFilterMusicians();
        },
        resetRating() {
            this.rating = null;
            this.updateFilterMusicians();
        },
        removeRole(roleToRemove) {
            console.log("Ruolo da rimuovere:", roleToRemove);
            this.selectedRoles = this.selectedRoles.filter(role => role.id !== roleToRemove.id);
            if (this.selectedRoles.length === 0) {
                this.resetFilters(); // Chiamiamo resetFilters se non ci sono più ruoli selezionati
            } else {
                // Ricarichiamo la lista dei musicisti filtrati con i filtri rimanenti
                store.filteredMusicians = this.filteredMusicians;
                this.updateFilterMusicians();
            }
        },
        removeSelectedRoles() {
                this.selectedRoles = []; // Rimuoviamo tutti i ruoli selezionati
                this.resetFilters(); // Chiamiamo resetFilters dopo aver rimosso tutti i ruoli selezionati
            },
        resetMinimumReviews() {
            this.minimumReviews = null;
            this.updateFilterMusicians();
        },
        resetFilters() {
            this.selectedRoles = []; // Resettiamo i ruoli selezionati
            this.searchQuery = ''; // Resettiamo la query di ricerca
            this.rating = null; // Resettiamo il rating
            this.minimumReviews = null; // Resettiamo il numero minimo di recensioni
            store.filteredMusicians = []; // Resettiamo la lista filtrata di musicisti
            this.updateFilterMusicians(); // Aggiorniamo la lista degli artisti
        },
    },
    created() {
        this.getRoles();
        this.getMusicians();
    },
    mounted() {
        window.scrollTo(0, 0); // Scorri verso l'alto quando il componente viene montato
    }
};
</script>
<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" integrity="sha384-4LISF5TTJX/fLmGSxO53rV4miRxdg84mZsxmO8Rx5jGtp/LbrixFETvWa5a6sESd" crossorigin="anonymous">
    <!-- Bottone di trigger per l'offcanvas -->
        <button class="btn btn-dark d-md-none d-block mx-auto w-75 mt-5" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            Apri filtri
        </button>

        <!-- Offcanvas -->
        <div class="offcanvas w-100 offcanvas-start d-md-none" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filtri</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <!-- Contenuto del tuo offcanvas -->
                <div class="row">
                    <div class="col-12">
                        <!-- Input per la ricerca -->
                        <div class="input-container position-relative mb-4 d-flex align-items-center justify-content-between flex-column">
                            <h3 class="text-start w-100 mb-3">Nome:</h3>
                            <input type="text" v-model="searchQuery" class="form-control input-searchbar w-100 mx-2 mb-5" placeholder="Cerca artisti o band..." @keyup="updateFilterMusicians()">
                        </div>
                        <div class="col-12 mb-4 d-flex align-items-center justify-content-between flex-column">
                            <h3 class="text-start w-100 mb-3">Numero min recensioni:</h3>

                            <input type="number" v-model="minimumReviews" class="form-control input-min-reviews w-100 mx-2 px-4 mb-5" min="0" placeholder="Numero minimo di recensioni">
                        </div>
                        <div class="col-12 mb-4 d-flex justify-content-between flex-column">
                            <h3 class="text-start w-100 mb-3">Voto:</h3>
                            <div>
                                <span class="star mx-3" v-for="star in 5" :key="star" @click="rating = star, updateFilterMusicians()">
                                <span v-html="star <= rating ? '<i class=\'fa-solid fa-circle fs-3\'></i>' : '<i class=\'fa-regular fa-circle fs-3\'></i>'"></span>
                            </span>
                            </div>
                        </div>
                        <!-- Rating -->
                        <div class="text-center mb-3">
                        
                        </div>
                    </div>
                    
                    <div class="d-flex flex-wrap justify-content-center mb-5">
                        <h3 class="text-start w-100 mb-3">Ruolo:</h3>
                        <div v-for="(role, index) in allRoles" :key="index" class="col-12 col-sm-6 my-2 text-center">
                            <!-- Bottone per selezionare i ruoli -->
                            <button
                                class="button-roles px-5"
                                style="min-width: 200px;"
                                type="button"
                                @click="toggleRoleSelection(role)"
                                :class="{ 'active': isRoleSelected(role) || (store.selectedRoleHome !== null && role.title === store.selectedRoleHome) }"
                            >
                                {{ role.title }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <!-- Sezione di ricerca -->
    <section class="search-section container-xl mb-5">
        <div class="search-container">
            <!-- Titolo della sezione di ricerca -->
            <h1 class="fw-bold d-none d-md-block">Trova artisti o band {{ store.selectedRoleHome }}</h1>
            <!-- Input per la ricerca -->
            <div class="input-container d-none d-md-block">
                <input type="text" v-model="searchQuery" class="form-control input-searchbar" placeholder="Cerca artisti o band..." @keyup="updateFilterMusicians()">
                <span class="search-icon">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </span>
            </div>
            
            <!-- Container dei ruoli -->
            <div class="container d-flex flex-wrap justify-content-center mb-5">
                <div v-for="(role, index) in allRoles" :key="index" class="mycol-2 my-2 d-none d-md-block">
                    <!-- Bottone per selezionare i ruoli -->
                    <button
                        class="button-roles"
                        type="button"
                        @click="toggleRoleSelection(role)"
                        :class="{ 'active': isRoleSelected(role) || (store.selectedRoleHome !== null && role.title === store.selectedRoleHome) }"
                    >
                        {{ role.title }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Sidebar dei filtri -->
        <div class="wrapper row justify-content-between">
            <aside class="col-4 border my-bg-grey py-5 px-4 d-none d-md-block">
                <!-- Titolo della sezione dei filtri -->
                <h2 class="fw-bold fs-1 mb-4">Filtri</h2>
                <div class="filter-container">
                    <!-- Contenitore dei ruoli selezionati -->
                    
                    <!-- Contenitore per il filtro del numero minimo di recensioni -->
                    <div class="reviews-container p-4 mb-5 bg-white">
                        <h4 class="mb-4 fw-bold fs-4">N. Minimo Recensioni</h4>
                        <!-- Input per inserire il numero minimo di recensioni -->
                        <input type="number" v-model="minimumReviews" class="form-control input-min-reviews w-100 px-4 mb-3" min="0" placeholder="Numero minimo di recensioni">
                        <!-- Bottone per resettare il filtro delle recensioni minime -->
                        <span class="fs-3" @click="resetMinimumReviews"><i class="fa-solid fa-xmark me-3"></i></span>
                    </div>
                    <!-- Contenitore per il filtro della media delle votazioni -->
                    <div class="vote-container p-4 mb-5 bg-white">
                        <h4 class="mb-4 fw-bold fs-4">Media votazioni</h4>
                        <!-- Visualizzazione delle stelle per selezionare la media delle votazioni -->
                        <div class="row align-items-center">
                            <div class="col-11 px-0 mb-2">
                                <span class="star" v-for="star in 5" :key="star" @click="rating = star, updateFilterMusicians()">
                                    <span v-html="star <= rating ? '<i class=\'fa-solid fa-circle\'></i>' : '<i class=\'fa-regular fa-circle\'></i>'"></span>
                                </span>
                            </div>
                            <!-- Bottone per resettare il filtro della media delle votazioni -->
                            <div class="col">
                                <span class="fs-3" @click="resetRating"><i class="fa-solid fa-xmark me-3"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="roles-container p-4 mb-5 bg-white">
                        <h4 class="mb-4 fw-bold fs-4">Ruoli selezionati</h4>

                        <!-- Mostra i ruoli selezionati -->
                        <div v-if="selectedRoles.length > 0">
                            <div class="row justify-content-between">
                                <div class="col-6 text-center mb-3" v-for="(role, index) in selectedRoles" :key="index">
                                    <!-- Bottone per rimuovere un ruolo selezionato -->
                                    <button class="button-roles-filters px-4 active" type="button" @click="removeRole(role)">{{ role.title }}</button>
                                </div>
                            </div>
                            <!-- Bottone per rimuovere tutti i ruoli selezionati -->
                            <span class="remove-roles" @click="removeSelectedRoles"><i class="fa-solid fa-xmark me-3 fs-3"></i></span>
                        </div>

                        <!-- Messaggio se non ci sono ruoli selezionati -->
                        <div v-else>
                            <p>Nessun ruolo selezionato</p>
                        </div>
                    </div>
                    <!-- Bottone per annullare tutti i filtri -->
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-dark rounded-5 py-3 px-5" @click="resetFilters">Annulla Filtri</button>
                    </div>
                </div>
                <!-- Pulsante di ricerca -->
                <div class="button-search my-button"></div>
            </aside>
            
            <!-- Contenitore dei risultati della ricerca -->
            <div v-if="!loading" class="col-12 col-md-7 card-section">
                <!-- Titolo degli artisti in evidenza -->
                <h2 class="fw-bold px-4 py-3 fs-1">Artisti in evidenza</h2>
                <div class="card-container d-flex flex-wrap p-4" style="max-height: 900px; overflow-y: auto;">
                    <!-- Controlla se ci sono utenti filtrati -->
                    <div v-if="filteredMusicians.length === 0" class="no-result-message fw-bold fs-2 card w-100 text-center py-5">Nessun risultato!</div>

                    <div 
                        class="row mb-5 card-content position-relative" 
                        :class="{ 'show-card': !loading, 'filtered': filteredMusicians.length < allMusicians.length }"
                        v-for="(singleMusician, index) in filteredMusicians" 
                        :key="singleMusician.id"
                    >
                        <!-- Immagine dell'artista -->
                        <div class="col-4 img-artist" v-if="singleMusician && singleMusician.user_details && singleMusician.user_details.picture" :style="{ 'background-image': 'url(http://127.0.0.1:8000/storage/' + singleMusician.user_details.picture + ')', 'background-position': 'center', 'background-size': 'cover' }">     
                        </div>
                        <!-- Contenitore delle informazioni dell'artista -->
                        <div class="col-8 border my-bg-grey position-relative">
                            <div class="card-body">
                                <!-- Nome dell'artista -->
                                <h5 class="card-title fw-bold fs-4 ps-3 pt-4 mb-3">
                        {{ singleMusician.name }}
                        <span v-if="singleMusician.isSponsored" class="badge badge-small badge-success"><i class="bi bi-award-fill"></i></span>
                    </h5>
                                
                    <!-- Biografia dell'artista -->
                                <p v-if="singleMusician && singleMusician.user_details && singleMusician.user_details.bio" class="card-text h-50 overflow-hidden ps-3 bio-text">{{ singleMusician.user_details.bio }}</p>

                                                
                                <!-- Linee oblique per gli utenti sponsorizzati -->
                                <div v-if="singleMusician.isSponsored" class="sponsor-lines"></div>
                                                
                                <!-- Link al profilo dell'artista -->
                                <router-link :to="{ name: 'profile', params: { name:singleMusician.name } }" class="btn my-btn text-white inline-block h-25 border">Vedi Profilo</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div v-if="loading" class="loading-overlay">
        <img src="https://media.tenor.com/eMrZP9HBkqEAAAAj/frkst-records.gif" alt="Caricamento in corso..." class="loading-spinner">
        <!-- <p class="fw-bold fs-3">Caricamento in corso...</p> -->
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/partials/SearchPage.scss';

// Badge Sponsor
.card-title {
    position: relative;
}

.badge-success {
    background-color: darkgreen;
}

.badge-small {
    font-size: 0.8em;
    padding: 0.2em 0.5em;
    margin-left: 10px;
}
//

.search-section {
    padding: 40px;
    .search-container {
        max-width: 1200px;
        .input-container {
            max-height: 300px;
            padding: 30px 10px;
            .input-searchbar {
                width: 80%;
                border: 1px solid #21252B;
                border-radius: 40px;
                background-color: #F2F2F2;
                padding: 10px 40px;
                position: relative;
                font-size: .8em;
            }
            .search-icon {
                position: absolute;
                top: 48px;
                right: 180px;
                font-size: 1.2em;
                color: #21252B;
            }
        }
    }
    .wrapper {
        /* border: 11px solid goldenrod; */
        aside{
            background-color: #F4F4F4;
            border-radius: 30px;
            .roles-container{
                max-height: 400px;
                position: relative;
                border: 1px solid #21252B;
                border-radius: 20px;
                overflow-y: auto;
                .remove-roles{
                    position: absolute;
                    bottom: 5px;
                    left: 20px;
                    cursor: pointer;
                }
            }
            .reviews-container{
                height: 200px;
                position: relative;
                border: 1px solid #21252B;
                border-radius: 20px;
                .input-min-reviews{
                    width: 80%;
                    border: 2px solid #21252B;
                    border-radius: 40px;
                    background-color: #F2F2F2;
                    padding: 10px 40px;
                    margin: 0;
                    position: relative;
                    font-size: .8em;
                    text-align: center;
                    font-weight: bold;
                }
            }
            .vote-container{
                height: 200px;
                position: relative;
                border: 1px solid #21252B;
                border-radius: 20px;
                .star {
                    cursor: pointer;
                    font-size: 30px;
                    color: #21252B;
                    margin: 0 10px;
                    &:hover {
                        color: #BADFDA;
                        
                    }
                }
            }
        }
    }
    .card-container {
        .card-content {
            height: 200px;
            overflow: hidden;
            border-radius: 10px;
            overflow: hidden;
            &:hover{
                .sponsor-badge{
                    
                    opacity: 1;
                }
            }
            .sponsor-badge{
                position: absolute;
                top: 10px;
                right: 0;
                z-index: 100;
                background-color: green;
                color: white;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                border-radius: 20px 0 0 20px;
                opacity: 0; /* Il badge è nascosto per impostazione predefinita */
                transition: opacity 1s ease; /* Aggiungi una transizione per rendere l'animazione fluida */
            }
            .img-artist {
                background-position: center;
                background-size: 100%;
                border-radius: 10px 0 0 10px;
            }
        }
    }
}
.my-bg-grey{
    background-color: #F4F4F4;
}

.mycol-2 {
    width: calc((100% / 5) - 40px );
    margin: 10px 20px;
}
.button-roles {
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
.bio-text {
    max-height: 3.6em; /* Altezza massima di tre righe (3 righe * altezza del carattere) */
    line-height: 1.2em; /* Altezza di una riga (altezza del carattere) */
    overflow: hidden; /* Nasconde il testo in eccesso */
    text-overflow: ellipsis; /* Aggiunge i puntini di sospensione se il testo supera le tre righe */
    white-space: normal; /* Consente al testo di andare a capo */
    width: 100%; /* Imposta una larghezza fissa per il contenitore del testo */
    display: -webkit-box; /* Permette il troncamento multilinea */
    -webkit-line-clamp: 3; /* Imposta il numero massimo di righe da visualizzare */
    -webkit-box-orient: vertical; /* Orienta il testo in senso verticale */
}

.my-btn{
    background-color: #21252B;
    padding: 10px 30px;
    font-weight: bold;
    border-radius: 30px;
    &:hover{
        background-color: grey;
        border: 1px solid #21252B;
    }
}

.fa-xmark{
    cursor: pointer;
}

.card-content.show-card {
    animation: fadeIn 2.5s ease forwards; /* Applica l'animazione fadeIn solo alle card quando vengono visualizzate */
}

@keyframes fadeIn {
    from {
        opacity: 0; /* Parti con opacità 0 */
    }
    to {
        opacity: 1; /* Arriva a opacità 1 */
    }
}

.button-roles-filters {
  position: relative;
  background-color: #21252B;
    color: white;
    font-weight: bold;
    border: 1px solid grey;
    padding: 10px 0;
    border-radius: 20px;
  overflow: hidden; /* Nasconde eventuali contenuti che fuoriescono dalla card */
}

/* ----------------------------------- */
/* RESPONSIVE WIP*/
.logo-instrument{
    border-radius: 50%;
    padding: 10px;
    &:hover{
        .title-hover{
            display: block;
        }
    }
}
.title-hover{
    display: none;
}

/* .logo-instrument:hover .title-hover{
    display: block;
} */

.bischero-leonardo:hover+.title-hover{
    display: block;
}

.active-roles-resp{
    border: 1px solid #21252B;
    background-color: #BADFDA;
}

.input-container {
    position: relative;
}

.input-searchbar {
    padding-right: 30px; /* Spazio a destra per l'icona */
}

.search-icon {
    position: absolute;
    top: 50%;
    right: 0px; /* Distanza dalla destra */
    transform: translate(20px, -35%);
}

.sponsor-lines {
    position: absolute;
    top: 10px;
    right: -20px;
    width: 60px; /* Larghezza delle linee */
    height: 10px; /* Altezza delle linee */
    background-color: green; /* Colore delle linee */
    transform: rotate(45deg); /* Ruota le linee di 45 gradi */
}

@media (min-width: 425px) {
    .search-section {
        padding: 0 40px;
    }
}

</style>



<!-- 

<div class="row d-md-none">
            <div class="col-12">
                <div class="input-container position-relative mb-4 d-flex align-items-center justify-content-between">
                    <input type="text" v-model="searchQuery" class="form-control input-searchbar w-50 mx-2" placeholder="Cerca artisti o band..." @keyup="updateFilterMusicians()">
                    <input type="number" v-model="minimumReviews" class="form-control input-min-reviews w-50 mx-2 px-4" min="0" placeholder="Numero minimo di recensioni">
                </div>
                
                <div class="text-center mb-3">
                    
                    <span class="star mx-3" v-for="star in 5" :key="star" @click="rating = star, updateFilterMusicians()">
                    <span v-html="star <= rating ? '<i class=\'fa-solid fa-circle fs-3\'></i>' : '<i class=\'fa-regular fa-circle fs-3\'></i>'"></span>
                </span>
                </div>
            </div>
            <div class="col-12">
                <div class="row justify-content-between">
                    <div v-for="(role, index) in allRoles" :key="index" class="col-3 col-sm-2 my-2 mx-2">
                        <div
                            class="logo-instrument-container"
                            @click="toggleRoleSelection(role)"
                            
                            >
                            <img :src="'http://127.0.0.1:8000/storage/' + role.icon" alt="roleInstrument" class="w-50 border logo-instrument bischero-leonardo" :class="{ 'active-roles-resp': isRoleSelected(role) }">
                            <div class="title-hover">
                                {{ role.title }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


 -->