<!-- PAGINA PRINCIPALE DOVE ANDRANNO INSERITI TUTTI I COMPONENTI  -->

<script>
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
        modules: [Pagination, Navigation],
        };
    },

    data() {
        return {
            cardData: [
                    {
                        title: 'Passo 1',
                        text: 'Usufruisci dei nostri filtri per trovare migliai di artisti'
                    },
                    {
                        title: 'Passo 2',
                        text: 'Visualizza le recensioni dagli altri utenti'
                    },
                    {
                        title: 'Passo 3',
                        text: 'Contatta i musicisti che desideri ingaggiare.'
                    },
                ]
            }
        },
        mounted(){
        
            axios.get('http://127.0.0.1:8000/api/users') // URL DELL'API
            .then((response) => {
                console.log(response)
            })
        
    }
    
};
</script>

<template>

    <!-- HomePage-Top -->
<!--     <div class="homepage-top d-flex">
      
        <div class="homepage-right">
            Cerchi Musicisti?
        </div>

        <div class="homepage-left">
            <router-link :to="{ name: 'home2' }" class="px-3">Sei un musicista?</router-link>
        </div>
    </div> -->
    <div class="container-fluid jumbotron p-0">
        <!-- <img src="../../public/Img/Hero.jpg" alt="jumbotron" class="img-fluid"> -->
        <h1 class="py-5 mb-3 display-4 fw-bold text-white px-4">Trova musicisti, <br> gruppi, Dj e band per il<br> tuo evento</h1>
    </div>
    <!-- HomePage-Buttom -->
    <div class="section-1 container-fluid mb-5 px-5 bg-body-secondary">
        
        <!-- Section-1 -->
        <h1 class="py-5 mb-3 display-4 fw-bold">Trova musicisti, gruppi, <br> Dj e band per il tuo evento</h1>
        
        <form class="d-flex justify-content-center w-75 mx-auto">
            <div class="me-2">
                <input class="form-control form-control-lg" type="text" placeholder="Inserisci il nome">
            </div>
            <div class="me-2">
                <input class="form-control form-control-lg" type="text" placeholder="Inserisci la città">
            </div>

            <router-link :to="{ name: 'search' }" class="btn btn-success">Cerca musicisti</router-link>

        </form>
    </div>

    <!-- Section-2 -->
    <div class="section-2 container-fluid">
        <div class="text-center mt-3">
            <h3>COME FUNZIONA?</h3>

            <p>Cercare musicisti non è mai stato così semplice</p>
        </div>
       

        <div class="container">
            <div class="row">
            
            <!-- Single Card -->
                <div v-for="(card, i) in cardData" :key="i" class="col-4 g-2 ">
                    <div class="container-card d-flex">
                        <div class="container-img h-100">
                            IMG
                        </div>
                        <div class="container-text text-center d-flex align-items-center justify-content-center flex-column">
                            <div>
                                {{ card.title }}
                            </div>
                    
                            <div class="m-2">
                                {{ card.text }}
                            </div>
                        </div>
                    </div>
                </div>                                
            </div>
            <!-- Button Single Card -->
            <div class="d-flex justify-content-center">
                <div id="button-musicians" class="text-center mt-3 w-25">
                    <router-link :to="{ name: 'login' }" class="text-link px-3">Iscriviti subito</router-link>
                </div>
            </div>
                
        </div>
    </div>

    <!-- Carousel -->
    <div class="container-fluid mb-5">
        <swiper
        :slidesPerView="3"
        :spaceBetween="30"
        :loop="true"
        :pagination="{
        clickable: true,
        }"
        :modules="modules"
        class="mySwiper"
    >
        <swiper-slide><img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=1200&s=1" alt=""></swiper-slide>
        <swiper-slide><img src="https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp" alt=""></swiper-slide><swiper-slide><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgUbGn2rFhY73Z4jGq3NhcVynmqkXkVlN6qw&usqp=CAU" alt=""></swiper-slide>
        <swiper-slide>Slide 4</swiper-slide><swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide><swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide><swiper-slide>Slide 9</swiper-slide>
        </swiper>
    </div>
       
    <!--
        <div class="scroll-watcher"></div>
    -->

</template>

<style lang="scss" scoped>

.jumbotron{
    min-height: 500px;
    background-image: url("../../public/Img/Hero.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

/* GENERAL */

img {
    width: 100%;
}

/* HOMEPAGE-TOP */
.homepage-right {
    border: 1px dashed red;
    width: 50%;
    text-align: center;
}

.homepage-left {
    border: 1px dashed blue;
    width: 50%;
    text-align: center;
}

/* HOMEPAGE-BOTTOM */
/* section-1 */
.section-1 {
    border: 1px solid black;
    min-height: 200px;
}

#button-musicians {
    background-color: #0D6EFD;
    padding: 10px;
}

.text-link {
    color: white;
    text-decoration: none;
}

/* section-2 */
.section-2 {
    border: 1px solid black;
    min-height: 400px;
}

.container-card {
    border: 1px solid red;
    min-height: 200px;
}

.container-img {
    min-width: 40%;
    border: 1px dashed black;
}

.container-text {
    min-width:60%;
    border: 1px dashed black;
}

/* Swiper */
.mySwiper {
    height: 400px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}


/*
.scroll-watcher{
    height: 5px;
    position: fixed;
    top: 0;
    z-index: 9999;
    background-color: black;
    width: 100%;
    scale: 0 1;
    transform-origin: left;
    animation: scroll-watcher linear;
    animation-timeline: scroll(y);
}
@keyframes scroll-watcher{
    to { scale: 1 1;}
}
*/
</style>

