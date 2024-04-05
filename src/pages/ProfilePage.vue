<script>
import axios from 'axios';

export default {
  data() {
    return {
        apiUrl: 'http://127.0.0.1:8000/api/',
        singleMusician: [],
        demoPath: '',
        contactForm: {
            firstname: '',
            lastname: '',
            email: '',
            message: '',
            user_id: '',
        },
        reviewForm:{
            firstname: '',
            lastname: '',
            description: '',
            user_id: '',
        },
        voteForm: {
            user_id: '',
            vote: ''
        },
        isSubmitting: false // Variabile per tenere traccia dello stato di invio del form
    };
},
methods: {
    sendMessage() {
        this.isSubmitting = true; // Imposta lo stato di invio del form su true
        axios.post(`${this.apiUrl}messages`, this.contactForm)
            .then(response => {
                console.log('Messaggio inviato con successo:', response.data);
                this.resetForm();
                alert('Messaggio inviato con successo');
            })
            .catch(error => {
                console.error('Errore durante l\'invio del messaggio:', error);
                alert('Errore invio messaggio');
            })
            .finally(() => {
                this.isSubmitting = false; // Ripristina lo stato di invio del form
            });
    },
    submitReview() {
        if (this.reviewForm.description && this.reviewForm.firstname && this.reviewForm.lastname) {
            this.isSubmitting = true; // Imposta lo stato di invio del form su true
            axios.post(`${this.apiUrl}reviews`, this.reviewForm)
            .then(response => {
                console.log('Recensione inviata con successo:', response.data);
                this.resetReviewForm();
                alert('Recensione inviata con successo');
                this.submitVote()
            })
            .catch(error => {
                console.error('Errore durante l\'invio della recensione:', error);
                alert('Errore durante l\'invio della recensione');
            })
            .finally(() => {
                this.isSubmitting = false; // Ripristina lo stato di invio del form
            });
        }
    },
    submitVote() {
        this.isSubmitting = true; // Imposta lo stato di invio del form su true
        axios.post(`${this.apiUrl}votes`, this.voteForm)
            .then(response => {
                console.log('Voto inviato con successo:', response.data);
                // Aggiungi qui eventuali azioni dopo aver inviato il voto
            })
            .catch(error => {
                console.error('Errore durante l\'invio del voto:', error);
                // Aggiungi qui eventuali azioni in caso di errore nell'invio del voto
            })
            .finally(() => {
                this.isSubmitting = false; // Ripristina lo stato di invio del form
            });
    },
    resetForm() {
        this.contactForm.firstname = '';
        this.contactForm.lastname = '';
        this.contactForm.email = '';
        this.contactForm.message = '';
    },
    resetReviewForm() {
        this.reviewForm.firstname = '';
        this.reviewForm.lastname = '';
        this.reviewForm.description = '';
    }
},
created() {
    axios.get(`${this.apiUrl}users/${this.$route.params.name}`)
    .then(response => {
        console.log(response.data.result);
        this.singleMusician = response.data.result;
        console.log(this.singleMusician);
        this.demoPath = `http://127.0.0.1:8000/storage${this.singleMusician.user_details.demo}`;
        console.log(this.demoPath);
        this.contactForm.user_id = this.singleMusician.id;
        this.reviewForm.user_id = this.singleMusician.id;
        this.voteForm.user_id = this.singleMusician.id; // Imposta l'ID dell'utente per il voto
    })
    .catch(error => {
        console.error('Errore durante la chiamata API:', error);
    });
}
};
</script>

<template>
    <div v-if="singleMusician.user_details" class="container-fluid user-img d-flex justify-content-center flex-column ps-5 mb-5"
        :style="{ 'background-image': 'url(http://127.0.0.1:8000/storage/' + singleMusician.user_details.picture + ')' }">
        <h1 class="text-white ms-5">{{ singleMusician.name }}</h1>
        <h2 class="text-white ms-5">{{ singleMusician.city }}</h2>
    </div>
    <div class="container-fluid px-5 mb-5">
        <div class="row justify-content-between px-5">
            <div class="col-6">
                <h2 class="fw-bold pt-3 mb-4">Bio</h2>
                <p v-if="singleMusician.user_details">{{ singleMusician.user_details.bio }}</p>
            </div>
            <div class="col-4 text-end">
                <h2 class="fw-bold pt-3 mb-4 ">Competenze</h2>
                <div class="">
                    <span v-for="(role, i) in singleMusician.roles" :key="i">
                    <img :src="'http://127.0.0.1:8000/storage/' + role.icon" alt="roleInstrument" class="instrument-pic px-4">
                    </span>
                </div>
            </div>
            <div class="col-12">
                <h2 class="fw-bold pt-3 mb-4">Demo</h2>
                <audio v-if="singleMusician.user_details" controls class="w-100 px-5">
                    <source :src="demoPath" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-12">
                <h2 class="fw-bold pt-3 mb-4">Info di contatto</h2>
            <div v-if="singleMusician.user_details">
                <i class="fa-solid fa-phone me-3"></i>
                Mail: {{ singleMusician.email }}
            </div>
            <div v-if="singleMusician.user_details">
                <i class="fa-solid fa-envelope me-3"></i>
                Cell: {{ singleMusician.user_details.cellphone }}
            </div>
            </div>
        </div>
        <div class="container">
            <div class="row py-5 my-5 justify-content-center">
                <div class="col-4">
                    <div class="card px-2" style="width: 18rem;">
                        <div class="card-body">
                            <h4 class="card-title py-4">Federico Benevento</h4>
                            <p class="card-text pe-4">
                            Questo concerto ha creato delle atmosfere magiche che mi hanno rapito fin dal primo momento. Il perfomer ha saputo coinvolgere il pubblico con la sua presenza carismatica e le sue performance straordinarie. La musica ha trasportato tutti in un viaggio emotivo che non dimenticherò facilmente.
                            </p>
                            <div>STELLE</div>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card px-2" style="width: 18rem;">
                        <div class="card-body">
                            <h4 class="card-title py-4">Federico Benevento</h4>
                            <p class="card-text pe-4">
                            Questo concerto ha creato delle atmosfere magiche che mi hanno rapito fin dal primo momento. Il perfomer ha saputo coinvolgere il pubblico con la sua presenza carismatica e le sue performance straordinarie. La musica ha trasportato tutti in un viaggio emotivo che non dimenticherò facilmente.
                            </p>
                            <div>STELLE</div>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card px-2" style="width: 18rem;">
                        <div class="card-body">
                            <h4 class="card-title py-4">Federico Benevento</h4>
                            <p class="card-text pe-4">
                            Questo concerto ha creato delle atmosfere magiche che mi hanno rapito fin dal primo momento. Il perfomer ha saputo coinvolgere il pubblico con la sua presenza carismatica e le sue performance straordinarie. La musica ha trasportato tutti in un viaggio emotivo che non dimenticherò facilmente.
                            </p>
                            <div>STELLE</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <a href="#" class="button-review">Lascia una recensione</a>
            </div>
        </div>
    </div>
    <div>
      <!-- Form per inserire una recensione e un voto -->
    <form @submit.prevent="submitReview(), submitVote" class="review-form">
        <input type="text" v-model="reviewForm.firstname" id="firstname" name="firstname" placeholder="Inserisci il tuo nome">
        <input type="text" v-model="reviewForm.lastname" id="lastname" name="lastname" placeholder="Inserisci il tuo cognome">
        <input type="text" v-model="reviewForm.description" id="description" name="description" placeholder="Inserisci la tua recensione">
        <input type="number" v-model="voteForm.vote" name="vote" placeholder="Vote" class="form-input" min="1" max="5">
        <button type="submit" class="form-button">Invia Recensione e Voto</button>
    </form>
    </div>
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
                <button type="submit" class="btn px-5 my-button btn-lg">Invia</button>
            </div>
            </form>
        </div>
    </section>
  </template>

<style lang="scss" scoped>

.card{
    background-color: #21252B;
    color: white;
    border-radius: 20px;
    margin: 0 auto;
}

.button-review{
    text-decoration: none;
    color: white;
    background-color: #21252B;
    padding: 15px 6rem;
    border-radius: 20px;
    font-size: 1.5em;

}
.user-img{
    min-height: 500px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    
}

.instrument-pic{
    max-width: 100px;
}

.contact-section{
    background-color: #21252B;

    h2{
        font-size: 3rem;
        font-weight: bold;
    }
    .my-button{
        background-color: white;
        border-radius: 30px;
        color: #21252B;
        font-weight: bold;
    }
}

.review-form,
.vote-form {
    margin-bottom: 20px;
}

button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}
.bounce-in {
    animation: bounceIn 0.5s ease forwards;
    opacity: 0;
    transform: translateY(-30px);
}

@keyframes bounceIn {
    0% {
        opacity: 0;
        transform: translateY(50px);
    }
    50% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 1;
    }
}
</style>