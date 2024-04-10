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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <footer>
        <div class="footer-top">
            <div class="container-footer-top">
                <div class="container-footer-left">
                    <router-link :to="{ name: 'homme' }" class="logo-container"></router-link>
                    <nav class="footer-social">
                        <p class="social-text">
                            Seguici su
                        </p>
                        <ul class="social-list">
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
                <div class="container-footer-right">
                    <div class="footer-column">
                        <h4>Titolo</h4>
                        <h5>
                            <ul class="footer-list">
                                <li><a href="#">Link</a></li>
                                <br>
                                <li><a href="#">Link</a></li>
                                <br>
                                <li><a href="#">Link</a></li>
                                <br>
                                <li><a href="#">Link</a></li>
                                <br>
                                <li><a href="#">Link</a></li>
                            </ul>
                        </h5>
                    </div>
                    <div class="footer-column">
                        <h4>Titolo</h4>
                        <h5>
                            <ul class="footer-list">
                                <li><a href="#">Link</a></li>
                                <br>
                                <li><a href="#">Link</a></li>
                                <br>
                                <li><a href="#">Link</a></li>
                                <br>
                                <li><a href="#">Link</a></li>
                                <br>
                                <li><a href="#">Link</a></li>
                            </ul>
                        </h5>
                    </div>
                    <div class="footer-column display-none">
                        <h4>Titolo</h4>
                        <h5>
                            <ul class="footer-list">
                                <li><a href="#">Link</a></li>
                                <br>
                                <li><a href="#">Link</a></li>
                                <br>
                                <li><a href="#">Link</a></li>
                                <br>
                                <li><a href="#">Link</a></li>
                                <br>
                                <li><a href="#">Link</a></li>
                            </ul>
                        </h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>BMusic asserts its exclusive rights over all content featured on this website. Unauthorized use, reproduction, distribution, display, or transmission of any content is strictly prohibited without prior authorization from 
BMusic. All rights reserved</p>
        </div>
    </footer>
</template>

<style lang="scss" scoped>

.footer-top {
    background-color: #21252B;
    min-height: 300px;
    width: 100%;
}

.logo-container{
    width: 90%;
    display: flex;
    height: 6.3rem;
    background-image: url('/public/Img/LogoBMusic.png');
    background-size: contain;
    background-repeat: no-repeat;
}

.footer-top .container-footer-top {
    display: flex;
    padding: 50px 5.5rem 10px;
}

.container-footer-left {
    width: 50%;
    min-height: 200px;
}

.container-footer-left h2 {
    color:white;
    font-size: 2em;
    margin-bottom: 5rem;
}

.container-footer-left h3 {
    line-height: 2.3rem;
    font-size: 1.8rem;
    color: #fff;
    font-weight: 700;
    margin-bottom: 0.5rem;
    margin-top: 4.5rem;
}

.container-footer-right {
    width: 50%;
    display: flex;
    /*padding-top: 4rem;*/
}

.footer-column {
    flex-direction: column;
    width: calc(100% / 3);
    color: #BADFDA;
    font-size: larger;
    margin: 10px;
}

.footer-column h4 {
    font-size: 1.5rem;
    margin-left: 28px;
}

.footer-list > li {
    display: inline-block;
    padding: 5px 0;
}

.footer-list a {
    text-decoration: none;
    color: #BADFDA;
}

.social-text {
    font-size: 1.3rem;
    line-height: 2.4rem;
    margin-bottom: 0.5rem;
    margin-left: 15px;
}

.social-list {
    margin: 0;
    padding: 0;
}

.footer-social {
    margin-top: 7.5rem;
    color: #BADFDA;
    opacity: 0.4;
}

.footer-social ul li {
    display: inline-block;
}

.footer-social a {
    font-size: 25px;
    font-weight: bold;
    text-decoration: none;
    margin-right: 15px;
    color: #BADFDA;
}

.footer-bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #21252B;
    padding: 1.3rem 4.2rem;
}

.footer-bottom p {
    color: #BADFDA;
    margin-bottom: 0;
    text-align: center;
    opacity: 0.4;
}

@media (max-width: 425px) {
    .footer-top {
        display: flex;
        justify-content: center;
    }
    .container-footer-top {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .container-footer-right {
        display: flex;
        flex-direction: row; 
        justify-content: center;
        order: 1;
    }

    .footer-column {
        display: flex;
        justify-content: center;
        width: auto;
        margin: 10px 10px;
        h4 {
            margin: 0;
            margin-bottom: 10px;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin: 0;
            padding: 0;
        }
    }

    .container-footer-left {
        display: flex;
        flex-wrap: wrap; 
        justify-content: center;
        min-width: 100%;
        order: 2;
    }

    .footer-social {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 0;
    }

    .social-text {
        margin: 0;
        margin-top: 10px;
    }

    .logo-container {
        margin-top: 20px;
    }
}
</style>
