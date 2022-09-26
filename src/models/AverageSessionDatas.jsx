export class AverageSessionDatas {
  constructor(averageSessionDatas) {
    this.averageSessionDatas = averageSessionDatas;
  }

  /**
   * @returns The formated averageSessionDatas object
   */
  format() {
    const { sessions } = this.averageSessionDatas;
    return { sessions };
  }
}
