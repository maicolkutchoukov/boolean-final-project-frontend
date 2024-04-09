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
                user_id: ''
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
            activeStar: null, // Nuova proprietà per gestire la stella attiva
            averageVote: 0, // Variabile per memorizzare la media dei voti
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
                this.calculateRoundedAverageVote(); // Calcola la media dei voti quando si caricano i dati dell'utente
                console.log(this.singleMusician);
            } catch (error) {
                this.errorMessage = 'Errore durante la chiamata API';
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
        // Metodo per inviare la recensione
        async submitReview() {
            // Verifica se sono stati inseriti sia la recensione che il voto
            const hasReview = this.reviewForm.description.trim() !== '';
            const hasVote = this.voteForm.vote !== '';
            // Verifica se almeno uno dei due è stato inserito
            if (!hasReview && !hasVote) {
                this.errorMessage = 'Inserisci almeno una recensione o un voto.';
                return;
            }
            // Imposta l'id dell'utente nella recensione e nel voto
            this.reviewForm.user_id = this.singleMusician.id;
            this.voteForm.user_id = this.singleMusician.id;
            // Invia la recensione solo se è stata inserita
            if (hasReview) {
                try {
                    const response = await axios.post(`${this.apiUrl}reviews`, this.reviewForm);
                    this.successMessage = 'Recensione inviata con successo';
                    // Pulisce il form della recensione dopo l'invio
                    this.resetReviewForm();
                    // Invia il voto solo se è stato inserito
                    if (hasVote) {
                        await this.submitVote();
                    }
                } catch (error) {
                    this.errorMessage = 'Errore durante l\'invio della recensione';
                    console.error('Errore durante l\'invio della recensione:', error);
                }
            } else {
                // Invia il voto se non è stata inserita la recensione
                await this.submitVote();
            }
        },
        // Metodo per inviare il voto
        async submitVote() {
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
            }
        },
        // Metodo per calcolare la media dei voti
        calculateRoundedAverageVote() {
            if (this.singleMusician && this.singleMusician.votes && this.singleMusician.votes.length > 0) {
                let totalVotes = 0;

                for (let i = 0; i < this.singleMusician.votes.length; i++) {
                    const elem = parseInt(this.singleMusician.votes[i].vote);
                    if (!isNaN(elem)) {
                        totalVotes += elem;
                    }
                }

                const average = totalVotes / this.singleMusician.votes.length;
                console.log(average)
                // Arrotonda la media al 0.5 più vicino
                this.averageVote = Math.round(average * 2) / 2;

                console.log('Media voti:', this.averageVote);
            } else {
                console.log('Nessun voto disponibile.');
            }
        },
        // Metodo per arrotondare un numero alla metà più vicina
        roundToHalf(num) {
            return Math.round(num * 2) / 2;
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
        },
        clearMessages() {
            this.errorMessage = '';
            this.successMessage = '';
        }
    },
    created() {
        this.fetchUserData();
    }
};
</script>


<template>
    <div>
      <!-- Immagine e informazioni sul musicista -->
      <div
        v-if="singleMusician && singleMusician.user_details"
        class="container-fluid user-img d-flex justify-content-center flex-column mb-5 bounce-in"
        :style="{
          'background-image': 'url(http://127.0.0.1:8000/storage/' + singleMusician.user_details.picture + ')'
        }"
      >
        <!-- Nome e città -->
        <h1 class="text-white ms-5 bounce-in">{{ singleMusician.name }}</h1>
        <h2 class="text-white ms-5 bounce-in">{{ singleMusician.city }}</h2>
      </div>
      <!-- Altre informazioni sul musicista -->
      <div class="container mb-5">
        <div class="row justify-content-between ">
            <div class="col-6">
                <h2 class="fw-bold pt-3 mb-4">Bio</h2>
                <p v-if="singleMusician && singleMusician.user_details">{{ singleMusician.user_details.bio }}</p>
            </div>
            <div class="col-4 text-end">
                <h2 class="fw-bold pt-3 mb-4 ">Competenze</h2>
                <div>
                    <span v-if="singleMusician && singleMusician.roles" v-for="(role, i) in singleMusician.roles" :key="i" class="bounce-in">
                        <img :src="'http://127.0.0.1:8000/storage/' + role.icon" alt="roleInstrument" class="instrument-pic">
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
        <!-- Sezione per le recensioni -->
        <div class="d-flex justify-content-between" v-if="singleMusician && singleMusician.reviews">
                            <h2 class="mb-5 fw-bold">Le mie recensioni</h2>
                            <div>
                                <div class="vote-rating">
                                    <!-- Visualizza le palline riempite in base alla media dei voti -->
                                    <span
                                        v-for="index in 5"
                                        :key="index"
                                        :class="{
                                        'filled': index <= averageVote,
                                        'half-filled': index === Math.ceil(averageVote) && averageVote % 1 !== 0
                                        }"
                                        class="vote-star"
                                        @click="setVote(index)"
                                    >
                                        ★
                                    </span>
                                </div>
                            </div>
                        </div>
        <section v-if="singleMusician && singleMusician.reviews" class="full-page-section mb-5">
            
            <div class="container">
                <div class="row">
                    <div class="col-md-12 p-0">
                        
                        <div class="reviews-container">
                            
                            <div class="reviews-wrapper">
                                <!-- Recensioni -->
                                <div v-for="(review, index) in singleMusician.reviews" :key="index" class="review-item" style="background-color: #2E333A;">
                                    <div class="review-content">
                                        <!-- Nome e descrizione della recensione -->
                                        <h4 class="review-title" style="color: white;">{{ review.firstname + ' ' + review.lastname }}</h4>
                                        <p class="review-description" style="color: white;">{{ review.description }}</p>
                                    </div>
                                    <!-- Voto della recensione -->
                                    <!-- <div class="stars-container">
                                        <span v-if="singleMusician.votes[index]?.vote" v-for="i in parseInt(singleMusician.votes[index]?.vote)" class="star-reviews"></span>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Messaggi di errore/successo -->
        <div v-if="errorMessage || successMessage" class="message-container">
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
                <button @click="clearMessages" class="btn-close">&times;</button>
            </div>
            <div v-if="successMessage" class="alert alert-success" role="alert">
                {{ successMessage }}
                <button @click="clearMessages" class="btn-close">&times;</button>
            </div>
        </div>
            <!-- Form per scrivere una recensione -->
            <section v-if="showReviewForm" id="sectionReviews" class="contact-section" style="background-color: white;">
                <div class="container-fluid border">
                    <h2 class="text-black text-center py-5">Scrivi una recensione</h2>
                    <form @submit.prevent="submitReview" class="contact-form">
                        <!-- Input per nome e cognome -->
                        <div class="mb-3">
                            <label for="firstname" class="form-label text-black">Nome*</label>
                            <input type="text" v-model="reviewForm.firstname" class="form-control" id="firstname" placeholder="Inserisci il tuo nome..." required maxlength="74">
                        </div>
                        <div class="mb-3">
                            <label for="lastname" class="form-label text-black">Cognome*</label>
                            <input type="text" v-model="reviewForm.lastname" class="form-control" id="lastname" placeholder="Inserisci il tuo cognome..." required maxlength="74">
                        </div>
                        <!-- Input per recensione -->
                        <div class="mb-3">
                            <label for="description" class="form-label text-black">Recensione</label>
                            <textarea v-model="reviewForm.description" class="form-control" id="description" rows="5" maxlength="2048" placeholder="Inserisci la tua recensione..."></textarea>
                        </div>
                        <!-- Input per voto -->
                        <div class="mb-3">
                            <label class="form-label text-black">Voto</label>
                            <input type="number" name="vote" v-model="voteForm.vote" id="" min="1" max="5">
                        </div>
                        <div class="text-center py-5">
                            <button type="submit" class="btn button-send-review btn-lg">Invia Recensione</button>
                            <button type="button" @click="closeReviewForm" class="btn button-send-review btn-lg">Annulla</button>
                        </div>
                    </form>
                </div>
            </section>
            <!-- Pulsante per scrivere una recensione -->
            <div class="d-flex justify-content-center">
            <button @click="toggleReviewForm" v-if="!showReviewForm" class="btn-write-review">Scrivi una recensione</button>
            </div>
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

.message-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000; /* Assicurati che il messaggio sia in primo piano */
    text-align: center;
}

.btn-close {
    position: absolute;
    top: 0;
    right: 0;
    background: black;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    line-height: 1.2rem;
}

.vote-rating {
  display: flex;
}

.vote-star {
  font-size: 24px;
  cursor: pointer;
}

.filled {
  color: gold;
}

.half-filled {
  position: relative;
}

.half-filled::before {
  content: '★';
  position: absolute;
  color: gold;
  overflow: hidden;
  width: 50%;
  white-space: nowrap;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.bounce-in {
  animation: bounceIn 1.5s ease forwards;
}


</style>