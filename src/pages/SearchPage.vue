<!-- 
        / \__
        (    @\___
        /         O
        /   (_____/
        /_____/ U
        
-->
<script>
import axios from 'axios';

export default {
    data() {
        return {
            allMusicians: [],
            allRoles: [],
            selectedRoles: [],
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
            let filtered = this.allMusicians;

            if (this.selectedRoles.length > 0) {
                filtered = filtered.filter(musician => this.selectedRoles.some(role => musician.roles.includes(role)));
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
        async search(url = 'http://127.0.0.1:8000/api/users') {
            this.loading = true;
            try {
                const response = await axios.get(url, {
                params: {
                    name: this.searchQuery,
                    roles: this.selectedRoles.join(',')
                }
                });
                this.updateMusicians(response);
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
            } catch (error) {
                console.error('Errore durante la chiamata API:', error);
            } finally {
                this.loading = false;
            }
            },
            updateMusicians(response) {
                this.allMusicians = response.data.results.data;
                this.nextPageUrl = response.data.results.next_page_url;
                this.prevPageUrl = response.data.results.prev_page_url;
            },
            resetFilters() {
                this.selectedRoles = [];
                this.searchQuery = '';
                this.rating = null;
                this.minimumReviews = null;
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
    mounted() {
        this.getMusicians();
        window.addEventListener('scroll', this.lazyLoadImages);
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
    
        <h2 class="p-5 fw-bold">Trova artisti o band</h2>
    
        <form @submit.prevent="search" class="mb-5">
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
                            :class="{ 'active': selectedRoles.includes(role) }"
                            @click="toggleRole(role)">
                    {{ role.title }}
                    </button>
                </div>
            </div>
        </form>
    
        <button class="btn btn-secondary" @click="resetFilters">Reset</button>
    
        <div v-if="!loading" class="container">
            <h2 class="p-5 fw-bold">Artisti in evidenza</h2>
            <transition-group name="fade" tag="div" class="row">
            <div class="col-6 col-md-4 col-lg-4" v-for="(singleMusician, index) in filteredMusicians" :key="singleMusician.id">
                <div class="card animated-card" :class="{ 'show-card': !loading }">
                <!-- Utilizzo del lazy loading per le immagini degli artisti -->
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
    
        <!-- Paginazione -->
        <div class="row justify-content-center mt-4" v-if="!loading">
            <div class="col-auto">
            <button v-if="prevPageUrl" @click="getMusicians(prevPageUrl)" class="btn btn-secondary">Pagina precedente</button>
            </div>
            <div class="col-auto">
            <button v-if="nextPageUrl" @click="getMusicians(nextPageUrl)" class="btn btn-secondary">Pagina successiva</button>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import '../assets/scss/partials/SearchPage.scss'

</style>