<template lang="html">
    <div v-if="showOptions" class="startUp" id="options">
        <p>Board Size</p>
        <a href='#' id="small_sizer" v-on:click="makeSmall">Small</a>
        <a href='#' id="large_sizer" v-on:click="makeLarge">Large</a>
        <div id="close_btn"><button class="close_btn" v-on:click="hideOptions">Close</button></div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    computed: {
        showOptions: function () {
            return this.$store.getters.showOptions;
        }
    },
    methods: mapActions([
        'hideOptions',
        'makeLarge',
        'makeSmall'
    ])
}
</script>

<style lang="css">
</style>
