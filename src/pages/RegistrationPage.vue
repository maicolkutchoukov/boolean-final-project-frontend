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
    <div class="container mt-3">
        
        <h2>REGISTRAZIONE</h2>
        
        <form>
            <div class="d-flex justify-content-around">
                <div>
                <!--Input nome-->
                <div class="form-group">
                    <label for="name">Nome*</label>
                    <input type="name" class="form-control mb-2" id="name" placeholder="Inserisci il tuo nome">               
                </div>

                <!--Input città-->
                <div class="form-group">
                    <label for="exampleInputPassword1">Città*</label>
                    <input type="password" class="form-control mb-2" id="exampleInputPassword1" placeholder="Inserisci la tua città">
                </div>
            </div>

            <div>
                <!--Input Email-->
                <div class="form-group">
                    <label for="email">Mail*</label>
                    <input type="email" class="form-control mb-2" id="email" placeholder="Inserisci la tua email">                
                </div>

                <!--Input password-->
                <div class="form-group">
                    <label for="password">Password*</label>
                    <input type="password" class="form-control mb-2" id="password" placeholder="Inserisci password">
                </div>

                <!--Input conferma password-->
                <div class="form-group">
                    <label for="password">Conferma Password*</label>
                    <input type="password" class="form-control mb-2" id="password" placeholder="Conferma password">
                </div>
            </div>
        
        </div>

        <div class="d-flex justify-content-around mt-3">

            <!--Checklist policy-->            
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Dichiaro di aver letto le condizioni legali
                    </label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                    <label class="form-check-label" for="flexCheckChecked">
                        Dichiaro di aver letto la privacy policy
                    </label>
            </div>
            
        </div>

        <!--Button-->
        <div class="text-center">
            <button type="submit" class="btn btn-primary">Registrati</button>
        </div>
            
        </form>
    </div>

</template>

<style lang="scss" scoped>

</style>

<!-- nome, email,password, città -->