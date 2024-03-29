<!-- PAGINA PRINCIPALE DOVE ANDRANNO INSERITI TUTTI I COMPONENTI  -->

<script>

import axios from 'axios';

export default {
  data() {
    return {
      allMusicians: [],

      CheckBoxData: [
                {
                    title: 'Cantante',
                },
                {
                    title: 'Bassista',
                },
                {
                    title: 'Violista',
                },
                {
                    title: 'Percussionista',
                },
                {
                    title: 'Chitarrista',
                },
                {
                    title: 'Violista',
                },
                {
                    title: 'Violista',
                },
                {
                    title: 'Violista',
                },
            ]
    };
  },
    created() {
        axios.get('http://127.0.0.1:8000/api/users') // URL DELL'API
            .then((response) => {
                console.log(response.data.results.data);
                this.allMusicians = response.data.results.data;
                console.log(this.allMusicians)
            })
            .catch(error => {
            console.error('Errore durante la chiamata API:', error);
            });
    }
}


</script>

<template>
    <div v-for="(SingleMusician, i) in allMusicians" :key="i" class="card mb-3">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ SingleMusician.name }}</h5>
            <p class="card-text">{{ SingleMusician.user_details.bio }}</p>
            <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>