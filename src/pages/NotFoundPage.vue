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
        404 not-found
    </div>
</template>

<style lang="scss" scoped>
div.not-found-page{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top:0;
    z-index: 99999;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 200px;
    color: red;
}
</style>