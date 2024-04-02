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
    
    <header class="px-5 py-4">
        <div class="container-fluid p-0 d-flex justify-content-between">
            
                <router-link :to="{ name: 'homme' }" class="logo-container"></router-link>
            
            <div class="d-flex">

                <router-link :to="{ name: 'instrumental' }" class="header-link">Strumenti</router-link>
                <router-link :to="{ name: 'sponsor' }" class="header-link">Sponsor</router-link>
                <router-link :to="{ name: 'login' }" class="header-link">Accedi</router-link>
                <router-link :to="{ name: 'registration' }" class="header-link">Registrati</router-link>
                <router-link :to="{ name: 'search' }" class="header-link">Cerca</router-link>


            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header{
    background-color: #21252B;
    .logo-container{
        width: 100%;
        background-image: url('../../public/Img/LogoBMusic.png');
        background-size: contain;
        background-repeat: no-repeat;
        
    }
    .header-link{
        color: #BADFDA;
        text-decoration: none;
        padding: 10px 20px;
        margin: 0 10px;
        border-radius: 20px;
        &:hover{
            background-color: white;
            color: black;
        }
    }
}

/* #BADFDA */
</style>
