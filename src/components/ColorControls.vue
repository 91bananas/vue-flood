<template lang="html">
    <div id="controlpane">
      <div id="innercontrol">
            <ColorButton
              v-for="color in colors"
              v-bind:color="color"
              v-bind:key="color"
            ></ColorButton>
      </div>
    </div>
</template>

<script>
import ColorButton from './ColorButton.vue'
export default {
    components: {
        ColorButton
    },
    computed: {
      colors() {
          return this.$store.getters.colors;
      }
    }
}
</script>

<style lang="less">

</style>
