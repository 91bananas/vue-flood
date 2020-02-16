<template lang="html">
    <div v-if="showMessage" class='startUp' id='msgbox'>
        <p>{{message}}</p>
        <div><a href='#' v-on:click="startGame">Please click here to play again</a></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        showMessage() {
            return this.$store.getters.showMessage;
        },
        ...mapState(['message'])
    },
    methods: {
        startGame() {
            this.$store.dispatch('startGame');
        }
    }
}
</script>

<style lang="css">
</style>
