export class ActivityDatas {
  constructor(activityDatas) {
    this.activityDatas = activityDatas;
  }

  /**
   * @returns The formated activityDatas object
   */
  format() {
    const { sessions } = this.activityDatas;
    return { sessions };
  }
}
