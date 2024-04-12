<script>
import { store } from '../store.js';
import axios from 'axios';

export default {
    data() {
        return {
            store,
            allMusicians: [],
            allMusiciansFiltered: [],
            allRoles: [],
            selectedRoles: [],
            selectedRole: store.roleFromHome,
            searchQuery: '',
            rating: null,
            minimumReviews: null,
            loading: false,
            nextPageUrl: null,
            prevPageUrl: null,
            sponsoredMusicians: [],
            showFiltersModal: false
        };
    },
    computed: {
        filteredMusicians() {
            let filtered = this.allMusicians;

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
            this.loading = true;
            try {
                const response = await axios.get(url);
                const allUsers = response.data.results.data;

                // Carica solo gli utenti sponsorizzati dalla chiamata a 'sponsor'
                const sponsoredResponse = await axios.get('http://127.0.0.1:8000/api/sponsor');
                const sponsoredMusicians = sponsoredResponse.data.results;

                // Segna tutti gli utenti sponsorizzati
                sponsoredMusicians.forEach(musician => {
                    musician.isSponsored = true;
                });

                // Aggiungi solo gli utenti non sponsorizzati all'array
                const nonSponsoredUsers = allUsers.filter(user => !user.isSponsored);
                nonSponsoredUsers.forEach(user => {
                    if (!this.allMusicians.some(existingUser => existingUser.id === user.id)) {
                        this.allMusicians.push(user);
                    }
                });

                // Aggiungi gli utenti sponsorizzati solo se non sono già presenti
                sponsoredMusicians.forEach(musician => {
                    if (!this.allMusicians.some(existingUser => existingUser.id === musician.id)) {
                        this.allMusicians.unshift(musician);
                    }
                });
            } catch (error) {
                console.error('Errore durante la chiamata API:', error);
            } finally {
                this.loading = false;
            }
        },

        async getSponsoredMusicians() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/sponsor');
                const sponsoredMusicians = response.data.results;

                // Segna tutti gli utenti sponsorizzati
                sponsoredMusicians.forEach(musician => {
                    musician.isSponsored = true;
                });

                // Rimuovi gli utenti sponsorizzati già presenti in allMusicians
                this.allMusicians = this.allMusicians.filter(musician => !musician.isSponsored);

                // Aggiungi gli utenti sponsorizzati all'inizio dell'array
                this.allMusicians.unshift(...sponsoredMusicians);
            } catch (error) {
                console.error('Errore durante la chiamata API:', error);
            }
        },
        async getRoles() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/roles');
                this.allRoles = response.data.results;
                console.log(this.allRoles)
            } catch (error) {
                console.error('Errore durante la chiamata API:', error);
            }
        },
        updateFilterMusicians(){
            this.filteredMusicians;
            this.$router.push({ query: null });
        }, 
        resetFilters() {
            this.selectedRoles = [];
            this.searchQuery = '';
            this.rating = null;
            this.minimumReviews = null;
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
        },
        resetRating() {
            this.rating = null;
            this.updateFilterMusicians();
        },
        removeRole(roleToRemove) {
            this.selectedRoles = this.selectedRoles.filter(role => role !== roleToRemove);
            this.updateFilterMusicians();
        },
        removeSelectedRoles() {
            this.selectedRoles = [];
            this.updateFilterMusicians();
        },
        resetMinimumReviews() {
            this.minimumReviews = null;
            this.updateFilterMusicians();
        },
        lazyLoadImages() {
            const lazyImages = document.querySelectorAll('.lazy');
            lazyImages.forEach(image => {
                if (this.isElementInViewport(image)) {
                    image.src = image.dataset.src;
                    image.onload = () => {
                        image.classList.add('loaded');
                    };
                }
            });
        },
        isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },
        toggleFiltersModal() {
            console.log(this.showFiltersModal)
            this.showFiltersModal = !this.showFiltersModal;
        }
        
    },
    created(){
        this.getRoles();
        console.log(this.allRoles)
        window.addEventListener('scroll', this.lazyLoadImages);

        if (store.roleFromHome != null) {
            this.selectedRoles.push(store.roleFromHome);
        } else {
            this.getSponsoredMusicians(); // Chiamata diretta a getSponsoredMusicians
            this.getMusicians();
        }
        console.log('allMusicians', this.allMusicians)
    },
    destroyed() {
        window.removeEventListener('scroll', this.lazyLoadImages);
    }
};
</script>
<template>
    <section class="search-section container-xl mb-5">
        <!-- ------------------------------- -->
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
                    <div v-for="(role, index) in allRoles" :key="index" class="col-2 my-2 mx-2">
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
        <!-- ------------------------------- -->
        <div class="search-container">
            <h1 class="fw-bold  d-none d-md-block">Trova artisti o band {{ store.roleFromHome }}</h1>
            <div class="input-container position-relative  d-none d-md-block">
                <input type="text" v-model="searchQuery" class="form-control input-searchbar" placeholder="Cerca artisti o band..." @keyup="updateFilterMusicians()">
                <span class="search-icon">
                    <i class="fa-solid fa-magnifying-glass position-absolute"></i>
                </span>
            </div>
            
            <div class="container d-flex flex-wrap justify-content-center mb-5">
                <div v-for="(role, index) in allRoles" :key="index" class="mycol-2 my-2 d-none d-md-block">
                    <button
                    class="button-roles"
                    type="button"
                    @click="toggleRoleSelection(role)"
                    :class="{ 'active': isRoleSelected(role) }"
                    
                    >
                    {{ role.title }}
                    </button>
                    
                </div>
            </div>
        </div>

        <div class="wrapper row justify-content-between">
            <aside class="col-4 border my-bg-grey py-5 px-4 d-none d-md-block">
                <h2 class="fw-bold fs-1 mb-4">Filtri</h2>
                <div class="filter-container">
                    <div class="roles-container p-4 mb-5 bg-white">
                        <h4 class="mb-4 fw-bold fs-4">Ruoli selezionati</h4>

                        <div v-if="selectedRoles.length > 0">
                            <div class="row justify-content-between">
                                <div class="col-6 text-center mb-3" v-for="(role, index) in selectedRoles" :key="index">
                                    <button class="button-roles-filters px-4 active" type="button" @click="removeRole(role)">{{ role.title }}
                                    <div class="fire-overlay"></div> <!-- Sovrapposizione semi-trasparente -->
                                    
                                    </button>
                                </div>
                            </div>
                            <span class="remove-roles" @click="removeSelectedRoles"><i class="fa-solid fa-xmark me-3 fs-3"></i></span>
                        </div>

                        <div v-else>
                            <p>Nessun ruolo selezionato</p>
                        </div>
                    </div>
                    <div class="reviews-container p-4 mb-5 bg-white">
                        <h4 class="mb-4 fw-bold fs-4">N. Minimo Recensioni</h4>
                        <input type="number" v-model="minimumReviews" class="form-control input-min-reviews w-100 px-4 mb-3" min="0" placeholder="Numero minimo di recensioni">
                        <span class="fs-3" @click="resetMinimumReviews"><i class="fa-solid fa-xmark me-3"></i></span>
                    </div>
                    <div class="vote-container p-4 mb-5 bg-white">
                        <h4 class="mb-4 fw-bold fs-4">Media votazioni</h4>
                        <div class="row align-items-center">
                            <div class="col-11 px-0 mb-2">
                                <span class="star" v-for="star in 5" :key="star" @click="rating = star, updateFilterMusicians()">
                                    <span v-html="star <= rating ? '<i class=\'fa-solid fa-circle\'></i>' : '<i class=\'fa-regular fa-circle\'></i>'"></span>
                                </span>
                            </div>
                            <div class="col">
                                <span class="fs-3" @click="resetRating"><i class="fa-solid fa-xmark me-3"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button-search my-button"></div>
            </aside>
            <div v-if="!loading" class="col-12 col-md-7 card-section">
                <h2 class="fw-bold px-4 py-3 fs-1">Artisti in evidenza</h2>
                <div class="card-container d-flex flex-wrap p-4" style="max-height: 900px; overflow-y: auto;">
                <!-- <transition-group name="fade" tag="div" class="card-container d-flex flex-wrap p-4" style="max-height: 900px; overflow-y: auto;"> -->
                    <div 
                        class="row mb-5 card-content position-relative" 
                        :class="{ 'show-card': !loading, 'filtered': filteredMusicians.length < allMusicians.length }"
                        v-for="(singleMusician, index) in filteredMusicians" 
                        :key="singleMusician.id"
                    >
                        <div class="col-4 img-artist" :style="{ 'background-image': 'url(http://127.0.0.1:8000/storage/' + singleMusician.user_details.picture + ')', 'background-position': 'center', 'background-size': 'cover' }">     
                        </div>
                        <div class="col-8 border my-bg-grey">
                            <div class="card-body">
                                <h5 class="card-title fw-bold fs-4 ps-3 pt-4 mb-3">{{ singleMusician.name }}</h5>
                                <p class="card-text h-50 overflow-hidden ps-3 bio-text">{{ singleMusician.user_details.bio }}</p>
                                
                                <div v-if="singleMusician.isSponsored" class="sponsor-badge">
                                    <i class="fa-solid fa-bolt fa-beat"></i>
                                </div>
                                
                                <router-link :to="{ name: 'profile', params: { name:singleMusician.name } }" class="btn my-btn text-white inline-block h-25 border">Vedi Profilo</router-link>
                            </div>
                            

                        </div>
                    </div>
                <!-- </transition-group> -->
                </div>
            </div>
        </div>
    </section>

    <div v-if="loading" class="loading-overlay">
        <div class="spinner-border me-4" role="status">
            <span class="visually-hidden">Caricamento...</span>
        </div>
        <p class="fw-bold fs-3">Caricamento in corso...</p>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/partials/SearchPage.scss';

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


@keyframes fireAnimation {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.1);
    opacity: 0.8;
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

.fire-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://usagif.com/wp-content/uploads/gifs/fire-23.gif'); /* Imposta l'immagine di fuoco come sfondo */
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px; /* Arrotonda i bordi della sovrapposizione */
  opacity: 0.5; /* Opacità della sovrapposizione semi-trasparente */
  animation: fireSpread 2s infinite alternate; /* Applica l'animazione al fuoco */
}

@keyframes fireSpread {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
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
</style>