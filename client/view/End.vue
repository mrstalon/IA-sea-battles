<template>
  <div class="container">
      <h1 v-if="!this.$store.state.whichPlayerWon">Ничья, победила дружба!</h1>
      <h1 v-else>Победил алгоритм под именем -- {{this.$store.state.whichPlayerWon}}</h1>
      <button v-on:click="returnToMenu">Меню</button>
  </div>
</template>


<script>
export default {
    methods: {
        returnToMenu() {
            this.$router.push('/');
        }
    },
    data() {
        return {

        }
    }
}
</script>


<style scoped>

.container {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

h1 {
    width: 400px;
}

button {
    width: 100px;
}

</style>
