<template lang="html">
    <div id="console">
        <div id="gameboard">
            <div class='blackoverlay' id='fade'></div>
            <div id="innerboard">
                <div v-for="el in allColorsArray"
                v-bind:key="el.id"
                v-bind:id="el.id"
                v-bind:class="el.color  + ' pieces ' + theSizeString"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        loopArray() {
            return [...Array(this.$store.getters.gamesize).keys()];
        },
        ...mapState([
            'lastMove',
            'ingame',
            'theSizeString',
            'allColorsArray'
        ])
    }
}
</script>

<style lang="css">
</style>
