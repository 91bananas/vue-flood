<template lang="html">
    <div class="outer_moves"><div class='moves' :id="color + 'cont'" v-on:click="handleClick(color)"></div></div>
</template>

<script>
export default {
    props: ['color'],
    methods: {
        handleClick(color) {
            this.$store.dispatch('moveMade', color);
        }
    }
}
</script>

<style lang="css">
</style>
