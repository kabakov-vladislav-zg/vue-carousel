<template>
  <div class="hello">
    <CarouselDemo
      :jsSettings="false"
      :padding="'2rem'"
      :getters="'1rem'"
      :capacity="1"
      :justify="'center'"
      :draggable="false"
      :responsive="{
        md: {
          capacity: 2,
        },
        lg: {
          capacity: 3,
          draggable: true,
        }
      }"
    >
      <template #previous="{prev}">
        <button @click="prev">предыдущий</button>
      </template>
      <CarouselItem
        v-for="n in 10"
        :key="n"
      >
        <div class="slide">{{ n }}</div>
      </CarouselItem>
    </CarouselDemo>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
});
</script>

<style scoped>
.slide {
  height: 300px;
  background: blueviolet;
}
</style>
