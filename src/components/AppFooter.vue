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
    

    <!-- --------------------------------- -->

    <footer class="my-blue-bg pt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-12 py-lg-5 py-md-5 py-sm-3 text-center">
                    <!-- Logo -->
                    <div class="w-100">
                        <img src="../../public/Img/LogoBMusic.png" alt="" class="w-25">
                    </div>
                    <div class="p-sm-1 p-md-3">
                        <p class="my-cyan">
                            Seguici su
                        </p>
                    </div>
                    <ul class="list-unstyled d-flex justify-content-center mb-4">
                        <li class="px-2">
                            <a href="#nogo"><i class="fa-brands fa-facebook-f my-cyan fs-4 "></i></a>
                        </li>
                        <li class="px-2">
                            <a href="#nogo"><i class="fa-brands fa-instagram my-cyan fs-4"></i></a>
                        </li>
                        <li class="px-2">
                            <a href="#nogo"><i class="fa-brands fa-twitter my-cyan fs-4"></i></a>
                        </li>
                        <li class="px-2">
                            <a href="#nogo"><i class="fa-brands fa-youtube my-cyan fs-4"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-12 col-md-4 container-right d-flex justify-content-center py-lg-5 py-md-5 py-sm-3 "  v-for="footerLink in footerLinks" :key="footerLink.category">
                            <!-- Link Footer -->
                            <div class="w-100 text-center mb-4">
                                <h5 class="color" >{{ footerLink.category }}</h5>
                                <ul>
                                    <li v-for="link in footerLink.links" :key="link" class="p-0 mb-3">{{ link }}</li>
                                </ul>
                            </div>                    
                        </div>
                    </div>
                </div>

                <div class="col-12 mt-5">
                    <!-- Text Footer -->
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

.container-img {
    height: 75px;
    width: 150px;
}

.container-img > img {
    width: 100%;
}

//Social Icon
ul li a {
    margin-bottom: 10px;
    color: #BADFDA;
}

ul li a i {
    font-size: 2rem;
}

.social-item {
    padding: 0 5px;
}
//Link Footer
ul {
    margin: 0;
    padding: 0;
}
ul li {
    list-style: none;
    color: #BADFDA;
    margin-top: 10px;
}

//Text Style
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

// Footer
footer{
    background-color: #21252B;
}
.my-cyan{
    color: #BADFDA
}
ul{
    list-style-type: none;
}

.footer-claim{
    color: grey;
    font-size: small;
}
.img-pic-not-found{
    // background-image: url('/storage/images/Not-Found.jpg');
    background-color: #d3d3d3;
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 50%;
    background-position: center;
    background-size: 100%;
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
