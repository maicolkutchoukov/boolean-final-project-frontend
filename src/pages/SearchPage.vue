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
                this.allMusicians = response.data.results.data;
                this.nextPageUrl = response.data.results.next_page_url;
                this.prevPageUrl = response.data.results.prev_page_url;
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
                this.allMusicians = response.data.results.data;
                this.nextPageUrl = response.data.results.next_page_url;
                this.prevPageUrl = response.data.results.prev_page_url;
            } catch (error) {
                console.error('Errore durante la chiamata API:', error);
            } finally {
                this.loading = false;
            }
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
        toggleRole(role) {
            const index = this.selectedRoles.indexOf(role);
            if (index !== -1) {
                this.selectedRoles.splice(index, 1);
            } else {
                this.selectedRoles.push(role);
            }
        }
    },
    created() {
        this.getMusicians();
    }
};
</script>

<template>
    <div class="container-fluid">
        <div v-if="loading" class="loading-overlay">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Caricamento...</span>
            </div>
            <p>Caricamento in corso...</p>
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

        <div v-if="!loading" class="container-fluid">
            <h2 class="p-5 fw-bold">Artisti in evidenza</h2>
            <div class="row">
                <div class="col-6 col-md-4 col-lg-3" v-for="(singleMusician, index) in filteredMusicians" :key="singleMusician.id">
                    <div class="card">
                        <img :src="getProfilePicture(singleMusician)" class="card-img-top" :alt="'Immagine di ' + singleMusician.name">
                        <div class="card-body">
                            <h5 class="card-title">{{ singleMusician.name }}</h5>
                            <p class="card-text">{{ singleMusician.city }}</p>
                            <router-link :to="{ name: 'profile', params: { name:singleMusician.name } }" class="btn btn-primary btn-sm">Vedi Profilo</router-link>
                        </div>
                    </div>
                </div>
            </div>
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

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7); // Trasparenza per un aspetto sfumato
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; // Assicura che l'overlay di caricamento sia in primo piano

    .spinner-border {
        width: 3rem;
        height: 3rem;
    }

    p {
        margin-top: 10px;
        font-size: 1rem;
    }
}
</style>