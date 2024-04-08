<script>

import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import braintree from 'braintree-web';

export default {
    components: {
    Swiper,
    SwiperSlide,
    },
  data() {
    return {
        allMusicians: [],
        modules: [Autoplay, Pagination, Navigation],
    };
  },
  methods: {
    initializeBraintree() {
      braintree.client.create({
        authorization: '8gybb77vxwvtd4yc',
      }, (err, clientInstance) => {
        if (err) {
          console.error(err);
          return;
        }
        braintree.hostedFields.create({
          client: clientInstance,
          fields: {
            number: {
              selector: '#card-number',
              placeholder: 'Numero carta di credito',
            },
            cvv: {
              selector: '#cvv',
              placeholder: 'CVV',
            },
            expirationDate: {
              selector: '#expiration-date',
              placeholder: 'MM/YY',
            },
          },
        }, (err, hostedFieldsInstance) => {
          if (err) {
            console.error(err);
            return;
          }
          this.hostedFieldsInstance = hostedFieldsInstance;
        });
      });
    },
    submitPayment() {
      this.hostedFieldsInstance.tokenize((err, payload) => {
        if (err) {
          console.error(err);
          // Gestisci l'errore
        } else {
          // Invia payload.nonce al server per elaborare il pagamento
          console.log(payload.nonce);
          // Aggiungi qui la logica per inviare il nonce al tuo server e gestire la transazione
        }
      });
    }
  },
    created() {
        axios.get('http://127.0.0.1:8000/api/users') // URL DELL'API
            .then((response) => {
                console.log(response.data.results.data);
                this.allMusicians = response.data.results.data;
                console.log(this.allMusicians)
            })
            .catch(error => {
            console.error('Errore durante la chiamata API:', error);
            });
    },
    mounted() {
    this.initializeBraintree();
    
    }
}
</script>


<template>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    
    <div class="container">
        <div class="fw-bold fs-4 mb-4">
            Home / <span class="opacity-50">Profili sponsorizzati</span>
        </div>

        <p class="fw-bold fs-4">
            Accendendo al profilo, nell'apposita sezione sponsor, l'utente ha la possibilità si scegliere tre pacchetti promozionali:
        </p>

        <div class="row">
            <!--CARD1-->
            <div class="col-4">
                <div class="card">
                    <!--Card Top-->
                    <div class="card-top text-center mb-2">
                        <div class="icon">
                            <i class="bi bi-folder"></i>
                        </div>
                        <h5>SMALL</h5>
                        <h3>2.99€ / 24h </h3>
                    </div>
                    <!--Card bottom-->
                    <div class="card-bottom">
                        <ul>
                            <li class="mb-2">
                                Il tuo profilo appare in Homepage
                            </li>
                            
                            <li class="mb-2">
                                Nella pagina di ricerca, il profilo viene posizionato sempre prima di quello di un musicista non sponsorizzato che soddisfa le stesse caratteristiche di ricerca.
                            </li>
                            <li class="mb-2">
                                Terminato il periodo di sponsorizzazione, il profilo tornerà ad essere visualizzato normalmente.
                            </li>
                        </ul>
                    </div>
                </div>  
            </div>
            
            <!--CARD2-->
            <div class="col-4">
                <div class="card">
                    <div class="badge">
                        Most Popular
                    </div>
                    <!--Card Top-->
                    <div class="card-top text-center mb-2">
                        <div class="icon">
                        <i class="bi bi-gem"></i>
                    </div>
                        <h5>PREMIUM</h5>
                        <h3>9.99€ / 144h </h3>
                    </div>
                    <!--Card bottom-->
                    <div class="card-bottom">
                        <ul>
                            <li class="mb-2">
                                Il tuo profilo appare in Homepage
                            </li>
                            
                            <li class="mb-2">
                                Nella pagina di ricerca, il profilo viene posizionato sempre prima di quello di un musicista non sponsorizzato che soddisfa le stesse caratteristiche di ricerca.
                            </li>
                            <li class="mb-2">
                                Terminato il periodo di sponsorizzazione, il profilo tornerà ad essere visualizzato normalmente.
                            </li>
                        </ul>
                    </div>
                </div>  
            </div>

            <!--CARD3-->
            <div class="col-4">
                <div class="card">
                    <!--Card Top-->
                    <div class="card-top text-center mb-2">
                        <div class="icon">
                        <i class="bi bi-rocket-takeoff"></i>
                    </div>
                        <h5>STANDARD</h5>
                        <h3>5.99€ / 72h </h3>
                    </div>
                    <!--Card bottom-->
                    <div class="card-bottom">
                        <ul>
                            <li class="mb-2">
                                Il tuo profilo appare in Homepage
                            </li>
                            
                            <li class="mb-2">
                                Nella pagina di ricerca, il profilo viene posizionato sempre prima di quello di un musicista non sponsorizzato che soddisfa le stesse caratteristiche di ricerca.
                            </li>
                            <li class="mb-2">
                                Terminato il periodo di sponsorizzazione, il profilo tornerà ad essere visualizzato normalmente.
                            </li>
                        </ul>
                    </div>
                </div>  
            </div>

            <div class="text-center">
                <router-link :to="{ name: 'login' }" class="btn my-4 fw-bold">ACCEDI O REGISTRATI</router-link>
            </div>
        </div>

        <!--SWIPER-->
        <!--
            Da valutare se mantere lo swiper in pagina, perchè i profili
            sponsorizzati verranno riportati già in una sezione apposita in home
        -->
        <!-- <div class="container">
            <h4 class="fw-bold fs-4">PROFILI SPONSORIZZATI</h4>

            <swiper
            :spaceBetween="30"
            :centeredSlides="true"
            :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
            }"
            :pagination="{
            clickable: true,
            }"
            :navigation="false"
            :modules="modules"
            class="mySwiper">

            <swiper-slide
                v-for="(singleMusician, index) in allMusicians" 
                :key="singleMusician.id" 
                :style="
                { 'background-image': 'url(http://127.0.0.1:8000/storage/' + singleMusician.user_details.picture + ')',
                'background-size': 'cover',
                'background-position': 'center', 
                }"
                :class="!index ? 'active' : ''">
            </swiper-slide>
                
            </swiper>

        </div> -->
    </div>
    <div>
        <div>
    <form id="payment-form">
      <div id="card-number">
        <input type="text" id="card-number-input" placeholder="Numero carta di credito">
      </div>
      <div id="cvv">
        <input type="text" id="cvv-input" placeholder="CVV">
      </div>
      <div id="expiration-date">
        <input type="text" id="expiration-date-input" placeholder="MM/YY">
      </div>
      <button type="submit" @click.prevent="submitPayment">Paga</button>
    </form>
  </div>
  </div>
    <!--<div class="scroll-watcher"></div>-->

</template>

<style lang="scss" scoped>

.sponsor-user {
    min-height: 100px;
    min-width: 100px;
    border: 1px dashed black;
}

.user-icon {
    text-align: center;
    border: 1px solid red;
    height: 75px;
    width: 75px;
    border-radius: 10px;
}

.card {
    border: 5px solid #BADFDA;
    border-radius: 20px;
    background-color: #21252B;
    color: #BADFDA
}

.bi-folder, .bi-gem, .bi-rocket-takeoff {
    font-size: 50px;
    color: #BADFDA;
}

.btn {
    background-color: #BADFDA;
    color: #21252B
}

.badge {
    position: absolute;
    top: 10px;
    left: 0;
    border-radius: 0 20px 20px 0;
    padding: 5px;
    background-color: #BADFDA;
    color: #21252B
}

.mySwiper {
    height: 500px;
}




</style>