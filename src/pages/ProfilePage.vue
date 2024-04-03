<!-- PAGINA PRINCIPALE DOVE ANDRANNO INSERITI TUTTI I COMPONENTI  -->

<script>

import axios from 'axios';

export default {
  data() {
    return {
        apiUrl: 'http://127.0.0.1:8000/api/users/',
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
        console.log(`${this.apiUrl}${this.$route.params.id}`)
        axios.get(`${this.apiUrl}${this.$route.params.id}`) // URL DELL'API
            .then((response) => {
                console.log(response.data.result);
                this.allMusicians = response.data.result;
                console.log(this.allMusicians)
            })
            .catch(error => {
            console.error('Errore durante la chiamata API:', error);
            });
    }
}


</script>

<template>
    <div>
        <!-- <div v-for="(musician, index) in allMusicians" :key="musician.id" class="card mb-3">
            <img :src="musician.user_details.picture" class="card-img-top" alt="Profile Picture">
            <div class="card-body">
                {{ musician.id }}
                <h5 class="card-title">{{ musician.name }}</h5>
                <p class="card-text">{{ musician.user_details.bio }}</p>
                <p class="card-text">Città: {{ musician.city }}</p>
                <p class="card-text">Email: {{ musician.email }}</p>
                <p class="card-text">Ruoli:
                    <span v-for="(role, i) in musician.roles" :key="i">
                    {{ role.title }}
                    <span v-if="i !== musician.roles.length - 1">, </span>
                    </span>
                </p>
                <p class="card-text">Votes:
                    <span v-for="(vote, i) in musician.votes" :key="i">
                    {{ vote.label }}
                    <span v-if="i !== musician.votes.length - 1">, </span>
                    </span>
                </p>
                <p class="card-text">Messaggi: {{ musician.messages.length }}</p>
            </div>
        </div> -->
        <!-- <img :src="allMusicians.user_details.picture" class="card-img-top" alt="Profile Picture"> -->
        <div class="card-body">
            
            <h5 class="card-title">{{ allMusicians.name }}</h5>
            <p class="card-text">{{ allMusicians.user_details.bio }}</p>
            <p class="card-text">Città: {{ allMusicians.city }}</p>
            <p class="card-text">Email: {{ allMusicians.email }}</p>
            <p class="card-text">Ruoli:
                <span v-for="(role, i) in allMusicians.roles" :key="i">
                {{ role.title }}
                <span v-if="i !== allMusicians.roles.length - 1">, </span>
                </span>
            </p>
            <p class="card-text">Votes:
                <span v-for="(vote, i) in allMusicians.votes" :key="i">
                {{ vote.label }}
                <span v-if="i !== allMusicians.votes.length - 1">, </span>
                </span>
            </p>
            <p class="card-text">Messaggi: {{ allMusicians.messages.length }}</p>
        </div>
        <router-link :to="{ name: 'contact' }" class="header-link">Contattami</router-link>
    </div>
</template>

<style lang="scss" scoped>

</style>