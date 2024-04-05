<script>
import axios from 'axios';

export default {
    data() {
        return {
        apiUrl: 'http://127.0.0.1:8000/api/',
        singleMusician: null,
        demoPath: '',
        contactForm: {
            firstname: '',
            lastname: '',
            email: '',
            message: '',
            user_id: ''// --------
        },
        reviewForm: {
            firstname: '',
            lastname: '',
            description: '',
            user_id: ''
        },
        voteForm: {
            user_id: '',
            vote: ''
        },
        isSubmitting: false,
        errorMessage: '',
        successMessage: '',
        showReviewForm: false,
        activeStar: null // Nuova proprietà per gestire la stella attiva
        };
    },
    methods: {
        async fetchUserData() {
            try {
                const response = await axios.get(`${this.apiUrl}users/${this.$route.params.name}`);
                this.singleMusician = response.data.result;
                this.demoPath = `http://127.0.0.1:8000/storage${this.singleMusician.user_details.demo}`;
                this.contactForm.user_id = this.singleMusician.id;
                this.reviewForm.user_id = this.singleMusician.id;
                this.voteForm.user_id = this.singleMusician.id;
                console.log(this.singleMusician);
            } catch (error) {
                console.error('Errore durante la chiamata API:', error);
            }
        },
        async sendMessage() {
            this.isSubmitting = true;
            try {
                const response = await axios.post(`${this.apiUrl}messages`, this.contactForm);
                this.successMessage = 'Messaggio inviato con successo';
                this.resetForm();
            } catch (error) {
                this.errorMessage = 'Errore durante l\'invio del messaggio';
                console.error('Errore durante l\'invio del messaggio:', error);
            } finally {
                this.isSubmitting = false;
            }
        },
        async submitReview() {
            if (this.reviewForm.description && this.reviewForm.firstname && this.reviewForm.lastname) {
                this.isSubmitting = true;
                try {
                const response = await axios.post(`${this.apiUrl}reviews`, this.reviewForm);
                this.successMessage = 'Recensione inviata con successo';
                this.resetReviewForm();
                this.submitVote();
                } catch (error) {
                this.errorMessage = 'Errore durante l\'invio della recensione';
                console.error('Errore durante l\'invio della recensione:', error);
                } finally {
                this.isSubmitting = false;
                }
            }
        },
        async submitVote() {
            this.isSubmitting = true;
            try {
                const response = await axios.post(`${this.apiUrl}votes`, this.voteForm);
                console.log('Voto inviato con successo:', response.data);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    this.errorMessage = error.response.data.message;
                } else {
                    this.errorMessage = 'Errore durante l\'invio del voto.';
                }
                console.error('Errore durante l\'invio del voto:', error);
            } finally {
                this.isSubmitting = false;
            }
        },
        resetForm() {
            this.contactForm = {
                firstname: '',
                lastname: '',
                email: '',
                message: '',
                user_id: this.singleMusician.id
            };
        },
        resetReviewForm() {
            this.reviewForm = {
                firstname: '',
                lastname: '',
                description: '',
                user_id: this.singleMusician.id
            };
        },
        toggleReviewForm() {
            this.showReviewForm = !this.showReviewForm;
        },
        closeReviewForm() {
            this.showReviewForm = false;
        },
        setVote(star) {
            this.activeStar = star; // Imposta la stella attiva al passaggio del mouse
        },
        setActiveStar(star) {
            if (!this.voteForm.vote) {
                this.activeStar = star; // Imposta la stella attiva solo se il voto non è stato già assegnato
            }
        }
    },
    created() {
        this.fetchUserData();
    }
};
</script>


<template>
    <div>
        <div v-if="singleMusician && singleMusician.user_details" class="container-fluid user-img d-flex justify-content-center flex-column mb-5"
            :style="{ 'background-image': 'url(http://127.0.0.1:8000/storage/' + singleMusician.user_details.picture + ')' }">
    
            <h1 class="text-white ms-5">{{ singleMusician.name }}</h1>
            <h2 class="text-white ms-5">{{ singleMusician.city }}</h2>
        </div>
        <div class="container mb-5">
            <div class="row justify-content-between ">
                <div class="col-6">
                    <h2 class="fw-bold pt-3 mb-4">Bio</h2>
                    <p v-if="singleMusician && singleMusician.user_details">{{ singleMusician.user_details.bio }}</p>
                </div>
                <div class="col-4 text-end">
                    <h2 class="fw-bold pt-3 mb-4 ">Competenze</h2>
                    <div>
                    <span v-if="singleMusician && singleMusician.roles" v-for="(role, i) in singleMusician.roles" :key="i" >
                        <img :src="'http://127.0.0.1:8000/storage/' + role.icon" alt="roleInstrument" class="instrument-pic ">
                    </span>
                    </div>
                </div>
                <div class="col-12 mb-5">
                    <h2 class="fw-bold pt-3 mb-4">Demo</h2>
                    <audio v-if="singleMusician && singleMusician.user_details" controls class="w-100 ">
                    <source :src="demoPath" type="audio/mpeg">
                    </audio>
                </div>
                <div class="col-12 mb-5">
                    <h2 class="fw-bold pt-3 mb-4">Info di contatto</h2>
                    <div v-if="singleMusician && singleMusician.user_details">
                    <i class="fa-solid fa-phone me-3"></i>
                    Mail: {{ singleMusician.email }}
                    </div>
                    <div v-if="singleMusician && singleMusician.user_details">
                    <i class="fa-solid fa-envelope me-3"></i>
                    Cell: {{ singleMusician.user_details.cellphone }}
                    </div>
                </div>
            </div>
            <section v-if="singleMusician && singleMusician.reviews" class="full-page-section mb-5">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 p-0">
                            <div class="reviews-container">
                                <div class="reviews-wrapper">
                                    <!-- Card di esempio -->
                                    <div v-for="(review, index) in singleMusician.reviews" :key="index" class="review-item" style="background-color: #2E333A;">
                                        <div class="review-content">
                                            <h4 class="review-title" style="color: white;">{{ review.firstname + ' ' + review.lastname }}</h4>
                                            <p class="review-description" style="color: white;">{{ review.description }}</p>
                                        </div>
                                        <!-- Stampa le stelle in base al voto della recensione corrente -->
                                        <div class="stars-container">
                                            <span v-if="singleMusician.votes[index]?.vote" v-for="i in parseInt(singleMusician.votes[index]?.vote)" class="star-reviews"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Form per inserire una recensione e un voto -->
            <section v-if="showReviewForm" id="sectionReviews" class="contact-section" style="background-color: white;">
                <div class="container-fluid border">
                    <h2 class="text-black text-center py-5">Scrivi una recensione</h2>
                    <form @submit.prevent="submitReview" class="contact-form">
                        <div class="mb-3">
                            <label for="firstname" class="form-label text-black">Nome*</label>
                            <input type="text" v-model="reviewForm.firstname" class="form-control" id="firstname"
                                placeholder="Inserisci il tuo nome..." required maxlength="74">
                        </div>
                        <div class="mb-3">
                            <label for="lastname" class="form-label text-black">Cognome*</label>
                            <input type="text" v-model="reviewForm.lastname" class="form-control" id="lastname"
                                placeholder="Inserisci il tuo cognome..." required maxlength="74">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label text-black">Recensione*</label>
                            <textarea v-model="reviewForm.description" class="form-control" id="description" rows="5" required
                                maxlength="2048"
                                placeholder="Inserisci la tua recensione..."></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-black">Voto*</label>
                            <div class="rating-input">
                                <!-- <span class="star" v-for="star in 5" :key="star" @click="setVote(star)" @mouseover="setActiveStar(star)">
                                    <span class="star-reviews" :class="{ 'active': star <= activeStar, 'disabled': star > activeStar }"></span>
                                </span> -->
                                <input type="number" name="vote" v-model="voteForm.vote" id="" min="1" max="5">
                            </div>
                        </div>
                        <div class="text-center py-5">
                            <button type="submit" class="btn button-send-review btn-lg">Invia Recensione</button>
                            <button type="button" @click="closeReviewForm" class="btn button-send-review btn-lg">Annulla</button>
                        </div>
                    </form>
                </div>
            </section>
    
            <div class="d-flex justify-content-center">
                <button @click="toggleReviewForm" v-if="!showReviewForm" class="btn-write-review">Scrivi una recensione</button>
            </div>
        </div>

        <!-- Sezione Contatti -->
        <section class="contact-section">
            <div class="container">
                <h2 class="text-white text-center py-5">Contatta l'utente!</h2>
                <form @submit.prevent="sendMessage">
                    <div class="mb-3">
                        <label for="firstname" class="form-label text-white">Nome*</label>
                        <input type="text" v-model="contactForm.firstname" class="form-control" id="firstname"
                        placeholder="Inserisci il tuo nome..." required maxlength="74">
                    </div>
                    <div class="mb-3">
                        <label for="lastname" class="form-label text-white">Cognome*</label>
                        <input type="text" v-model="contactForm.lastname" class="form-control" id="lastname"
                        placeholder="Inserisci il tuo cognome..." required maxlength="74">
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label text-white">Email*</label>
                        <input type="email" v-model="contactForm.email" class="form-control" id="email"
                        placeholder="Inserisci la tua mail..." required maxlength="255">
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label text-white">Messaggio*</label>
                        <textarea v-model="contactForm.message" class="form-control" id="message" rows="5" required
                        maxlength="2048"
                        placeholder="Lascia un messaggio che verrà visualizzato dall'artista..."></textarea>
                    </div>
                    <div class="text-center py-5">
                        <button type="submit" class="btn my-button btn-lg">Invia</button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>

.user-img {
    min-height: 500px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

.instrument-pic {
    max-width: 100px;
}

.contact-section {
    background-color: #21252B;

    h2 {
        font-size: 3rem;
        font-weight: bold;
    }

    .my-button {
        background-color: white;
        border-radius: 30px;
        color: #21252B;
        font-weight: bold;
        padding: 10px 20px;
    }
}

#sectionReviews {
    .review-form {
        margin-bottom: 20px;
        background-color: #21252B;
        min-height: 200px;
        position: relative;

        input {
            border-radius: 20px;
            margin: 10px 0;
            min-width: 200px;
        }

        .btn-send-review {
            padding: 10px 20px;
            background-color: white;
            border-radius: 25px;
            color: #21252B;
            font-weight: bold;
        }

        .btn-close-review {
            width: 30px;
            height: 30px;
            line-height: 25px;
            border-radius: 50%;
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }

    .star-reviews {
        display: inline-block;
        margin-right: 8px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: #BADFDA;
    }

    .active {
        background-color: #21252B;
    }

    .button-send-review {
        background-color: #21252B;
        color: white;
        border-radius: 30px;
        font-weight: bold;
        margin-right: 15px;
        padding: 10px 20px;
    }
}

.btn-write-review {
    background-color: #21252B;
    color: white;
    padding: 15px 30px;
    border-radius: 25px;
}

.full-page-section {
    height: 280px; // Altezza fissa
    overflow-y: auto; // Scrolling
    padding: 30px 0;
    margin-bottom: 30px;
}

.review-item {
    margin-bottom: 20px;
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 10px;

    .review-title {
        font-size: 18px;
        margin-bottom: 5px;
    }

    .review-description {
        font-size: 16px;
        margin-bottom: 10px;
    }

    .stars-container {
        display: flex;

        .star-reviews {
            width: 20px;
            height: 20px;
            background-color: #BADFDA;
            border-radius: 50%;
            margin-right: 5px;
        }
    }
}

</style>