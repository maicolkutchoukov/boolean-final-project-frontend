<script>
import { ref, computed } from 'vue';
import axios from 'axios';
import { store } from '../store';

export default {
  data() {
    return {
      store,
      selectedRole: null,
      loading: false,
      modalVisible: false,
    };
  },
  computed: {
    filteredMusicians() {
      let filtered = store.allMusicians;

      if (this.selectedRole) {
        filtered = filtered.filter(musician => musician.roles.some(role => role.title === this.selectedRole));
      }
      store.filteredMusicians = filtered
      return filtered;
    }
  },
  methods: {
    async getMusicians() {
      this.loading = true;
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users');
        store.allMusicians = response.data.results.data;
      } catch (error) {
        console.error('Errore durante la chiamata API:', error);
      } finally {
        this.loading = false;
      }
    },
    async getRoles() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/roles');
        store.allRoles = response.data.results;
      } catch (error) {
        console.error('Errore durante la chiamata API:', error);
      }
    },
    async getSponsoredMusicians() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/sponsor');
        store.sponsoredMusicians = response.data.results;
      } catch (error) {
        console.error('Errore durante la chiamata API:', error);
      }
    },
    saveSelectedRoleHome() {
      if (this.selectedRole) {
        const selectedRoleId = store.allRoles.find(role => role.title === this.selectedRole)?.id;
        if (selectedRoleId) {
          store.selectedRoleHome = this.selectedRole;
          store.selectedRoleId = selectedRoleId; // Salva l'ID del ruolo selezionato
        } else {
          console.error('Errore: ID del ruolo selezionato non trovato');
        }
      } else {
        console.error('Errore: nessun ruolo selezionato');
      }
    },
    openModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
    redirectToSearchPage() {
      if (this.selectedRole) {
        const selectedRoleId = store.allRoles.find(role => role.title === this.selectedRole)?.id;
        if (selectedRoleId) {
          store.selectedRoleHome = this.selectedRole;
          store.selectedRoleId = selectedRoleId; // Salva l'ID del ruolo selezionato
          // Effettua il reindirizzamento alla pagina di ricerca passando il ruolo selezionato come parametro
          this.$router.push({ name: 'search', query: { role: this.selectedRole }});
        } else {
          console.error('Errore: ID del ruolo selezionato non trovato');
        }
      } else {
        console.error('Errore: nessun ruolo selezionato');
      }
    }
  },
  created() {
    this.getMusicians();
    this.getRoles();
    this.getSponsoredMusicians();
  },
  mounted() {
    window.scrollTo(0, 0); // Scorri verso l'alto quando il componente viene montato
  }
};
</script>


<template>
    <div class="">
        <!-- Jumbotron SECTION -->
        <div class="jumbotron p-0 d-flex align-items-center">
            <div class="container-sm">
                <h1 class="p-0 py-5 mb-3 display-4 fw-bold text-white">Trova musicisti, gruppi <br> e band per il tuo evento</h1>

            </div>
        </div>
        <!-- How To Do Section -->
        <section class="how-section container">
            <div class="py-5">
                <h3 class="display-4 fw-bold mb-2">Come funziona?</h3>
                <div class="row g-0 py-5 justify-content-between">
                    <div class="col-lg-7 col-xxl-7 col-auto">
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
                    <!-- Qui potrebbe andare un'immagine di rappresentazione -->
                    </div>
                </div>
            </div>
        </section>
        <section class="carousel-sectio mb-5">
            <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-ride="carousel"> 
                <div class="carousel-inner">
                    <!-- Carosello per gli utenti sponsorizzati -->
                    <div class="carousel-item position-relative"
                        v-for="(singleMusician, index) in store.sponsoredMusicians" 
                        :key="singleMusician.id" 
                        :style="{ 'background-image': 'url(http://127.0.0.1:8000/storage/' + singleMusician.user_details.picture + ')' }"
                        :class="!index ? 'active' : ''">
                        <div class="container-fluid position-absolute bottom-0 ">
                            <div class="row w-100 g-0 px-md-5 py-3 justify-content-between ">
                            <div class="col-9">
                                <div class="text-white px-3 w-75">
                                <h3 class="carousel-title ps-4 ps-md-0">{{ singleMusician.name }}</h3>
                                <div class="d-flex carousel-role">
                                    <h6 class="display-none" v-for="(userRole, i) in singleMusician.roles">
                                    {{ userRole.title }}<span v-if="i !== singleMusician.roles.length - 1">, </span>  
                                    </h6>
                                </div>
                                <p class="display-none" >
                                    {{ singleMusician.user_details.bio }}
                                </p>
                                </div>
                            </div>
                            <div class="col-3 d-flex align-items-center justify-content-end pe-5">
                                <router-link :to="{ name: 'profile', params: { name: singleMusician.name} }" class="show-profile btn d-md-none">Profilo</router-link>
                                <router-link :to="{ name: 'profile', params: { name: singleMusician.name} }" class="show-profile btn d-none d-md-block">Vedi Profilo</router-link>

                            </div>
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
        <section class="third-section py-5 fade-in mx-3 mx-md-0">
            <div class="container">
                <div class="row g-0 justify-content-end">
                
                    <div class="col-12 col-lg-9">
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
                        <button @click="openModal" class="button-show btn btn-dark text-white fw-bold rounded-5 px-4 py-2">Filtra per ruolo</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Modale ricerca per ruolo -->
        <section class="mt-5">
            <div class="modal" tabindex="-1" role="dialog" style="display: block;" v-if="modalVisible">
                <div class="modal-dialog" role="document">
                    <div class="modal-content position-relative">
                        <div class="modal-header text-center">
                            <h2 class="modal-title fw-bold ">Trova artisti o band per ruolo</h2>
                        </div>
                        <div class="modal-body">
                            <!-- Form per la ricerca per ruolo -->
                            <form @submit.prevent="searchByRole">
                                <div class="mb-3">
                                    <!-- Dropdown per selezionare il ruolo -->
                                    <select v-model="selectedRole" @change="searchByRole" class="form-select">
                                        <option disabled value="">Seleziona un ruolo</option>
                                        <option v-for="role in store.allRoles" :key="role.id" :value="role.title">{{ role.title }}</option>
                                    </select>
                                </div>
                            </form>
                            <!-- Lista dei musicisti filtrati -->
                            <div v-if="filteredMusicians.length > 0">
                                <div class="row g-0">
                                    <div class="col-6" 
                                            v-for="(musician, index) in filteredMusicians"
                                            :key="index">
                                        <div v-if="index < 4" class="card" :style="{ 'background-image': 'url(http://127.0.0.1:8000/storage/' + musician.user_details.picture + ')' }">
                                            <!-- Contenuto della card -->
                                            <div class="card-body">
                                                <div class="card-top">
                                                    <h5 class="card-title">{{ musician.name }}</h5>
                                                    <p class="card-text">{{ musician.city }}</p>
                                                </div>
                                                <div class="card-button">
                                                    <router-link :to="{ name: 'profile', params: { name: musician.name } }" class="btn btn-dark btn-sm">Vedi Profilo</router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                Nessun musicista trovato.
                            </div>
                            <!-- <button @click="advancedSearch" class="btn btn-dark text-white fw-bold rounded-5 px-4 py-2">Ricerca Avanzata</button> -->
                            <router-link :to="{ name: 'search' }" class="btn btn-dark btn-sm py-3 px-5 rounded-5 mt-3" @click="saveSelectedRoleHome">Ricerca Avanzata</router-link>
                            <button @click="closeModal()" class="btn btn-close-modal"> <i class="fa-solid fa-xmark fa-beat-fade fa-2xl"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

  
</template>
<style lang="scss" scoped>

@import '../assets/scss/partials/HomePage.scss';




/* ----------------------------------- */
.show-profile {
    font-weight: bolder;
    text-decoration: none;
    color:#424649;
    background-color: white;
    padding: 10px 15px;
    border-radius: 20px;
    &:hover {
    background-color: #21252b;
    color: white;
  }
}

.carousel-title {
    padding-bottom: 20px;
}

.carousel-role {
    h6{
        margin-bottom: 0;
    }  
}
@media (max-width: 425px) {
  h1 {
    text-align: center;
  }
  .display-none{
    display: none;
  }
  .how-section {
    .buttons-controller {
        display: flex;
        justify-content: center;
    }
  }
  .third-section {
    .row {
    justify-content: center;
    .col-8 {
        width: 100%;
    }
    .col-4{
        display: none;
    }
  }
}
}

@media (max-width: 768px) {
    .third-section{
        background-image: none !important;
    }
  .display-none{
    display: none;
  }
  .how-section {
    
    .buttons-controller {
        display: flex;
        justify-content: center;
    }
  }

  .third-section {
    .row {
      display: flex;
      justify-content: center;
      .col-8 {
          width: 100%;
      }
    }
  }
  .carousel-item {
   .row{
      width: 100%;
      margin-bottom: 20px;
   }
   .carousel-title {
      padding-bottom: 0px;
    }
    h3 {
      margin-top: 10px;
      margin-bottom: 0;
    } 
}
}
.btn-close-modal {
    position: absolute;
    top: -120px;
    right: 10px;
}

</style>