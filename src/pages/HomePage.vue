<!-- PAGINA PRINCIPALE DOVE ANDRANNO INSERITI TUTTI I COMPONENTI  -->

<script>
export default {
    data() {
        return {
        }
     },
}
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
       

        <div class="row">
            <div class="col-12 d-flex justify-content-around">
                <!-- Single Card -->
                <div class="col-3">
                    <div class="container-card d-flex align-items-center">
                        <div class="container-img">
                            IMG
                        </div>
                        <div class="container-text">
                            <div class="text-center">
                                Passo 1
                            </div>
                    
                            <div class="m-2">
                                Filtra le ricerche per trovare l'artista tra migliai di proposte
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Single Card -->
                <div class="col-3">
                    <div class="container-card d-flex align-items-center">
                        <div class="container-img">
                            IMG
                        </div>
                        <div>
                            <div class="text-center">
                                Passo 2
                            </div>
                    
                            <div class="m-2">
                                Visualizza le recensioni dagli altri utenti
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Single Card -->
                <div class="col-3">
                    <div class="container-card d-flex align-items-center">
                        <div class="container-img">
                            IMG
                        </div>
                        <div class="container-text">
                            <div class="text-center">
                                Passo 2
                            </div>
                    
                            <div class="m-2">
                                Contatta i musicisti che desideri ingaggiare. BMusic non prende commissioni.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center mt-3">
                <button type="submit" class="btn btn-primary">Cerca Musicisti</button>
            </div>
            
        </div>
    </div>
    

    <div class="scroll-watcher"></div>

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
    height: 300px;
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