<!-- PAGINA PRINCIPALE DOVE ANDRANNO INSERITI TUTTI I COMPONENTI  -->

<script>
export default {
    data() {
        return {
        }
     },
}
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-6">
                <h2>Accedi Subito</h2>
                <p>Inserisci le tue credenziali per accedere alla tua area personale</p>
                <form>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control w-50" id="email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control w-50" id="password">
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Ricordami</label>
                </div>
                <button type="submit" class="btn btn-primary">Accedi</button>
                </form>
            </div>
            <div class="col-6">
                <h2>
                    Non possiedi un account? <br>
                    Registrati Subito
                </h2>
                <p>Registrati subito per creare le pagine dei tuoi progetti musicali e ricevere richieste per concerti.</p>
                <router-link :to="{ name: 'registration' }" class="px-3">Registrati</router-link>

            </div>
        </div>
    </div>
    <div class="scroll-watcher"></div>

</template>

<style lang="scss" scoped>

</style>