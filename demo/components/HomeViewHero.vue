<template>
  <div class="hero">
    <div class="container-xxl py-5">
      <div class="row row-cols-2 align-items-center">
        <div class="col">
          <h1 class="display-1">Vue-carousel</h1>
          <p>Modern carousel for vue with best ssr support</p>
        </div>
        <div class="col">
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

<style lang="scss">
.hero {
  height: 100vh;
}
</style>
