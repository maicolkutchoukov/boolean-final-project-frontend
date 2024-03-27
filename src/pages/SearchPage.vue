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
    CIAO SONO LA PAGINA DI RICERCA
    <div class="scroll-watcher"></div>

</template>

<style lang="scss" scoped>

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