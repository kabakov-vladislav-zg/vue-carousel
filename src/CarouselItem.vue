<template>
  <div class="slider-item">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CarouselItem',
};
</script>

<style>
.slider-item {
  flex-shrink: 0;
  width: 100%;

  margin-right: var(--getters);
}
</style>
