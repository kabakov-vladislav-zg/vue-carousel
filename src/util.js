// eslint-disable-next-line import/prefer-default-export
export class Breakpoint {
  constructor(name, value) {
    this.name = name;
    this.value = value;
    this.mql = window.matchMedia(`(min-width: ${value}px)`);
    this.mql.addEventListener('change', this);
    this.state = this.mql.matches;
  }

  handleEvent({ matches }) {
    this.state = matches;
  }

  destroy() {
    this.mql.removeEventListener('change', this);
  }
}
