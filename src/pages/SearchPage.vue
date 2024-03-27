<!-- PAGINA PRINCIPALE DOVE ANDRANNO INSERITI TUTTI I COMPONENTI  -->

<script>
export default {
    data() {
        return {
            CheckBoxData: [
                {
                    title: 'Cantanti',
                },
                {
                    title: 'Bassista',
                },
                {
                    title: 'Violista',
                },
            ]
        }
     },
}
</script>

<template>
    <div class="container-fluid d-flex">
        <div class="aside-container">
            <!-- Aside-container -->
            <form>
                <div class="form-group w-75">
                    <label for="exampleInputEmail1">Search</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Inserisci il nome dell'artista">
                </div>
                <div class="form-group w-50">
                    <label for="exampleInputEmail1">Città</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Inserisci la città">
                </div>
                
                <h5 class="mt-3">Tipi di musicisti:</h5>
                <div v-for="(CheckBox, i) in CheckBoxData" :key="i" class="form-check form-check-inline d-flex mb-2">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                    <label class="form-check-label" for="inlineCheckbox1">{{ CheckBox.title }}</label>
                </div>
                

                <button type="submit" class="btn btn-primary mt-2 mb-2">Submit</button>
            </form>
        </div>
        <div class="main-container">
            <!-- main-container -->
            <div class="row d-flex">                    
                    <div class="col-3">
                        <div class="card-result d-flex flex-column">
                            <div class="card-result-top">
                                <div class="background-img">background-img</div>
                                <div class="user-icon">user icon</div>
                            </div>
                            <div class="card-result-bottom"></div>
                        </div>
                    </div>
                    <!--
                    <div class="col-3 ">
                        <div class="card-result"></div>
                    </div>
                    <div class="col-3 ">
                        <div class="card-result"></div>
                    </div>
                    <div class="col-3">
                        <div class="card-result"></div>
                    </div>
                    -->                                   
            </div>

        </div>
    </div>

    <div class="scroll-watcher"></div>

</template>

<style lang="scss" scoped>

/* Aside Container */
.aside-container {
    border: 1px dashed black;
    width: 400px;
    min-height: 500px; 
}

/* Main Container */

.main-container {
    border: 1px dashed red;
    width: calc(100% - 400px);
    min-height: 500px;
}

/* Card-result */

.card-result {
    border: 1px dashed black;
    border-radius: 20px;
    min-height: 300px;
}

.card-result-top {
    border: 1px dashed violet;
    height: 150px;
}

.card-result-bottom {
    border: 1px dashed blue;
    height: 100px;
}

.container-img {
    border: 1px solid red;
    height: 100px;
    width: 100px;
}

.user-icon {
    border: 1px solid green;
    height: 70px;
    width: 70px;
    border-radius: 50px;
}

/*
.scroll-watcher{
    height: 5px;
    position: fixed;
    top: 0;
    z-index: 9999;
    background-color: black;
    width: 100%;
    scale: 0 1;
    transform-origin: left;
    animation: scroll-watcher linear;
    animation-timeline: scroll(y);
}
@keyframes scroll-watcher{
    to { scale: 1 1;}
}
*/
</style>