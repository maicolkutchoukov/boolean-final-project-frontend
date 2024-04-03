<script>
/* STRUTTURA DI BASE INTRODUTTIVA PER BRAINTREE */
    export default {
    data() {
        return {
        paymentStatus: '',
        braintreeInstance: null
        };
    },
    mounted() {
        // Inizializza l'oggetto Braintree
        this.initializeBraintree();
    },
    methods: {
        initializeBraintree() {
        const clientToken = 'YOUR_CLIENT_TOKEN'; // TOKEN PERSONALE DA INSERIRE
        braintree.client.create({
            authorization: clientToken
        }, (clientErr, clientInstance) => {
            if (clientErr) {
            console.error(clientErr);
            return;
            }
            braintree.dropin.create({
            container: '#dropin-container',
            authorization: clientToken,
            paypal: {
                flow: 'vault'
            }
            }, (dropinErr, instance) => {
            if (dropinErr) {
                console.error(dropinErr);
                return;
            }
            this.braintreeInstance = instance;
            });
        });
        },
        processPayment() {
        this.braintreeInstance.requestPaymentMethod((err, payload) => {
            if (err) {
            console.error(err);
            return;
            }
            // Invia payload a server per l'elaborazione del pagamento
            axios.post('/process-payment', { paymentMethodNonce: payload.nonce })
            .then(response => {
                this.paymentStatus = response.data.message;
            })
            .catch(error => {
                console.error(error);
                this.paymentStatus = 'Errore durante l\'elaborazione del pagamento.';
            });
        });
        }
    }
};
</script>


<template>
    <div>
        <div id="dropin-container"></div>
        <button @click="processPayment">Paga adesso</button>
        <p v-if="paymentStatus">{{ paymentStatus }}</p>
    </div>
</template>

<style lang="scss" scoped>
#dropin-container {
  margin-bottom: 10px;
}
</style>