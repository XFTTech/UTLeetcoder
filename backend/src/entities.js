export class IUser {
    constructor(userName, userId, homepage, wxid) {
        this.userName = userName;
        this.userId = userId;
        this.homepage = homepage;
        this.wxid = wxid;
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

export class RecentAcSubmissionList {
    // id: int
    // title: str
    // titleSlug: str
    // timestamp: int
    constructor(id, title, titleSlug, timestamp) {
        this.id = id;
        this.title = title;
        this.titleSlug = titleSlug;
        this.timestamp = timestamp;
    }
}

export class UserRecentSubmissionList {
    // user: IUser
    // submissions: [recentAcSubmissionList]
    constructor(user, submissions = []) {
        this.user = user;
        this.submissions = submissions;
    }
}