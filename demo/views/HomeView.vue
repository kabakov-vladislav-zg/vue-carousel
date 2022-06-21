<template>
  <div class="home">
    <HomeViewHero />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HomeViewHero from '../components/HomeViewHero.vue';

export default Vue.extend({
  name: 'HomeView',
  components: { HomeViewHero },
});
</script>
