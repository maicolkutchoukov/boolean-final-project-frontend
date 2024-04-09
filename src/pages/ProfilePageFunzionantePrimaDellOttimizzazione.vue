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
                vote: null
            },
            isSubmitting: false,
            reviewErrorMessage: '', // Nuova variabile per i messaggi di errore del form di recensione
            contactErrorMessage: '', // Nuova variabile per i messaggi di errore del form di contatto
            showReviewFormError: false, // Variabile per mostrare gli errori nel form di recensione
            showContactFormError: false, // Variabile per mostrare gli errori nel form di contatto
            ratings: [], // Dichiarazione della proprietà ratings
            successMessage: '',
            showError: '',
            showReviewForm: false,
            activeStar: null,
            averageVote: 0,
            isHovered: false,
            numericVote: null, // Aggiungi questa variabile per memorizzare il voto numerico
            selectedStars: 0 // Aggiungi questa proprietà per tracciare il numero di stelle selezionate
            
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
            try {
                this.contactErrorMessage = ''; // Resetta eventuali messaggi di errore precedenti
                this.successMessage = ''; // Resetta eventuali messaggi di successo precedenti
                this.showError = true; // Mostra gli errori dopo il tentativo di invio

            // Validazione dei campi
            if (!this.contactForm.firstname.trim()) {
                throw new Error('Inserisci il nome.');
            }
            if (!this.contactForm.lastname.trim()) {
                throw new Error('Inserisci il cognome.');
            }
            if (!this.contactForm.email.trim()) {
                throw new Error('Inserisci l\'email.');
            }
            if (!this.contactForm.message.trim()) {
                throw new Error('Inserisci il messaggio.');
            }

            // Invia il messaggio
            await axios.post(`${this.apiUrl}messages`, this.contactForm);
                this.successMessage = 'Messaggio inviato con successo';
                this.resetForm();
            } catch (error) {
                // Gestisci gli errori del form di contatto
                this.contactErrorMessage = error.message;
                console.error('Errore durante l\'invio del messaggio:', error);
            } finally {
                // Nasconde il messaggio di errore dopo 3 secondi
                setTimeout(() => {
                    this.contactErrorMessage = '';
                }, 3000);
            }
        },
        async submitReview() {
            try {
                this.reviewErrorMessage = ''; // Resetta eventuali messaggi di errore precedenti
                this.successMessage = ''; // Resetta eventuali messaggi di successo precedenti

                // Invia la recensione con il voto solo se numericVote non è null
                if (this.numericVote !== null) {
                this.reviewForm.vote = this.numericVote; // Converte il voto numerico in una stringa
                }

                // Verifica se si sta inviando solo il voto
                const isVoteOnly = this.voteForm.vote && !this.reviewForm.description && !this.reviewForm.firstname && !this.reviewForm.lastname;

                // Validazione dei campi se si sta inviando una recensione
                if (!isVoteOnly && this.reviewForm.description.trim()) {
                if (!this.reviewForm.firstname.trim()) {
                    throw new Error('Inserisci il nome.');
                }
                if (!this.reviewForm.lastname.trim()) {
                    throw new Error('Inserisci il cognome.');
                }
                if (!this.reviewForm.description.trim()) {
                    throw new Error('Inserisci la recensione.');
                }
                }

                // Invia la recensione solo se non si sta inviando solo il voto
                if (!isVoteOnly) {
                // Invia la recensione
                this.reviewForm.user_id = this.singleMusician.id;
                await axios.post(`${this.apiUrl}reviews`, this.reviewForm);
                this.successMessage = 'Recensione inviata con successo';
                this.resetReviewForm();
                }

                // Invia il voto, se presente
                if (this.voteForm.vote) {
                await this.submitVote();
                }
            } catch (error) {
                // Gestisci gli errori del form di recensione
                if (error.message === 'Inserisci il nome.' || error.message === 'Inserisci il cognome.' || error.message === 'Inserisci la recensione.') {
                this.reviewErrorMessage = error.message;
                } else {
                this.reviewErrorMessage = 'Errore durante l\'invio della recensione, inserisci i campi mancanti';
                }
                console.error('Errore durante l\'invio della recensione:', error);
            } finally {
                // Rimuove i messaggi dopo 1 secondo
                setTimeout(() => {
                this.reviewErrorMessage = '';
                this.successMessage = '';
                }, 1000);
            }
        },
        /* async submitVote() {
            try {
                this.contactErrorMessage = ''; // Resetta eventuali messaggi di errore precedenti
                this.successMessage = ''; // Resetta eventuali messaggi di successo precedenti

                if (!this.voteForm.vote) {
                throw new Error('Seleziona un voto prima di inviare.');
                }

                // Imposta l'id dell'utente nel voto
                this.voteForm.user_id = this.singleMusician.id;
                this.voteForm.vote = this.selectedStars;
                const response = await axios.post(`${this.apiUrl}votes`, this.voteForm);
                console.log('Voto inviato con successo:', response.data);

                // Aggiungi un messaggio di successo per il voto
                this.successMessage += 'Voto inviato con successo. ';
            } catch (error) {
                this.contactErrorMessage = error.message || 'Errore durante l\'invio del voto.';
                console.error('Errore durante l\'invio del voto:', error);
            } finally {
                // Reimposta il form del voto
                this.voteForm.vote = null;
            }
        }, */
        async submitVote() {
            try {
                this.contactErrorMessage = ''; // Resetta eventuali messaggi di errore precedenti
                this.successMessage = ''; // Resetta eventuali messaggi di successo precedenti

                if (!this.voteForm.vote) {
                    throw new Error('Seleziona un voto prima di inviare.');
                }

                // Imposta l'id dell'utente nel voto
                this.voteForm.user_id = this.singleMusician.id;
                const response = await axios.post(`${this.apiUrl}votes`, this.voteForm);
                console.log('Voto inviato con successo:', response.data);

                // Aggiungi un messaggio di successo per il voto
                this.successMessage += 'Voto inviato con successo. ';
            } catch (error) {
                this.contactErrorMessage = error.message || 'Errore durante l\'invio del voto.';
                console.error('Errore durante l\'invio del voto:', error);
            } finally {
                // Reimposta il form del voto
                this.voteForm.vote = null;
            }
        },
        // Metodo per ripristinare il form della recensione
        resetReviewForm() {
            this.reviewForm = {
                firstname: '',
                lastname: '',
                description: '',
                user_id: this.singleMusician.id
            };
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
        
        toggleReviewForm() {
            this.showReviewForm = !this.showReviewForm;
        },
        closeReviewForm() {
            this.showReviewForm = false;
        },
        setVote(star) {
            this.selectedStars = star; // Imposta la stella attiva al passaggio del mouse
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
        :style="{ 'background-image': 'url(http://127.0.0.1:8000/storage/' + singleMusician.user_details.picture + ')' }"
      >
        <!-- Nome e città -->
        <h1 class="text-white ms-5">{{ singleMusician.name }}</h1>
        <h2 class="text-white ms-5">{{ singleMusician.city }}</h2>
      </div>
      <!-- Altre informazioni sul musicista -->
      <div class="container mb-5">
        <div class="row justify-content-between">
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
            <audio v-if="singleMusician && singleMusician.user_details" controls class="w-100">
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
        <div v-if="singleMusician && singleMusician.reviews" class="d-flex justify-content-between mb-5">
          <h2 class="mb-5 fw-bold">Le mie recensioni</h2>
          <div>
            <div class="vote-rating">
              <!-- Visualizza le palline riempite in base alla media dei voti -->
              <span
                v-for="index in 5"
                :key="index"
                :class="{
                  'filled': index <= averageVote,
                  'half-filled': index === Math.ceil(averageVote) && averageVote % 1 !== 0,
                  'bounce-in': isHovered
                }"
                class="vote-star"
                
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Messaggi di errore/successo -->
        <div v-if="reviewErrorMessage || successMessage" class="message-container" :class="{ active: reviewErrorMessage || successMessage }">
            <div v-if="reviewErrorMessage" class="alert alert-danger" role="alert">
                {{ reviewErrorMessage }}
                <button @click="clearMessages" class="btn-close">&times;</button>
            </div>
            <div v-if="successMessage" class="alert alert-success" role="alert">
                {{ successMessage }}
                <button @click="clearMessages" class="btn-close">&times;</button>
            </div>
            </div>

            <div v-if="contactErrorMessage || successMessage" class="message-container" :class="{ active: contactErrorMessage || successMessage }">
            <div v-if="contactErrorMessage" class="alert alert-danger" role="alert">
                {{ contactErrorMessage }}
                <button @click="clearMessages" class="btn-close">&times;</button>
            </div>
            <div v-if="successMessage" class="alert alert-success" role="alert">
                {{ successMessage }}
                <button @click="clearMessages" class="btn-close">&times;</button>
            </div>
        </div>

        <section v-if="showReviewForm" id="sectionReviews" class="contact-section" style="background-color: white;">
            <div class="container-fluid border">
                <h2 class="text-black text-center py-5">Scrivi una recensione</h2>
                <form @submit.prevent="submitReview" class="contact-form">
                    <!-- Input per nome -->
                    <div class="mb-3">
                        <label for="review-firstname" class="form-label text-black">Nome</label>
                        <input type="text" v-model="reviewForm.firstname" class="form-control" :class="{ 'is-invalid': showReviewFormError && !reviewForm.firstname && reviewForm.description && !voteForm.vote }" id="review-firstname" placeholder="Inserisci il tuo nome..." maxlength="74">
                        <div class="invalid-feedback">Il nome è richiesto.</div>
                    </div>
                    <!-- Input per cognome -->
                    <div class="mb-3">
                        <label for="review-lastname" class="form-label text-black">Cognome</label>
                        <input type="text" v-model="reviewForm.lastname" class="form-control" :class="{ 'is-invalid': showReviewFormError && !reviewForm.lastname && reviewForm.description && !voteForm.vote }" id="review-lastname" placeholder="Inserisci il tuo cognome..." maxlength="74">
                        <div class="invalid-feedback">Il cognome è richiesto.</div>
                    </div>
                    <!-- Input per recensione -->
                    <div class="mb-3">
                        <label for="description" class="form-label text-black">Recensione</label>
                        <textarea v-model="reviewForm.description" class="form-control" id="description" rows="5" maxlength="2048" placeholder="Inserisci la tua recensione..."></textarea>
                    </div>
                    <!-- Input per voto -->
                    <!-- <div class="mb-3">
                        <label for="vote" class="form-label text-black">Voto</label>
                        <div class="star-rating">
                            <span v-for="index in 5" :key="index" @click="setVote(index)">
                                <i v-if="index <= selectedStars" class="fas fa-star" style="color: yellow;"></i>
                                <i v-else class="far fa-star" style="color: grey;"></i>
                            </span>
                        </div>
                    </div> -->
                    <input type="number" name="vote" v-model="voteForm.vote" id="" min="1" max="5">
                    <div class="text-center py-5">
                        <button type="submit" class="btn my-button btn-lg">Invia Recensione</button>
                    </div>
                    <div class="text-center">
                        <button type="button" @click="closeReviewForm" class="btn btn-secondary">Chiudi</button>
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
            <form @submit.prevent="sendMessage" novalidate>
                <!-- Input per nome -->
                <div class="mb-3">
                    <label for="firstname" class="form-label text-white">Nome*</label>
                    <input type="text" v-model="contactForm.firstname" class="form-control" :class="{ 'is-invalid': showContactFormError && !contactForm.firstname }" id="firstname" placeholder="Inserisci il tuo nome..." required maxlength="74" aria-describedby="firstname-error">
                    <div id="firstname-error" class="invalid-feedback">Il nome è richiesto.</div>
                </div>
                <!-- Input per cognome -->
                <div class="mb-3">
                    <label for="lastname" class="form-label text-white">Cognome*</label>
                    <input type="text" v-model="contactForm.lastname" class="form-control" :class="{ 'is-invalid': showContactFormError && !contactForm.lastname }" id="lastname" placeholder="Inserisci il tuo cognome..." required maxlength="74" aria-describedby="lastname-error">
                    <div id="lastname-error" class="invalid-feedback">Il cognome è richiesto.</div>
                </div>
                <!-- Input per email -->
                <div class="mb-3">
                    <label for="email" class="form-label text-white">Email*</label>
                    <input type="email" v-model="contactForm.email" class="form-control" :class="{ 'is-invalid': showContactFormError && !contactForm.email }" id="email" placeholder="Inserisci la tua mail..." required maxlength="255" aria-describedby="email-error">
                    <div id="email-error" class="invalid-feedback">L'email è richiesta.</div>
                </div>
                <!-- Input per messaggio -->
                <div class="mb-3">
                    <label for="message" class="form-label text-white">Messaggio*</label>
                    <textarea v-model="contactForm.message" class="form-control" :class="{ 'is-invalid': showContactFormError && !contactForm.message }" id="message" rows="5" required maxlength="2048" placeholder="Lascia un messaggio che verrà visualizzato dall'artista..." aria-describedby="message-error"></textarea>
                    <div id="message-error" class="invalid-feedback">Il messaggio è richiesto.</div>
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
    width: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; /* Assicurati che il messaggio sia in primo piano */
  text-align: center;
}
.alert{
    padding: 50px 0;
    font-size: 2rem;
    font-weight: bold;
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

@keyframes bounceInDown {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animazione per far scomparire il messaggio di successo */
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* Applica l'animazione di bounceInDown al messaggio di successo quando appare */
.message-container .alert-success {
  animation: bounceInDown 0.75s ease forwards;
}

/* Applica la transizione al messaggio di successo per farlo scomparire piano piano */
.message-container .alert-success.fade-out {
  animation: fadeOut 0.5s ease forwards;
}

/* Applica l'animazione di bounceInDown al messaggio quando appare */
.message-container .alert {
  animation: bounceInDown 0.75s ease forwards;
}

/* Applica la transizione al messaggio per farlo scomparire piano piano */
.message-container .alert.fade-out {
  animation: fadeOut 0.5s ease forwards;
}
</style>