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
                    <div class="select">
                        <div class="select-control">
                            <div class="select-value"></div>
                            <div class="select-indicator"></div>
                        </div>
                    </div>
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
}

.container-footer-left h4 {
    line-height: 2.3rem;
    font-size: 1.8rem;
    color: #fff;
    font-weight: 700;
    margin-bottom: 5rem;
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

// Menù a tendina
.select {
    margin-bottom: 8.5rem;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    min-height: 4.8rem!important;
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

</style>
