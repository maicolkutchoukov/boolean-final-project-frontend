<script>
export default {
    data() {
        return {

        };
    },
    methods: {

    }
}

document.addEventListener("DOMContentLoaded", function() {
    var myButton = document.getElementById("myButton");
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var modalMessage = document.getElementById("modal-message");

    myButton.addEventListener("click", function() {
        modal.style.display = "block";
        
    });

    span.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});

</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <footer>
        <div class="footer-top">
            <div class="container-footer-top">
                <div class="container-footer-left">
                    <router-link :to="{ name: 'homme' }" class="logo-container"></router-link>
                    <h3>
                        Altri paesi
                    </h3>
                    <!-- Menù a tendina -->
                    <form action="#">
                        <select name="countries">
                            <option>Italia</option>
                            <option>Francia</option>
                            <option>Spagna</option>
                            <option>Germania</option>
                            <option>Regno Unito</option>
                        </select>
                    </form>
                    <nav class="footer-social">
                        <p class="social-text">
                            Seguici su
                        </p>
                        <ul class="social-list">
                            <li class="social-item">
                                <a href="#">
                                    <i class="fa-brands fa-facebook"></i>
                                </a>
                            </li>
                            <li class="social-item">
                                <a href="#">
                                    <i class="fa-brands fa-twitter"></i>
                                </a>
                            </li>
                            <li class="social-item">
                                <a href="#">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </li>
                            <li class="social-item">
                                <a href="#">
                                    <i class="fa-brands fa-linkedin"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="container-footer-right">
                    <div class="footer-column">
                        <h4>
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
                        </h4>
                    </div>
                    <div class="footer-column">
                        <h4>
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
                        </h4>
                    </div>
                    <div class="footer-column">
                        <h4>
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
                        </h4>
                    </div>
                </div>
                <!-- Modal -->
                <div id="myModal" class="modal">
                <div class="modal-content">
                    <div class="modal-top">
                        <span class="close">&times;</span>
                        <h2 class="modal-top-title">Assistenza BMusic</h2>
                        <p id="modal-message">Il team di solito risponde in poche ore</p>
                    </div>
                    <div class="modal-bottom">
                        <div>
                            <i class="fa-brands fa-whatsapp"></i>
                            <p>Contattaci su Whatsapp</p>
                        </div>
                        <div>
                            <i class="fa-regular fa-envelope"></i>
                            <p>Contattaci su Email</p>
                        </div>
                    </div>
                </div>
                </div>
                <button id="myButton"><i class="fa-regular fa-comments"></i> Chat </button>
            </div>
        </div>
        <div class="footer-bottom">
            <p>Copyright © 2024 | All rights reserved</p>
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
    height: 50px;
    background-image: url('/public/Img/LogoBMusic.png');
    background-size: contain;
    background-repeat: no-repeat;
}

.footer-top .container-footer-top {
    display: flex;
    padding: 50px;
}

.container-footer-left {
    width: 30%;
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
    width: 70%;
    display: flex;
    padding-top: 4rem;
}

.footer-column {
    flex-direction: column;
    width: calc(100% / 3);
    color: white;
    font-size: larger;
    margin: 10px;
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
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: #f4f4ed;
    margin-bottom: 0.5rem;
}

.social-list {
    margin: 0;
    padding: 0;
}

.footer-social {
    margin-top: 3rem;
}

.footer-social ul li {
    display: inline-block;
}

.footer-social a {
    font-weight: bold;
    color: #f4f4ed;
    text-decoration: none;
    margin-left: 10px;
}

.footer-bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #323232;
    padding: .9rem 0;
}

.footer-bottom p {
    color: white;
    margin-bottom: 0;
}

// Menù a tendina

select {
    margin-bottom: 10px;
    margin-top: 10px;
    height: 50px;
    border-radius: 5px;
}

// Button

button {
    position: relative;
    background-color: #BADFDA;
    color: black;
    width: 150px;
    height: 40px;
    border-radius: 25px;
    border: none;
    bottom: -24rem;
    right: 0.3rem;
}

button:hover,
button:focus {
  background-color: #888;
  text-decoration: none;
  cursor: pointer;
}

button .fa-comments {
    margin-right: 5px;
}

// Modal

.modal {
  display: none;
  position: fixed;
  top: 50%;
  left: 70%;
  z-index: 1;
  width: 100%;
  height: 100%;
}

// Contenuto del modal

.modal-content {
  padding: 3px;
  border: 1px solid white;
  width: 25%;
  font-size: 1rem;
}

.modal-top {
    display: flex;
    justify-content: space-between;
    background-color: #BADFDA;
    color: #21252B;
    padding-left: 20px;
    width: 100%;
    flex-direction: column;
    border: 1px solid #21252B;
}

.modal-top-title {
    margin-top: 1.4rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.modal-message {
    margin-bottom: 2rem;
}

.modal-bottom {
    background-color: #21252B;
    padding: 20px;
    width: 100%;
}

.modal-bottom div {
    margin-bottom: 10px;
    background-color: #BADFDA;
    display: flex;
    align-items: center;
    border-radius: 20px;
}

.modal-bottom i {
    margin-left: 15px;
    margin-right: 15px;
}

.modal-bottom p {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
}

.fa-whatsapp {
    color: green;
}

// Chiudi pulsante (x)
.close {
  color: #21252B;
  float: right;
  font-size: 28px;
  font-weight: bold;
  margin-top: 10px;
  position: absolute;
  top: -1rem;
  right: 1rem;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

</style>
