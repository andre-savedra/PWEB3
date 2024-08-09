<script setup lang="ts">
</script>

<template>
  <div class="flex flex-row align-items-center justify-content-evenly">
    <section class="flex flex-column align-items-center">
        <h1>Construa agora seu Mange Bot!</h1>
        <button class="mt-4 app-dark-button" id="order">Quero o meu!</button>
    </section>
    <section>
      <img src="/big-bot.png" alt="robot">
    </section>
  </div>
</template>

<style scoped lang="scss">
  h1{
    font-size: 5rem;
    width: 25rem;
    text-align: center;
  }
  #order{
    height: 3.2rem;
    width: 20rem;
    border-radius: 2.5rem;
  }
</style>