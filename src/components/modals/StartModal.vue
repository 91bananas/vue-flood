<template lang="html">
    <div v-if="showStartup" class="startUp" id="home">
        <p>The goal of the game is to make the entire board the same color.</p>
        <p>You start controlling the top left corner square.</p>
        <p>You then press the colored buttons across the bottom to change the color of the squares you control.</p>
        <p>As you make your pieces touch pieces of the same color, you acquire them.</p>
        <p>There is a limited number of moves for each sized board, 22 and 36 for small and large boards respectively.</p>
        <div><a href='#' id="click_here_to_play" v-on:click="startGame">Click here to play!</a></div>
    </div>
</template>

<script>
export default {
    computed: {
        showStartup() {
            return this.$store.getters.showStartup;
        }
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
