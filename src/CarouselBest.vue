<template>
  <section
    class="crs-container crs-settings"
    :class="[
      ...sceneClass,
      { 'crs-scene_draggable' : dragNDrop },
    ]"
    :style="sceneStyle"
    aria-roledescription="carousel"
    :aria-label="labelRoot"
  >
    <slot
      name="previous"
      v-bind="{
        prev,
      }"
    >
      <button
        @click="prev"
      >
        previous
      </button>
    </slot>
    <slot
      name="next"
      v-bind="{
        next,
      }"
    >
      <button
        @click="next"
      >
        next
      </button>
    </slot>
    <div class="crs-scene">
      <div
        ref="backstage"
        class="crs-backstage"
        :style="{
        '--count': counter
      }"
      >
        <div
          @transitionstart.self="ontransitionstart"
          @transitionend.self="ontransitionend"
          ref="proscenium"
          class="crs-proscenium"
          :class="{
          'crs-proscenium_dragged' : isDragged,
        }"
          :style="prosceniumStyle"
        >
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import settingsMixin from './settings.mixin';

export default {
  name: 'CarouselBest',
  props: {
    slug: { type: String, required: false },
    labelRoot: { type: String, required: false },
    labelPrev: { type: String, required: false },
    labelNext: { type: String, required: false },
    labelTab: { type: String, required: false },
  },
  mixins: [settingsMixin],
  data() {
    return {
      counter: 0,
      stack: NaN,
      prosceniumStyle: '',
      isDragged: false,
      isPause: false,
      // mutated from settingsMixin
      items: [],
      maxValue: 0,
      dragNDrop: false,
      sceneStyle: {},
      sceneClass: [],
    };
  },
  watch: {
    maxValue() {
      if (this.isOutRange(this.counter)) {
        this.counter = this.maxValue;
      }
    },
    dragNDrop(flag) {
      this.setDragNDrop(flag);
    },
  },
  methods: {
    next() {
      this.move(this.counter + 1);
    },
    prev() {
      this.move(this.counter - 1);
    },
    move(count) {
      if (this.isDisallowedMove(count)) return;
      if (this.isTransition) {
        this.stack = count;
      } else {
        this.counter = count;
      }
    },
    isDisallowedMove(count) {
      return (count === this.counter) || !!this.stack || this.isOutRange(count);
    },
    isOutRange(count) {
      return count < 0 || count > this.maxValue;
    },
    ontransitionstart() {
      this.isTransition = true;
    },
    ontransitionend() {
      this.isTransition = false;

      if (Number.isInteger(this.stack)) {
        this.counter = this.stack;
      }
      this.stack = NaN;
    },
    getCountFromShift({ stepWidth, startCount, pointerShift }) {
      let count = startCount;
      const absoluteShift = Math.abs(pointerShift);
      if (absoluteShift > 40) {
        let countShift;
        if (absoluteShift < stepWidth) {
          countShift = Math.ceil(absoluteShift / stepWidth);
        } else {
          countShift = Math.round(absoluteShift / stepWidth);
        }
        count -= Math.sign(pointerShift) * countShift;
      }
      return count;
    },
    onpointermove({
      stepWidth,
      prosceniumX,
      startClientX,
      startCount,
    }, e) {
      const pointerShift = e.clientX - startClientX;
      const prosceniumShift = prosceniumX + pointerShift;
      const count = this.getCountFromShift({
        stepWidth,
        startCount,
        pointerShift,
      });
      this.move(count);
      this.prosceniumStyle = `transform: translateX(${prosceniumShift}px)`;
    },
    onpointerup({ onpointermove }) {
      document.removeEventListener('pointermove', onpointermove);
      this.prosceniumStyle = '';
      this.isDragged = false;
    },
    ondragstart({ clientX }) {
      const { proscenium, backstage } = this.$refs;
      const prosceniumBox = proscenium.getBoundingClientRect();
      const backstageBox = backstage.getBoundingClientRect();
      const state = {
        stepWidth: this.getStepWidth(),
        prosceniumX: prosceniumBox.left - backstageBox.left,
        startClientX: clientX,
        startCount: this.counter,
      };
      const onpointermove = this.onpointermove.bind(this, state);
      const onpointerup = this.onpointerup.bind(this, { onpointermove, ...state });
      this.stack = NaN;
      this.isDragged = true;
      document.addEventListener('pointermove', onpointermove);
      document.addEventListener('pointerup', onpointerup, { once: true });
      this.prosceniumStyle = `transform: translateX(${state.prosceniumX}px)`;
    },
    setDragNDrop(flag) {
      const { proscenium } = this.$refs;
      if (flag) {
        proscenium.addEventListener('pointerdown', this.ondragstart);
        proscenium.ondragstart = () => false;
      } else {
        proscenium.removeEventListener('pointerdown', this.ondragstart);
        proscenium.ondragstart = null;
      }
    },
    getStepWidth() {
      return this.getItemWidth() + this.getGetterWidth();
    },
    getItemWidth() {
      const box = this.items[0].elm.getBoundingClientRect();
      return box.width;
    },
    getGetterWidth() {
      let width;
      if (this.items.length < 2) {
        width = 0;
      } else {
        const box0 = this.items[0].elm.getBoundingClientRect();
        const box1 = this.items[1].elm.getBoundingClientRect();
        width = box1.left - box0.right;
      }
      return width;
    },
  },
};
</script>

<style>
.crs-container {
  display: flex;
  flex-wrap: wrap;
}
.crs-scene, .crs-backstage, .crs-proscenium {
  box-sizing: border-box;
}
.crs-scene {
  overflow-x: hidden;
  width: 100%;
  padding: 0 var(--padding);
  display: grid;
  justify-items: var(--justify);
}

.crs-backstage {
  --visible-items-width: calc(100% - var(--getters) * (var(--capacity) - 1));
  width: calc(var(--visible-items-width) / var(--capacity));
  min-width: 0;
  max-width: 100%;
}

.crs-proscenium {
  --shift: calc(-1 * var(--count) * (100% + var(--getters)));
  transform: translate3d(var(--shift), 0, 0);
  transition: var(--speed) linear;
  width: 100%;
  overflow: visible;
  display: flex;
  position: relative;
}

.crs-scene_draggable .crs-proscenium {
  touch-action: pan-y pinch-zoom;
}
.crs-proscenium_dragged {
  transition: none;
}
</style>
