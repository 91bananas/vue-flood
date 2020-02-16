<template>
    <div id="app">
        <div class="game-wrapper">
            <GameHeader v-bind:max-moves="maxMoves" v-bind:move-count="moveCount"></GameHeader>
            <GameBoard></GameBoard>
            <ColorControls></ColorControls>
            <StartModal ></StartModal>
            <OptionsModal></OptionsModal>
            <MessageModal></MessageModal>
        </div>
    </div>
</template>

<script>
import GameHeader from './components/GameHeader.vue'
import GameBoard from './components/GameBoard.vue'
import OptionsModal from './components/modals/OptionsModal.vue'
import StartModal from './components/modals/StartModal.vue'
import MessageModal from './components/modals/MessageModal.vue'
import ColorControls from './components/ColorControls.vue'

export default {
  name: 'App',
  components: {
    GameHeader,
    GameBoard,
    ColorControls,
    StartModal,
    OptionsModal,
    MessageModal
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
