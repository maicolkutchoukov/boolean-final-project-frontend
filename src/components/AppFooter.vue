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
                    <h2>
                        LOGO
                    </h2>
                    <h3>
                        Altri paesi
                    </h3>
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
                        <p id="modal-message">Il team si riserva di rispondere quando meglio crede</p>
                    </div>
                    <div class="modal-bottom">
                        <div>
                            <i class="fa-brands fa-whatsapp"></i>
                            <p>Whatsapp</p>
                        </div>
                        <div>
                            <i class="fa-regular fa-envelope"></i>
                            <p>Email</p>
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
    background-color: #23272a;
    min-height: 300px;
    width: 100%;
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
    color: white;
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
.select {
    box-sizing: border-box;
    position: relative;
    width: 100%;
}

.select-control {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
    transition: all 100ms;
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%);
    border-width: 1px;
    box-sizing: border-box;
}

.select-value {
    width: 100%;
    padding: 9px 12px;
}

.single-value {
    grid-area: 1/1/2/3;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: hsl(0, 0%, 20%);
    margin-left: 2px;
    margin-right: 2px;
    box-sizing: border-box;
}

.input-container {
    visibility: visible;
    display: inline-grid;
    grid-area: 1/1/2/3;
    grid-template-columns: 0 min-content;
    margin: 2px;
    padding-bottom: 2px;
    padding-top: 2px;
    color: hsl(0, 0%, 20%);
    box-sizing: border-box;
}

.select-dropdown {
    color: black;
    display: flex;
    padding-right: 2rem;
    padding-left: 0;
    transition: color .15s;
    box-sizing: border-box;
}

select {
     margin-bottom: 10px;
     margin-top: 10px;
     height: 50px;
     border-radius: 5px;
}

// Button

button {
    position: relative;
    background-color: #ed0f46;
    color: white;
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

/* Modal */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  /*background-color: rgba(0,0,0,0.4);*/
}

/* Contenuto del modal */
.modal-content {
  bottom: -25rem;
  right: -51rem;
  padding: 3px;
  border: 1px solid #888;
  width: 25%;
  font-size: 1rem;
}

.modal-top {
    display: flex;
    justify-content: space-between;
    background-color: #903;
    color: white;
    padding-left: 20px;
    width: 100%;
    flex-direction: column;
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
    background-color: white;
    padding: 20px;
    width: 100%;
}

.modal-bottom div {
    margin-bottom: 10px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
}

.modal-bottom i {
    margin-left: 6px;
    margin-right: 20px;
}

.modal-bottom p {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
}

.fa-whatsapp {
    color: green;
}

/* Chiudi pulsante (x) */
.close {
  color: white;
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
