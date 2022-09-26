export class PerformanceDatas {
  constructor(performanceDatas) {
    this.performanceDatas = performanceDatas;
  }

  /**
   * @returns The formated performanceDatas object
   */
  format() {
    const { kind, data } = this.performanceDatas;
    return { kind, data };
  }
}
