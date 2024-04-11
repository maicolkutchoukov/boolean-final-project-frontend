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
            selectedRole: store.roleFromHome, // Imposta selectedRole su store.roleFromHome
            searchQuery: '',
            rating: null,
            minimumReviews: null,
            loading: false,
            nextPageUrl: null,
            prevPageUrl: null,
        };
    },
    computed: {
        filteredMusicians() {
            /* let filtered = this.allMusiciansFiltred !== null ? this.allMusiciansFiltred : this.allMusicians; */
            let filtered = this.allMusicians;

            // Filtraggio per ruolo
            if (this.selectedRole) {
                filtered = filtered.filter(musician => musician.roles.some(role => role.title === this.selectedRole.title));
            }

            // Filtraggio per nome
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
            console.log('Chiamata filtredMusicians', filtered)
            return filtered;
        }
    },
    methods: {
        async advancedSearch() {
        if (this.selectedRole) {
            store.roleFromHome = this.selectedRole;
            await this.getMusiciansByRole(); // Aggiornamento dei musicisti in base al ruolo selezionato
            this.$router.push({ name: 'search', query: { role: this.selectedRole.title } });
        } else {
            console.log('Errore: nessun ruolo selezionato');
        }
    },
        async search(url = 'http://127.0.0.1:8000/api/users') {
            this.loading = true;
            try {
                const response = await axios.get(url, {
                    params: {
                        name: this.searchQuery,
                        roles: this.selectedRole ? this.selectedRole.title : null
                    }
                });
                this.updateMusicians(response);
                console.log('Chiamata search')

            } catch (error) {
                console.error('Errore durante la chiamata API:', error);
            } finally {
                this.loading = false;
            }
        },
        async getMusicians(url = 'http://127.0.0.1:8000/api/users') {
            this.loading = true;
            try {
                const response = await axios.get(url);
                this.updateMusicians(response);
                console.log('Chiamata getMusicians', this.allMusicians)

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
        async getMusiciansByRole() {
            this.loading = true;
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users');
                const musicians = response.data.results.data;

                // Filtra i musicisti in base al ruolo selezionato
                this.allMusiciansFiltered = musicians.filter(musician =>
                    musician.roles.some(role => role.title === this.selectedRole)
                );
                console.log('Chiamata getMusiciansByRole', this.allMusicians);
                return this.allMusiciansFiltered
            } catch (error) {
                console.error('Errore durante la chiamata API:', error);
            } finally {
                this.loading = false;
            }
        },
        updateMusicians(response) {
            this.allMusicians = response.data.results.data;
            if (response.data.results.next_page_url || response.data.results.prev_page_url) {
                this.nextPageUrl = response.data.results.next_page_url;
                this.prevPageUrl = response.data.results.prev_page_url;
            console.log('Chiamata updateMusicians')

            } else {
                this.nextPageUrl = null;
                this.prevPageUrl = null;
            }
        },
        resetFilters() {
            this.selectedRole = null;
            this.searchQuery = '';
            this.rating = null;
            this.minimumReviews = null;
            store.roleFromHome = null
            console.log('reset this.allMusiciansFiltered', this.allMusiciansFiltered)
            console.log('reset this.allMusicians', this.allMusicians)
            console.log('reset store.roleFromHome', store.roleFromHome)
            this.filteredMusicians


        },
        getProfilePicture(musician) {
            return musician.user_details && musician.user_details.picture ? 'http://127.0.0.1:8000/storage/' + musician.user_details.picture : '';
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
        }
    },
    created(){
        this.getRoles(); // Carica prima i ruoli
        window.addEventListener('scroll', this.lazyLoadImages);
        console.log('created-1',this.allMusicians)
        // Verifica se store.roleFromHome è diverso da null
        if (store.roleFromHome != null) {
            // Se store.roleFromHome non è null, imposta selectedRole e avvia la ricerca per ruolo
            this.selectedRole = store.roleFromHome;
            this.getMusiciansByRole();
            console.log('created-2',this.allMusicians)

            console.log('store', store.roleFromHome, this.selectedRole)
        } else {
            // Altrimenti, esegui una ricerca standard
            this.getMusicians();
        }
    },
    
    destroyed() {
        window.removeEventListener('scroll', this.lazyLoadImages);
    }
};
</script>


<template>
    <div class="container">
        <!-- Loader pagina -->
        <div v-if="loading" class="loading-overlay">
            <div class="spinner-border me-4" role="status">
                <span class="visually-hidden">Caricamento...</span>
            </div>
            <p class="fw-bold fs-3">Caricamento in corso...</p>
        </div>

        <h1 class="p-5 fw-bold">Trova artisti o band {{ store.roleFromHome }}</h1>
        
        <div class="row">
            <div class="col-md-6 col-lg-4">
                <div class="mb-3">
                    <input type="text" v-model="searchQuery" class="form-control input-searchbar" placeholder="Cerca artisti o band...">
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="mb-3">
                    <div class="star-rating text-center">
                        <span class="star" v-for="star in 5" :key="star" @click="rating = star">
                            {{ star <= rating ? '★' : '☆' }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="mb-3">
                    <input type="number" v-model="minimumReviews" class="form-control input-min-reviews" min="0" placeholder="Numero minimo di recensioni">
                </div>
            </div>
        </div>

        <div class="container d-flex flex-wrap justify-content-center">
            <div v-for="(role, index) in allRoles" :key="index" class="mycol-md-2 my-2">
                <button class="button-roles"
                        type="button"
                        @click="selectedRole = role"
                        :class="{ 'active': selectedRole === role }">
                    {{ role.title }}
                </button>
            </div>
        </div>

        <button class="btn btn-secondary" @click="resetFilters">Reset</button>

        <!-- <div v-if="!loading" class="container">
            <h2 class="p-5 fw-bold">Artisti in evidenza</h2>
            <transition-group name="fade" tag="div" class="row">
                <div class="col-6 col-md-4 col-lg-4" v-for="(singleMusician, index) in filteredMusicians" :key="singleMusician.id">
                    <div class="card animated-card" :class="{ 'show-card': !loading }">
                        <img :src="getProfilePicture(singleMusician)" class="card-img-top lazy" :data-src="getProfilePicture(singleMusician)" :alt="'Immagine di ' + singleMusician.name">
                        <div class="card-body">
                            <h5 class="card-title">{{ singleMusician.name }}</h5>
                            <p class="card-text">{{ singleMusician.city }}</p>
                            <router-link :to="{ name: 'profile', params: { name:singleMusician.name } }" class="btn btn-primary btn-sm">Vedi Profilo</router-link>
                        </div>
                    </div>
                </div>
            </transition-group>
        </div> -->
        <div v-if="!loading" class="container">
            <h2 class="p-5 fw-bold">Artisti in evidenza</h2>
             <!-- Se il parametro è presente nella query URL, visualizza allMusiciansFiltered -->
            
            <div v-if="store.roleFromHome != null">
                <transition-group name="fade" tag="div" class="row">
                    <div class="col-6 col-md-4 col-lg-4" v-for="(singleMusician, index) in allMusiciansFiltered" :key="singleMusician.id">
                        <div class="card animated-card" :class="{ 'show-card': !loading }">
                            <img :src="getProfilePicture(singleMusician)" class="card-img-top lazy" :data-src="getProfilePicture(singleMusician)" :alt="'Immagine di ' + singleMusician.name">
                            <div class="card-body">
                                <h5 class="card-title">{{ singleMusician.name }}</h5>
                                <p class="card-text">{{ singleMusician.city }}</p>
                                <router-link :to="{ name: 'profile', params: { name:singleMusician.name } }" class="btn btn-primary btn-sm">Vedi Profilo</router-link>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>

            <!-- Altrimenti, visualizza i dati filtrati -->
            <div v-else>
                <transition-group name="fade" tag="div" class="row">
                    <div class="col-6 col-md-4 col-lg-4" v-for="(singleMusician, index) in filteredMusicians" :key="singleMusician.id">
                        <div class="card animated-card" :class="{ 'show-card': !loading }">
                            <img :src="getProfilePicture(singleMusician)" class="card-img-top lazy" :data-src="getProfilePicture(singleMusician)" :alt="'Immagine di ' + singleMusician.name">
                            <div class="card-body">
                                <h5 class="card-title">{{ singleMusician.name }}</h5>
                                <p class="card-text">{{ singleMusician.city }}</p>
                                <router-link :to="{ name: 'profile', params: { name:singleMusician.name } }" class="btn btn-primary btn-sm">Vedi Profilo</router-link>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import '../assets/scss/partials/SearchPage.scss';
.filter-bar{
    height: 800px;
}

.card-musician{
    height: 300px;
    img{
        object-fit: cover;
    }
}
</style>





        //<!-- Paginazione -->
        //<!-- <div class="row justify-content-center mt-4" v-if="!loading && (prevPageUrl || nextPageUrl)">
        //    <div class="col-auto">
        //        <button v-if="prevPageUrl" @click="getMusicians(prevPageUrl)" class="btn btn-secondary">Pagina precedente</button>
        //    </div>
        //    <div class="col-auto">
        //        <button v-if="nextPageUrl" @click="getMusicians(nextPageUrl)" class="btn btn-secondary">Pagina successiva</button>
        //    </div>
        //</div> -->

        async getRoles() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/roles');
                this.allRoles = response.data.results;
            } catch (error) {
                console.error('Errore durante la chiamata API:', error);
            }
        },
        async getMusicians(url = 'http://127.0.0.1:8000/api/users') {
            this.loading = true;
            try {
                const response = await axios.get(url);
                this.updateMusicians(response);
                console.log('Chiamata getMusicians')

            } catch (error) {
                console.error('Errore durante la chiamata API:', error);
            } finally {
                this.loading = false;
            }
        },