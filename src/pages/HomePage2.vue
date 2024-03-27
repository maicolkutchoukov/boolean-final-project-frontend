<!-- PAGINA PRINCIPALE DOVE ANDRANNO INSERITI TUTTI I COMPONENTI  -->

<script>

export default {
    
    setup() {
        
    },

    data() {
        return {
            
        }
    },
};
</script>

<template>
       <!-- HomePage-Top -->
    <div class="homepage-top d-flex">
      
        <div class="homepage-left">
            <router-link :to="{ name: 'home' }" class="px-3">Cerchi musicisti?</router-link>
        </div>
        
        <div class="homepage-left">
            <router-link :to="{ name: 'home2' }" class="px-3">Sei un musicista?</router-link>
        </div>
    </div>

  <!-- HomePage-Buttom -->
    <div class="section-1 container-fluid px-5 mb-5 bg-body-secondary">
        
        <!-- Section-1 -->
        <h1 class="py-5 mb-3 display-2 fw-bold">
            Entra a far parte <br> di BMusic
        </h1>
        <router-link :to="{ name: 'login' }" class="px-3 btn btn-success me-3">Accedi/Registrati</router-link>
        <a href="#how-work-section" class="btn btn-warning">Come funziona</a>
    </div>
    <!--
        <div class="scroll-watcher"></div>
    -->
    <section class="container text-center mb-5">
        <div class="row mb-3">
            <div class="col-4 border">Musicisti iscritti</div>
            <div class="col-4 border">Richieste per concerti</div>
            <div class="col-4 border">Recensioni clienti</div>
        </div>
        <p class="fs-4">BMusic è il punto di riferimento per chi cerca musicisti per un matrimonio, una festa, un concerto, un locale o un altro tipo di evento</p>
    </section>
    <section id="how-work-section" class="container text-center mb-5">
        <div>
            <h5 class="mb-4">COME FUNZIONA</h5>
            <h2 class="mb-5">Trovare <span>ingaggi</span> non è mai stato così semplice</h2>
            <div class="row justify-content-center border">
                <div class="col-6 border d-flex">
                    <div class="img-container w-25">
                        <img src="" alt="IMG">
                    </div>
                    <div class="text-container text-start w-75">
                        <p>STEP 1</p>
                        <p>Iscriviti alla piattaforma</p>
                    </div>
                </div>
                <div class="col-6 border d-flex">
                    <div class="img-container w-25">
                        <img src="" alt="IMG">
                    </div>
                    <div class="text-container text-start w-75">
                        <p>STEP 2</p>
                        <p>Crea le pagine dei tuoi progetti musicali e personalizzale con foto e video.a</p>
                    </div>
                </div>
                <div class="col-6 d-flex">
                    <div class="img-container w-25">
                        <img src="" alt="IMG">
                    </div>
                    <div class="text-container text-start w-75">
                        <p>STEP 3</p>
                        <!-- da inserire link per le sponsorizzazioni -->
                        <p>Scegli l'abbonamento che preferisci, tra la versione gratis e quella a pagamento.</p>
                    </div>
                </div>
                <div class="col-6 d-flex">
                    <div class="img-container w-25">
                        <img src="" alt="IMG">
                    </div>
                    <div class="text-container text-start w-75">
                        <p>STEP 4</p>
                        <p>Ricevi messaggi da chi è interessato e comunica direttamente con lui.</p>
                    </div>
                </div>
            </div>
        </div>
        <router-link :to="{ name: 'login' }" class="btn btn-success my-4">Iscriviti Subito</router-link>
        
    </section>

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

