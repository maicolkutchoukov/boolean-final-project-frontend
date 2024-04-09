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
    <header>
       <div id="container-header" class="container-fluid">
            <div class="row h-100">

                <!--Logo-->
                <div class="col-4 d-flex align-items-center">
                    <div class="container-logo">
                        <router-link :to="{ name: 'homme' }">
                            <img src="../../public/Img/LogoBMusic.png" class="h-100"t="LogoBMusic">
                        </router-link>
                        
                    </div>                    
                </div>

                <!--Link-->
                <div class="col-8 d-flex align-items-center justify-content-end">
                    <div class="container-link">
                        <nav>
                            <ul class="d-flex">
                                <li>
                                    <router-link :to="{ name: 'instrumental' }" class="header-link">Strumenti</router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'sponsor' }" class="header-link">Sponsor</router-link>
                                </li>
                                <li>
                                    <a href="http://127.0.0.1:8000/login" class="header-link">Accedi</a>
                                </li>
                                
                                <li>
                                    <a href="http://127.0.0.1:8000/register" class="header-link">Registrati</a>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'search' }" class="header-link-special">Cerca</router-link>
                                </li> 
                            </ul>
                        </nav>

                        <!-- Default dropstart button -->
                        <div class="btn-group dropdown">
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Menu
                            </button>
                            <ul class="dropdown-menu">
                                <li class="dropdown-menu-link">
                                    <router-link :to="{ name: 'instrumental' }" class="link-style">Strumenti</router-link>
                                </li>
                                <li class="dropdown-menu-link">
                                    <router-link :to="{ name: 'sponsor' }" class="link-style">Sponsor</router-link>
                                </li>
                                <li class="dropdown-menu-link">
                                    <a href="http://127.0.0.1:8000/login" class="link-style">Accedi</a>
                                </li>
                                
                                <li class="dropdown-menu-link">
                                    <a href="http://127.0.0.1:8000/register" class="link-style">Registrati</a>
                                </li>
                                <li class="dropdown-menu-link">
                                    <router-link :to="{ name: 'search' }" class="link-style">Cerca</router-link>
                                </li> 
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
       </div>
    </header>
</template>

<style lang="scss" scoped>

#container-header {
    height: 120px;
    background-color: #21252B;
}

.container-logo {
    height: 70px;
}

.container-logo > img {
    height: 100%;
}

nav ul li {
    list-style: none;
}

.header-link {
    font-style: none;
    text-decoration: none;
    color: #BADFDA;
    border-radius: 20px;
    padding: 10px 20px;
    margin-left: 5px;
    &:hover{
            background-color: white;
            color: black;
        }
}

.header-link-special{
    font-style: none;
    text-decoration: none;
    color: black;
    background-color: #BADFDA;
    border-radius: 10px;
    padding: 10px 20px;
    &:hover{
            background-color: black;
            color: #BADFDA;
        }
}

// Drop-Down
.btn-group {
    display: none;
}

.dropdown-menu {
    background-color: #21252B;
    border: 2px solid #BADFDA;
}

.link-style {
    font-style: none;
    text-decoration: none;
    margin: 10px 0;
    color: white;
    
}

.dropdown-menu-link{
    color: #21252B;
    text-align: center;
    &:hover{
            background-color: #BADFDA;
        }
}

// Media Query

@media only screen and (max-width: 425px) {
    #container-header {
    width: 100%;
}
    .header-link, .header-link-special  {
        display: none;
    }
    .container-logo {
    height: 50px;
    }

    .container-logo > img {
        height: 100%;
    }
    .btn-group {
    display: block;
}
}
</style>
