<template lang="html">
    <div id="bar">
        <div class="movers" id="count"><span id="movestring">{{moveString}}</span></div>
        <button class='conts' v-on:click="handleOptionsClick">OPTIONS</button>
        <button class='conts' v-on:click="startGame">RESTART</button>
    </div>
</template>

<script>
export default {
    computed: {
        moveString: function () {
            return this.$store.getters.moveCount + '/' + this.$store.getters.maxMoves;
        }
    },
    methods: {
        handleOptionsClick: function () {
            this.$store.dispatch('showOptions');
        },
        startGame() {
            this.$store.dispatch('startGame');
        }
    }
}
</script>

<style lang="css">
</style>
