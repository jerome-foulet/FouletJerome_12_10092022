export class ActivityDatas {
  constructor(activityDatas) {
    this.activityDatas = activityDatas;
  }

  format() {
    const { sessions } = this.activityDatas;
    return { sessions };
  }
}
