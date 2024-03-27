<!-- PAGINA PRINCIPALE DOVE ANDRANNO INSERITI TUTTI I COMPONENTI  -->

<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/pagination';

  // import required modules
  import { Pagination } from 'swiper/modules';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Pagination],
      };
    },
  };
</script>

<template>

    <div class="text-center display-6 mt-5 fw-bold">
            HOME PAGE
    </div>

    <!-- HomePage-Top -->
    <div class="homepage-top container-fluid d-flex">
      
        <div class="homepage-right">
            Cerchi Musicisti?
        </div>

        <div class="homepage-left">
            Sei un musicista?
        </div>
    </div>

    <!-- HomePage-Buttom -->
    <div class="section-1 container-fluid ">
        
        <!-- Section-1 -->
        <h2 class="mt-3 mb-3">SCEGLI IL TUO ARTISTA</h2>
        
       <form class="d-flex justify-content-center">
            <div class="me-2">
                <input class="form-control form-control-lg" type="text" placeholder="Inserisci il nome">
            </div>
            <div class="me-2">
                <input class="form-control form-control-lg" type="text" placeholder="Inserisci la città">
            </div>

            <div class="">
                <button type="submit" class="btn btn-primary">Cerca</button>
            </div>
        </form>
    </div>

    <!-- Section-2 -->
    <div class="section-2 container-fluid">
        <div class="text-center mt-3">
            <h3>COME FUNZIONA?</h3>

            <p>Cercare musicisti non è mai stato così semplice</p>
        </div>
       

        <div class="row d-flex justify-content-around">
            
                <!-- Single Card -->
                <div class="col-4 g-2">
                    <div class="container-card d-flex align-items-center">
                        <div class="container-img">
                            IMG
                        </div>
                        <div class="container-text text-center">
                            <div>
                                Passo 1
                            </div>
                    
                            <div class="m-2">
                                Filtra le ricerche per trovare l'artista
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Single Card -->
                <div class="col-4 g-2">
                    <div class="container-card d-flex align-items-center">
                        <div class="container-img">
                            IMG
                        </div>
                        <div class="container-text text-center">
                            <div>
                                Passo 2
                            </div>
                    
                            <div class="m-2">
                                Visualizza le recensioni dagli altri utenti
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Single Card -->
                <div class="col-4 g-2">
                    <div class="container-card d-flex align-items-center">
                        <div class="container-img">
                            IMG
                        </div>
                        <div class="container-text text-center">
                            <div>
                                Passo 3
                            </div>
                    
                            <div class="m-2">
                                Contatta i musicisti che desideri ingaggiare.
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-center mt-3">
                    <button type="submit" class="btn btn-primary">Cerca Musicisti</button>
                </div>
            </div>    
    </div>

    <!-- Carousel -->
    <div class="container-fluid">
        <swiper
        :slidesPerView="3"
        :spaceBetween="30"
        :pagination="{
        clickable: true,
        }"
        :modules="modules"
        class="mySwiper"
    >
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide><swiper-slide>Slide 3</swiper-slide>
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
    height: 300px;
}

/* section-2 */

.section-2 {
    border: 1px solid black;
    min-height: 400px;
}

.container-card {
    border: 1px solid red;
    height: 200px;
}

.container-img {
    height: 100%;
    width: 40%;
    border: 1px dashed black;
}

.container-text {
    height: 100%;
    width: 60%;
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

