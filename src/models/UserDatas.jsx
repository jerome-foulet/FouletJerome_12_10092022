export class UserDatas {
  constructor(userDatas) {
    this.userDatas = userDatas;
  }

  format() {
    const { id, userInfos, todayScore, score, keyData } = this.userDatas;
    return { id, userInfos, score: (todayScore || score) * 100, keyData };
  }
}
