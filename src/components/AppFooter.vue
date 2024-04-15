<script>
export default {
    data() {
        return {
            footerLinks: [
                {
                    category: 'Community',
                    links: ['Blog', 'Community', 'Ideas']
                },
                {
                    category: 'Company',
                    links: ['About us', 'Team', 'Affiliati', 'Contatti', 'Jobs']
                },
                {
                    category: 'Link Utili',
                    links: ['Garanzia', 'Dichiarazione', 'Privacy Policy', 'Cookie Policy', 'Cookie']
                }
            ]
        };
    },
    methods: {

    }
}

</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <footer>
        <div class="footer-container container-fluid pt-5">
            <div class="row mx-2 mx-sm-5">
                <!-- Container-left -->
                <div class="col-md-6 container-left">
                    <div id="container-social" class="container d-flex flex-column justify-content-center">
                        <div class="container-img">
                            <img src="../../public/Img/LogoBMusic.png" alt="">
                        </div>
                       
                        <div class="social-text">
                            <div class="color text">seguici su</div>
                            <nav>
                                <ul class="social-list d-flex">
                                    <li class="social-item">
                                        <a href="#">
                                            <i class="fa-brands fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li class="social-item">
                                        <a href="#">
                                            <i class="fa-brands fa-instagram"></i>
                                        </a>
                                    </li>
                                    <li class="social-item">
                                        <a href="#">
                                            <i class="fa-brands fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li class="social-item">
                                        <a href="#">
                                            <i class="fa-brands fa-youtube"></i>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                <!-- Container-right -->
                <div class="col-md-6 container-right d-flex flex-row-reverse">
                    <div class="px-3" v-for="footerLink in footerLinks" :key="footerLink.category">
                        <h5 class="color" >{{ footerLink.category }}</h5>
                        <ul>
                            <li v-for="link in footerLink.links" :key="link">{{ link }}</li>
                        </ul>
                    </div>                    
                </div>

                <div class="col-ms-12 mt-5">
                    <p class="text-center color-grey">
                        BMusic asserts its exclusive rights over all content featured on this website. Unauthorized use, reproduction, distribution, display, or transmission of any content is strictly prohibited without prior authorization from \BMusic. All rights reserved
                    </p>
                </div>
            </div>

        </div>

    </footer>
</template>

<style lang="scss" scoped>

.footer-container {
    background-color: #21252B;
    min-height: 300px;
    width: 100%;
    color: white;
}

.container-top {
    height: 200px;
}

ul {
    margin: 0;
    padding: 0;
}
ul li {
    list-style: none;
    color: #BADFDA;
    margin-top: 10px;
}

.container-img {
    height: 75px;
    width: 150px;
}

.container-img > img {
    width: 100%;
}

.social-item {
    padding: 0 5px;
}

ul li a {
    margin-bottom: 10px;
    color: #BADFDA;
}

ul li a i {
    font-size: 2rem;
}

.text {
    margin-left: 45px;
    margin-bottom: 10px;
    text-align: left;
}

.color {
    color: #BADFDA;  
}

.color-grey {
    color: gray;  
}

@media only screen and (max-width: 425px) {
    .footer-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 100vh;
    }

    .container-right {
        margin-top: 20px;
    }

    .container-left,
    .container-right {
        width: 100%;
    }

    #container-social {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
}
</style>
