<!-- PAGINA PRINCIPALE DOVE ANDRANNO INSERITI TUTTI I COMPONENTI  -->

<script>
import axios from 'axios';

export default {
    data() {
        return {
        allMusicians: [],
        allRoles: [],
        selectedRole: null,
        loading: false
        };
    },
    computed: {
        filteredMusicians() {
        if (this.selectedRole) {
            return this.allMusicians.filter(musician => musician.roles.some(role => role.id === this.selectedRole));
        } else {
            return [];
        }
        }
    },
    methods: {
        async searchByRole() {
        if (this.selectedRole) {
            this.loading = true;
            try {
            const response = await axios.get('http://127.0.0.1:8000/api/users', {
                params: {
                role: this.selectedRole
                }
            });
            this.allMusicians = response.data.results.data;
            } catch (error) {
            console.error('Errore durante la chiamata API:', error);
            } finally {
            this.loading = false;
            }
        }
        },
        async getRoles() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/roles');
            this.allRoles = response.data.results;
        } catch (error) {
            console.error('Errore durante la chiamata API:', error);
        }
        },
        getProfilePicture(musician) {
        return musician.user_details && musician.user_details.picture ? 'http://127.0.0.1:8000/storage/' + musician.user_details.picture : '';
        },
        async loadMusicians() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users');
            this.allMusicians = response.data.results.data;
        } catch (error) {
            console.error('Errore durante il caricamento dei musicisti:', error);
        }
        }
    },
    created() {
        this.getRoles();
        this.loadMusicians(); // Chiamata per caricare i musicisti all'avvio del componente
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
        <div class="container-lg container-fluid p-5">
            <h3 class="display-4 fw-bold mb-2">Come funziona?</h3>
            <div class="row py-5 justify-content-between">
                <div class="col-lg-7 col-xxl-7 col-auto<">
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
                        <a href="http://127.0.0.1:8000/login" class="btn-login">Accedi</a>
                        <a href="http://127.0.0.1:8000/register" class="btn-register">Registrati</a>
                    </div>
                </div>
                <div class="col-lg-5 col-xxl-5 col-auto how-section-img">
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
                <!-- <div class="carousel-item active">
                    
                    <div class="row px-5 py-3 carousel-text">
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
                </div> -->
                <div class="carousel-item"
                        v-for="(singleMusician, index) in allMusicians" 
                        :key="singleMusician.id" 
                        :style="{ 'background-image': 'url(http://127.0.0.1:8000/storage/' + singleMusician.user_details.picture + ')' }"
                        :class="!index ? 'active' : ''">
                    <div class="row px-5 py-3 justify-content-between">
                        <div class="col-9">
                            <div class="text-white px-3 w-75">
                                <h3 class="mb-4">{{ singleMusician.name }}</h3>
                                <div class="d-flex">
                                    <h6 v-for="(userRole, i) in singleMusician.roles">
                                        {{ userRole.title }}  
                                    </h6>
                                    
                                </div>
                                <p>
                                    {{ singleMusician.user_details.bio }}
                                </p>
                            </div>
                        </div>
                        <div class="col-3 d-flex align-items-center justify-content-end">
                            <!-- <a href="#" class="">Visualizza Profilo</a> -->
                            <router-link :to="{ name: 'profile', params: { name: singleMusician.name} }" class="show-profile-btn">Vedi Profilo</router-link>
                        </div>
                    </div>
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
    <section class="third-section py-5 fade-in">
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
                    <router-link :to="{ name: 'search' }" class="btn btn-dark text-white fw-bold rounded-5 px-4 py-2">Cerca artisti o band</router-link>
                </div>
            </div>
        </div>
    </section>
    <div class="container-fluid">
        <h2 class="p-5 fw-bold">Trova artisti o band per ruolo</h2>
        <!-- Form per la ricerca per ruolo -->
        <form @submit.prevent="searchByRole">
            <div class="mb-5">
                <!-- Dropdown per selezionare il ruolo -->
                <select v-model="selectedRole" class="form-select w-50">
                    <option disabled value="">Seleziona un ruolo</option>
                    <option v-for="role in allRoles" :key="role.id" :value="role.id">{{ role.title }}</option>
                </select>
            </div>
        </form>
        <!-- Risultati della ricerca -->
        <div v-if="!loading" class="container-fluid">
            <h2 class="p-5 fw-bold">Risultati della ricerca</h2>
        <div class="row g-3">
            <div class="col-3" v-for="musician in filteredMusicians" :key="musician.id">
                <div class="card">
                    <!-- Immagine del musicista -->
                    <img :src="getProfilePicture(musician)" class="card-img-top" :alt="'Immagine di ' + musician.name">
                    <div class="card-body">
                    <!-- Nome del musicista -->
                    <h5 class="card-title">{{ musician.name }}</h5>
                    <!-- Città del musicista -->
                    <p class="card-text">{{ musician.city }}</p>
                    <!-- Link al profilo del musicista -->
                    <router-link :to="{ name: 'profile', params: { name: musician.name } }" class="btn btn-primary btn-sm">Vedi Profilo</router-link>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <!-- Messaggio di caricamento -->
        <div v-if="loading" class="loading-overlay">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Caricamento...</span>
            </div>
            <p>Caricamento in corso...</p>
        </div>
    </div>
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
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    z-index: 0;
    .row{
        position: absolute;
        bottom: 0;
        z-index: 10;
        
        .show-profile-btn{
            text-decoration: none;
            font-weight: bold;
            color: black;
            background-color: white;
            padding: 10px 20px;
            border-radius: 20px;
        }
    }
}
.carousel-text{
            background-color: rgba(0, 0, 0, 0.2);
        }

.carousel-control-prev, .carousel-control-next {
    position: absolute;
    top: 50%;
    bottom: 50%;
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

body {
    margin: 0;
    overflow: hidden;
    background-color: #000;
  }
  .star {
    position: absolute;
    width: 2px;
    height: 2px;
    background-color: #fff;
    animation: falling 5s linear infinite;
  }
  @keyframes falling {
    0% {
      transform: translateY(-10%);
    }
    100% {
      transform: translateY(100vh);
    }
  }
  .loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7); /* Trasparenza per un aspetto sfumato */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Assicura che l'overlay di caricamento sia in primo piano */
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

p {
  margin-top: 10px;
  font-size: 1rem;
}

.card-img-top {
  max-height: 200px;
}

</style>

