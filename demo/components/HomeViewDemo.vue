<template>
  <section class="container-xxl py-5 home-view-demo">
    <h2 class="display-3">Demo</h2>
    <CarouselDemo
      v-bind="{ ...settings }"
    >
      <CarouselItem
        v-for="item in items"
        :key="item"
      >
        <div class="card text-body home-view-demo__slide fs-4 text-light text-center">
          {{ item }}
        </div>
      </CarouselItem>
    </CarouselDemo>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HomeViewDemo',
  data() {
    return {
      settings: {
        getters: '1rem',
        capacity: 1,
        responsive: {
          sm: {
            capacity: 2,
          },
          md: {
            capacity: 3,
          },
          lg: {
            capacity: 4,
          },
          xl: {
            capacity: 5,
          },
        },
      },
      items: [
        'best ssr support',
        'tiny',
        'fast',
        'easy',
        'responsive',
        'lot of options',
      ],
    };
  },
});
</script>

<style lang="scss">
.home-view-demo {
  &__slide {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 12rem;
  }
}
</style>
