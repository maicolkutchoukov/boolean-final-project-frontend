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
                    <h3>
                        LOGO
                    </h3>
                    <h4>
                        Altri paesi
                    </h4>
                    <form action="#">
                        <label for="lang">Language</label>
                        <select name="languages" id="lang">
                            <option value="javascript">Italia</option>
                            <option value="php">Francia</option>
                            <option value="java">Spagna</option>
                            <option value="golang">Germania</option>
                            <option value="python">Regno Unito</option>
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
            </div>
        </div>
        <div class="footer-bottom"></div>
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
    padding: 85px;
}

.container-footer-left {
    width: 30%;
    min-height: 400px;
    margin: 20px 0;
}

.container-footer-left h3 {
    color:white;
    font-size: 2em;
    margin-bottom: 5rem;
}

.container-footer-left h4 {
    line-height: 2.3rem;
    font-size: 1.8rem;
    color: #fff;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.container-footer-right {
    width: 70%;
    display: flex;
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
    margin-bottom: 1rem;
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

/*.fa-brands {
    height: 100;
}*/

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

label {
     display: flex;
     align-items: center;
     justify-content: center;
     margin: 0 auto;
   }

select {
     margin-bottom: 10px;
     margin-top: 10px;
     height: 50px;
   }



</style>
