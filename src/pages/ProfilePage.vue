<!-- PAGINA PRINCIPALE DOVE ANDRANNO INSERITI TUTTI I COMPONENTI  -->

<script>

import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

export default {
    data() {
        return {
            apiUrl: 'http://127.0.0.1:8000/api/users/',
            singleMusician: [],
            demoPath: '',
            showModal: false,
            contactForm: {
                firstName: '',
                lastName: '',
                message: ''
            }
        };
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Pagination],
        };
    },
    methods: {
        openModal() {
            console.log(this.showModal)
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
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
    },
    created() {
        axios.get(`${this.apiUrl}${this.$route.params.name}`) // URL DELL'API
            .then((response) => {
                console.log(response.data.result);
                this.singleMusician = response.data.result;
                console.log(this.singleMusician)
                this.demoPath = 'http://127.0.0.1:8000/storage' + this.singleMusician.user_details.demo
                console.log(this.demoPath)
            })
            .catch(error => {
            console.error('Errore durante la chiamata API:', error);
        });
    },
}


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
                <p v-if="singleMusician.user_details" >{{ singleMusician.user_details.bio }}</p>
            </div>
            <div class="col-4 text-end">
                <h2 class="fw-bold pt-3 mb-4 ">Competenze</h2>
                <div class="">
                    <span v-for="(role, i) in singleMusician.roles" :key="i">
                        
                        <img :src='"http://127.0.0.1:8000/storage/" + role.icon' alt="roleInstrument" class="instrument-pic px-4">
                        <!-- <span v-if="i !== singleMusician.roles.length - 1">, </span> -->
                    </span>
                </div>
            </div>
            <div class="col-12">
                <h2 class="fw-bold pt-3 mb-4">Demo</h2>
                <audio v-if="singleMusician.user_details" controls class="w-100 px-5">
                    <source :src="this.demoPath" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-12">
                <h2 class="fw-bold pt-3 mb-4">Info di contatto</h2>
                <div v-if="singleMusician.user_details" >
                    <i class="fa-solid fa-phone me-3"></i>
                    Mail: {{ singleMusician.user_details.cellphone }}
                </div>
                <div>
                    <i class="fa-solid fa-envelope me-3"></i>
                    Cell: {{ singleMusician.email }}
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
                                Questo concerto ha creato delle
                                atmosfere magiche che mi hanno rapito
                                fin dal primo momento.
                                Il perfomer ha saputo coinvolgere il
                                pubblico con la sua presenza
                                carismatica e le sue performance
                                straordinarie. La musica ha trasportato
                                tutti in un viaggio
                                emotivo che non dimenticherò
                                facilmente.
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
                                Questo concerto ha creato delle
                                atmosfere magiche che mi hanno rapito
                                fin dal primo momento.
                                Il perfomer ha saputo coinvolgere il
                                pubblico con la sua presenza
                                carismatica e le sue performance
                                straordinarie. La musica ha trasportato
                                tutti in un viaggio
                                emotivo che non dimenticherò
                                facilmente.
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
                                Questo concerto ha creato delle
                                atmosfere magiche che mi hanno rapito
                                fin dal primo momento.
                                Il perfomer ha saputo coinvolgere il
                                pubblico con la sua presenza
                                carismatica e le sue performance
                                straordinarie. La musica ha trasportato
                                tutti in un viaggio
                                emotivo che non dimenticherò
                                facilmente.
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
        <div class="row pt-5">
            <div class="col-2 offset-10 text-end pe-5">
                <router-link :to="{ name: 'contact' }" class="header-link"><i class="fa-solid fa-comments fa-2xl"></i></router-link>
            </div>
        </div>
    </div>
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
</style>