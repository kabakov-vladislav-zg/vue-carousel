<template>
  <div class="hero">
    <div class="container-xxl py-5">
      <div class="row row-cols-1 row-cols-md-2 align-items-center">
        <div class="col">
          <h1 class="display-1">Vue-carousel</h1>
          <p>Modern carousel for vue with best ssr support</p>
          <a
            href="https://github.com/kabakov-vladislav-zg/vue-carousel"
            class="btn btn-outline-primary btn-lg me-2"
          >
            GitHub
          </a>
          <router-link
            to="/"
            class="btn btn-primary btn-lg"
          >
            Get started
          </router-link>
        </div>
        <div class="col px-5">
          <div class="ratio ratio-4x3">
            <div>
              <div class="h-100">
                <IconLogoAnimate
                  class="hero__logo w-100 h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconLogoAnimate from './IconLogoAnimate.vue';

export default {
  name: 'HomeViewHero',
  components: { IconLogoAnimate },
};
</script>
