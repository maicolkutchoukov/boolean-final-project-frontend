<!-- PAGINA PRINCIPALE DOVE ANDRANNO INSERITI TUTTI I COMPONENTI  -->

<script>
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

export default {
    data() {
        return {
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
    <!-- Jumbotron SECTION -->
    <div class="container-fluid jumbotron p-0">
        <h1 class="py-5 mb-3 display-4 fw-bold text-white px-5">Trova musicisti, <br> gruppi, Dj e band per il<br> tuo evento</h1>
    </div>

    <!-- How To Do Section -->
    <section class="how-section">
        <div class="container-fluid p-5">
            <h3 class="display-4 fw-bold mb-2">Come funziona?</h3>
            <div class="row py-5 justify-content-between">
                <div class="col-7">
                    <p class="mb-1">
                        Benvenuti su BMusic, il palcoscenico digitale dove il talento musicale si incontra con le opportunità. 
                        Qui, ci impegniamo a promuovere e mettere in mostra musicisti e band di ogni genere e provenienza, 
                        offrendo loro la visibilità e le risorse necessarie per essere scoperti da potenziali fan, 
                        collaboratori e addetti ai lavori.
                    </p>
                    <p>
                        Che tu sia un musicista emergente desideroso di farsi strada nell'industria musicale o un appassionato 
                        alla ricerca di nuove melodie da scoprire, BMusic è il luogo ideale dove esplorare, 
                        connettersi e dare vita alla tua passione per la musica!
                    </p>
                    <p class="mb-5">
                        Attraverso la nostra piattaforma intuitiva e ricca di funzionalità, puoi esplorare un vasto panorama di talenti provenienti da ogni angolo del globo, 
                        ascoltare le loro tracce, leggere le loro esperienze e persino contattarli direttamente per opportunità di collaborazione o assunzione. <br>
                        Unisciti a noi su <strong>BMusic</strong> e immergiti in un mondo di musica senza confini, dove ogni nota racconta una storia e ogni artista ha la possibilità di brillare.
                    </p>
                    <div class="buttons-controller">
                        <a href="" class="btn-login">Accedi</a>
                        <a href="" class="btn-register">Registrati</a>
                    </div>
                </div>
                <div class="col-5 how-section-img">
                    <div class="img-container">
                        <!-- <img src="../../public/Img/BandArrotondata.png" alt="" class="img-fluid"> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="carousel-section">
        <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <!-- <img src="../../public/Img/Musician-1.jpg" class="d-block w-100 img-fluid" alt="img-1"> -->
                    <div class="row px-5 py-3">
                        <div class="col-6">
                            <div class="text-white">
                                <h3 class="mb-4">Nathan Drake</h3>
                                <h6>Solista, Chitarrista, Cantante</h6>
                                <p>
                                    Ciao, sono Nathan Drake, un cantante dallo spirito avventuroso.
                                    La mia musica è come una ricerca del tesoro, piena di emozioni e avventure che portano 
                                    l'ascoltatore in luoghi lontani e inesplorati.
                                </p>
                            </div>
                        </div>
                        <div class="col-6 d-flex align-items-center justify-content-end">
                            <a href="#" class="">Visualizza Profilo</a>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <!-- <img src="../../public/Img/Musician-2.jpg" class="d-block w-100 img-fluid" alt="img-2"> -->
                </div>
                <div class="carousel-item">
                    <!-- <img src="../../public/Img/Musician-3.jpg" class="d-block w-100 img-fluid" alt="img-3"> -->
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>
    </section>
    <section class="third-section py-5">
        <div class="container-fluid ">
            <div class="row">
                <div class="col-4">
                    
                </div>
                <div class="col-8 px-5">
                    <h2 class="mb-5 fw-bold fs-1">Mettiamoci all'opera!</h2>
                    <p class="mb-5">
                        Scopri il prossimo grande talento musicale su BMusic! 
                        Esplora una vasta gamma di musicisti e band da tutto il mondo, 
                        pronti a stupirti con le loro melodie uniche e le loro performance coinvolgenti. 
                        Che tu sia alla ricerca di nuove sonorità per arricchire la tua playlist personale 
                        o desideri collaborare con artisti emergenti per progetti creativi, su BMusic troverai 
                        una fonte inesauribile di ispirazione. Scegli tra una varietà di generi musicali e 
                        lasciati trasportare dalle emozioni e dall'energia di talenti freschi e innovativi. 
                        Entra nel mondo della musica di BMusic oggi stesso e preparati a scoprire il prossimo grande successo!
                    </p>
                    <a href="" class="btn btn-dark text-white fw-bold rounded-5 px-4 py-2">Cerca artisti o band</a>
                </div>
            </div>
        </div>
    </section>
    <div class="scroll-watcher"></div>
</template>

<style lang="scss" scoped>

.jumbotron{
    min-height: 500px;
    background-image: url("../../public/Img/Hero.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

.how-section{
    .btn-login{
        text-decoration: none;
        color: black;
        background-color: white;
        border: 1px solid black;
        padding: 10px 30px;
        margin-right: 20px;
        border-radius: 20px;
        font-weight: bold;
    }
    .btn-register{
        text-decoration: none;
        color: white;
        background-color: black;
        padding: 10px 30px;
        border-radius: 20px;
        font-weight: bold;
    }
    .how-section-img{
            background-image: url('../../public/Img/BandArrotondata.png');
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        
        
    }
}

.carousel-item{
    height: 500px;
    width: 100%;
    background-image: url('../../public/Img/Musician-1.jpg');
    background-color: darkblue;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    z-index: 0;
    .row{
        position: absolute;
        bottom: 0;
        z-index: 10;
        a{
        text-decoration: none;
        font-weight: bold;
        color: black;
        background-color: white;
        padding: 10px 20px;
        border-radius: 20px;
    }
    }
}

.third-section{
    .col-4{
        background-image: url('../../public/Img/VynilEditCrop.png');
        background-position: left;
        background-size: contain;
        background-repeat: no-repeat;
    }
}

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

</style>

