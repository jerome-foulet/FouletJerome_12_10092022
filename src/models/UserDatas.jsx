export class UserDatas {
  constructor(userDatas) {
    this.userDatas = userDatas;
  }

  /**
   * @returns The formated userDatas object
   */
  format() {
    const { id, userInfos, todayScore, score, keyData } = this.userDatas;
    return { id, userInfos, score: (todayScore || score) * 100, keyData };
  }
}
