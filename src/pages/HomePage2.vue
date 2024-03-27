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

