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
    <div class="homepage-main container-fluid ">
        
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

    

    <div class="scroll-watcher"></div>

</template>

<style lang="scss" scoped>

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

.homepage-main {
    border: 1px solid black;
    height: 300px;
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