<script>
import axios from 'axios';

export default {
    data() {
        return {
            contactForm: {
                firstName: '',
                lastName: '',
                message: ''
            }
        };
    },
    methods: {
        sendMessage() {
            axios.post('http://127.0.0.1:8000/api/messages', this.contactForm)
                .then(response => {
                    console.log('Messaggio inviato con successo:', response.data);
                    this.resetForm();
                })
                .catch(error => {
                    console.error('Errore durante l\'invio del messaggio:', error);
                });
        },
        resetForm() {
            // Resettare i valori del form dopo l'invio del messaggio
            this.contactForm.firstName = '';
            this.contactForm.lastName = '';
            this.contactForm.message = '';
        }
    }
};
</script>

<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-lg-6">
                <div class="card shadow-lg p-4">
                    <h2 class="text-center mb-4">Contattare un musicista</h2>
                    <form @submit.prevent="sendMessage">
                        <div class="mb-3">
                            <label for="firstName" class="form-label">Nome</label>
                            <input type="text" v-model="contactForm.firstName" class="form-control" id="firstName" required>
                        </div>
                        <div class="mb-3">
                            <label for="lastName" class="form-label">Cognome</label>
                            <input type="text" v-model="contactForm.lastName" class="form-control" id="lastName" required>
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">Messaggio</label>
                            <textarea v-model="contactForm.message" class="form-control" id="message" rows="5" required></textarea>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-primary btn-lg">Invia Messaggio</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    border: none;
    border-radius: 15px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

.card h2 {
    color: #333;
}

.form-control {
    border-radius: 10px;
}

.btn-primary {
    background-color: #4CAF50;
    border: none;
    border-radius: 10px;
    padding: 10px 30px;
    cursor: pointer;
}

.btn-primary:hover {
    background-color: #45a049;
}
</style>