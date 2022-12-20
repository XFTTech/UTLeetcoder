export class IUser {
    // constructor() {
    //     this.lcid = null;
    //     this.wxid = null;
    //     this.firstName = null;
    //     this.lastName = null;
    // }

    constructor(userName, userId, homepage, wxid) {
        this.userName = userName;
        this.userId = userId;s
        this.homepage = homepage;
        this.wxid = null;
    }
}

export class DailyLog {
    // date: str
    // questions: [str]
    // reviews: [str]
    constructor(date, questions = [], reviews = []) {
        this.date = date;
        this.questions = questions;
        this.reviews = reviews;
    }
}

export class UserHistory {
    // user: IUser
    // logs: [DailyLog]
    constructor(user, logs = []) {
        this.user = user;
        this.logs = logs;
    }
}

export class UserAllSubmission {
    // user: IUser
    // submissions: {str: int}
    constructor(user, submissions = {}) {
        this.user = user;
        this.submissions = submissions;
    }
}