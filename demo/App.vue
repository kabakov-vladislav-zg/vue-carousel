<template>
  <div id="app">
    <TheHeader />
    <main class="bg-dark text-light">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from './components/TheHeader.vue';

export default Vue.extend({
  name: 'App',
  components: {
    TheHeader,
  },
});
</script>
