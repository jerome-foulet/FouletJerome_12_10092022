export class PerformanceDatas {
  constructor(performanceDatas) {
    this.performanceDatas = performanceDatas;
  }

  format() {
    const { kind, data } = this.performanceDatas;
    return { kind, data };
  }
}
