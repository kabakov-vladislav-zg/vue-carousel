<template>
  <div class="playground-view container-xxl py-5">
    <h1 class="display-1 mb-4">Playground</h1>
    <CarouselDemo
      v-bind="{}"
    >
      <CarouselItem
        v-for="n in range"
        :key="n"
      >
        <div class="card text-body playground-view__slide fs-4 text-light text-center">
          {{ n }}
        </div>
      </CarouselItem>
    </CarouselDemo>
    <div>
      <div class="row row-cols-1 row-cols-md-2 mt-4">
        <div class="col">
          <div
            v-for="item in rawSettings"
            :key="item.breakpoint"
            class="mb-4"
          >
            <h2>{{ item.breakpoint | capitalize }}</h2>
            <div
              v-for="(setting, key) in item.settings"
              :key="key"
              class="mb-3"
            >
              <label
                :for="key + 'Control'"
                class="form-label"
              >
                {{ key | capitalize }}
              </label>
              <input
                v-model="item.settings[key]"
                type="text"
                class="form-control"
                :id="key + 'Control'"
                placeholder=""
              >
            </div>
          </div>
        </div>
        <div class="col">
          {{ JSON.stringify(settings) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface Settings {
  getters?: string,
  capacity?: string,
  padding?: string,
  speed?: string,
  justify?: string,
  draggable?: string,
}
export default Vue.extend({
  name: 'PlaygroundView',
  components: {},
  data():any {
    return {
      range: 10,
      rawSettings: [
        {
          breakpoint: 'default',
          settings: {
            getters: '0rem',
            capacity: '1',
            padding: '0',
            speed: '0.25s',
            justify: 'start',
            draggable: '',
          },
        },
        {
          breakpoint: 'sm',
          settings: {
            getters: '',
            capacity: '',
            padding: '',
            speed: '',
            justify: '',
            draggable: '',
          },
        },
        {
          breakpoint: 'md',
          settings: {
            getters: '',
            capacity: '',
            padding: '',
            speed: '',
            justify: '',
            draggable: '',
          },
        },
        {
          breakpoint: 'lg',
          settings: {
            getters: '',
            capacity: '',
            padding: '',
            speed: '',
            justify: '',
            draggable: '',
          },
        },
        {
          breakpoint: 'xl',
          settings: {
            getters: '',
            capacity: '',
            padding: '',
            speed: '',
            justify: '',
            draggable: '',
          },
        },
        {
          breakpoint: 'xxl',
          settings: {
            getters: '',
            capacity: '',
            padding: '',
            speed: '',
            justify: '',
            draggable: '',
          },
        },
      ],
      specification: {
        getters: {
          default: '0rem',
          units: 'size',
          step: 1,
        },
        capacity: {
          default: '1',
          units: null,
          step: 1,
        },
        padding: {
          default: '0',
          units: 'size',
          step: 1,
        },
        speed: {
          default: '0.25s',
          units: 'time',
          step: 0.25,
        },
        justify: {
          default: 'start',
          units: null,
          step: ['start', 'center'],
        },
        draggable: {
          default: 'true',
          units: null,
          step: ['true', 'false'],
        },
      },
      units: {
        size: [
          'rem',
          'em',
          'px',
          '%',
          'vh',
          'vw',
        ],
        time: [
          's',
          'ms',
        ],
      },
      breakpoints: [
        'sm',
        'md',
        'lg',
        'xl',
        'xxl',
      ],
      defaultSettings: {
        getters: '0rem',
        capacity: '1',
        padding: '0',
        speed: '0.25s',
        justify: 'start',
        draggable: '',
      },
    };
  },
  computed: {
    settings():object {
      const rawSettings = JSON.parse(JSON.stringify(this.rawSettings));
      const cleanedSettings = rawSettings.map(this.clean);
      const computedSettings = cleanedSettings.map(this.compute);
      computedSettings.reverse();
      computedSettings.push(this.defaultSettings);
      const resultSettings = computedSettings.map(this.getResultSettings);
      resultSettings.pop();
      resultSettings.reverse();
      resultSettings.filter((settings: Settings) => !!Object.keys(settings).length);
      return resultSettings;
    },
  },
  methods: {
    clean({ settings }: { settings: Settings }): Settings {
      const arrSettings = Object.entries(settings).filter(([key, value]) => !!value);
      const cleanedSettings: any = {};
      arrSettings.forEach(([key, value]: [string, string]) => {
        cleanedSettings[key] = value;
      });
      return cleanedSettings;
    },
    compute(settings: Settings, index: number, cleanedSettings: Array<object>): Settings {
      const current = cleanedSettings.slice(0, index + 1);
      return Object.assign({}, this.defaultSettings, ...current);
    },
    getResultSettings(
      settings: Settings,
      index: number,
      computedSettings: Array<any>,
    ): Settings {
      if (index < (computedSettings.length - 1)) {
        let arrSettings = Object.entries(settings);
        arrSettings = arrSettings
          .filter(([key, value]) => computedSettings[index + 1][key] !== value);
        const resultSettings: any = {};
        arrSettings.forEach(([key, value]: [string, string]) => {
          resultSettings[key] = value;
        });
        return resultSettings;
      }
      return settings;
    },
  },
  filters: {
    capitalize(value: string) {
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
});
</script>

<style lang="scss">
.playground-view {
  &__slide {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 12rem;
  }
}
</style>
