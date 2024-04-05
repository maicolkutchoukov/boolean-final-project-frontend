<script>
export default {
    data() {
        return {
        };
     },
    methods: {

    }
}
</script>

<template>
    <div class="not-found-page">
        <div class="box-text">
            404 not-found
        </div>
        
    </div>
</template>

<style lang="scss" scoped>
div.not-found-page{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top:0;
    z-index: 99999;
    background-color: #21252B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 200px;
    color: #BADFDA;
}

.box-text {
   padding: 50px;
   border: 10px solid #BADFDA;
}
</style>