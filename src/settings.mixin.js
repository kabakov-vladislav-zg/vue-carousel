import { Breakpoint } from './util';

export default {
  props: {
    getters: { type: String, default: '0rem' },
    capacity: { type: [Number, String], default: 1 },
    padding: { type: String, default: '0' },
    speed: { type: String, default: '0.25s' },
    justify: { type: String, default: 'start' },
    range: { type: Number, required: false },
    draggable: { type: [Boolean, String], default: true },
    responsive: { type: Object, default() { return {}; } },
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
    this.setCssSettings();
  },
  mounted() {
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
        const settings = this.getSettings(breakpoints);
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
        const mark = breakpoint ? `-${breakpoint}` : '';
        settings.forEach((name) => {
          if (setting[name]) {
            sceneStyle[`--${name[0] + mark}`] = setting[name];
            if (breakpoint) {
              sceneClass.push(`crs-${name[0] + mark}`);
            }
          }
        });
      };
      sss(this.$props);
      const breakpoints = Object.keys(this.responsive);
      if (breakpoints.length) {
        breakpoints.forEach((breakpoint) => {
          sss(this.responsive[breakpoint], breakpoint);
        });
      }
      this.sceneStyle = sceneStyle;
      this.sceneClass = sceneClass;
    },
    setJsSettings() {
      this.clearBreakpoints();
      let breakpoints = Object.keys(this.responsive);
      if (breakpoints.length) {
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
    getSettings(breakpoints) {
      let settings;
      const { responsive, ...baseSettings } = JSON.parse(JSON.stringify(this.$props));
      if (breakpoints.length) {
        const current = breakpoints.filter(({ state }) => state);
        const responsiveSettings = current.map(({ name }) => responsive[name]);
        settings = Object.assign(baseSettings, ...responsiveSettings);
      } else {
        settings = baseSettings;
      }
      return settings;
    },
    setSettings({ justify, capacity, draggable }) {
      this.items = this.$slots.default;
      this.maxValue = this.getLimit({
        range: this.items.length,
        isCentered: justify.trim() === 'center',
        capacity: Number(capacity),
      });
      this.dragNDrop = (draggable === true) || (draggable.trim() === 'true');
    },
    clearBreakpoints() {
      this.breakpoints.forEach((breakpoint) => breakpoint.destroy());
    },
    getLimit({ isCentered, range, capacity }) {
      return isCentered ? range - 1 : range - capacity;
    },
  },
};
