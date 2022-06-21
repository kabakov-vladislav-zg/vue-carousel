import { Breakpoint } from './util';

export default {
  props: {
    getters: { type: String, default: '0' },
    capacity: { type: [Number, String], default: 1 },
    padding: { type: String, default: '0' },
    speed: { type: String, default: '0.25s' },
    justify: { type: String, default: 'start' },
    range: { type: Number, required: false },
    draggable: { type: Boolean, defaults: true },
    responsive: { type: Object, required: false },
  },
  data() {
    return {
      maxValue: 0,
      dragNDrop: false,
      items: [],
      css: {},
      breakpoints: [],
      sceneStyle: {},
      sceneClass: [],
    };
  },
  created() {
    console.log(this.$slots);
    this.setCssSettings();
  },
  mounted() {
    console.log(this.$children);
    console.log(this.$slots.previous);
    this.css = window.getComputedStyle(this.$el);
    this.setJsSettings();
  },
  beforeDestroy() {
    this.clearBreakpoints();
  },
  watch: {
    breakpoints: {
      deep: true,
      handler(breakpoints) {
        const settings = JSON.parse(JSON.stringify(this.$props));
        if (breakpoints.length) {
          const { responsive } = settings;
          delete settings.responsive;
          const current = breakpoints.filter((breakpoint) => breakpoint.state);
          current.forEach((breakpoint) => Object.assign(settings, responsive[breakpoint.name]));
        }
        this.setSettings(settings);
      },
    },
    $props: {
      deep: true,
      handler() {
        this.items = this.$slots.default;
        this.setCssSettings();
        this.setJsSettings();
      },
    },
  },
  methods: {
    setCssSettings() {
      const sceneStyle = {};
      const sceneClass = [];
      const settings = [
        'getters',
        'capacity',
        'padding',
        'speed',
        'justify',
      ];
      const sss = (setting, breakpoint = '') => {
        settings.forEach((name) => {
          if (setting[name]) {
            sceneStyle[`--${name[0] + breakpoint}`] = setting[name];
            if (breakpoint) {
              sceneClass.push(`crs-${name[0] + breakpoint}`);
            }
          }
        });
      };
      sss(this.$props);
      if (this.responsive) {
        const keys = Object.keys(this.responsive);
        keys.forEach((breakpoint) => {
          sss(this.responsive[breakpoint], `-${breakpoint}`);
        });
      }
      this.sceneStyle = sceneStyle;
      this.sceneClass = sceneClass;
    },
    setJsSettings() {
      this.clearBreakpoints();
      if (this.responsive) {
        let breakpoints = Object.keys(this.responsive);
        breakpoints = breakpoints.map(this.getBreakpoint);
        breakpoints.sort((a, b) => a.value - b.value);
        this.breakpoints = breakpoints;
      } else {
        this.breakpoints = [];
      }
    },
    getBreakpoint(name) {
      const value = Number(this.css.getPropertyValue(`--${name}`));
      return new Breakpoint(name, value);
    },
    setSettings({ justify, capacity, draggable }) {
      this.items = this.$slots.default;
      this.maxValue = this.getLimit({
        range: this.items.length,
        isCentered: justify.trim() === 'center',
        capacity: Number(capacity),
      });
      this.dragNDrop = draggable;
    },
    clearBreakpoints() {
      this.breakpoints.forEach((breakpoint) => breakpoint.destroy());
    },
    getLimit({ isCentered, range, capacity }) {
      return isCentered ? range - 1 : range - capacity;
    },
  },
};
