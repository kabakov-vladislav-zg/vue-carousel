<template>
  <div class="home">
    <HomeViewHero />
    <HomeViewDemo />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HomeViewHero from '../components/HomeViewHero.vue';
import HomeViewDemo from '../components/HomeViewDemo.vue';

export default Vue.extend({
  name: 'HomeView',
  components: { HomeViewHero, HomeViewDemo },
});
</script>
