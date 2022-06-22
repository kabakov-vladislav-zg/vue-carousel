<template>
  <header class="the-header">
    <div class="the-header__inner position-fixed top-0 end-0 start-0 bg-dark">
      <div class="container-xxl d-flex align-items-center h-100 py-2">
        <router-link
          to="/"
          class="text-light me-auto align-self-stretch"
        >
          <IconLogo class="icon h-100 w-auto"/>
        </router-link>
        <nav>
          <router-link
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="link-light ms-3"
          >{{ link.name }}</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import IconLogo from './IconLogo.vue';

export default Vue.extend({
  name: 'TheHeader',
  components: { IconLogo },
  data() {
    return {
      links: [
        {
          name: 'docs',
          to: '/docs',
        },
        {
          name: 'api',
          to: '/api',
        },
        {
          name: 'playground',
          to: '/playground',
        },
        {
          name: 'cookbook',
          to: '/cookbook',
        },
      ],
    };
  },
});
</script>

<style lang="scss">
.the-header {
  &, &__inner {
    height: 3rem;
  }
}
</style>
