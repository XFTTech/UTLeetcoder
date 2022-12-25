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
    constructor(date, questions = []) {
        this.date = date;
        this.questions = questions;
    }
}

export class UserHistory {
    // user: username(string)
    // logs: [DailyLog]
    constructor(user, logs = []) {
        this.user = user;
        this.logs = logs;
    }

    merge(log) {
        for (let i = 0; i < this.logs.length; i++) {
            if (this.logs[i].date === log.date) {
                this.logs[i].questions = this.logs[i].questions.concat(log.questions);
                return;
            }
        }
        // insert at corect data 
        for (let i = 0; i < this.logs.length; i++) {
            if (this.logs[i].date > log.date) {
                this.logs.splice(i, 0, log);
                return;
            }
        }
        this.logs.push(log);
    }
}

export class UserAllSubmission {
    // user: username(string)
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
    // user: username(string)
    // submissions: [recentAcSubmissionList]
    constructor(user, submissions = []) {
        this.user = user;
        this.submissions = submissions;
    }
}