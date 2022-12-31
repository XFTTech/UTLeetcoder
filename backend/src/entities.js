export class IUser {
    constructor(lcid, wxid, fname, lname) {
        this.lcid = lcid;
        this.wxid = wxid;
        this.fname = fname;
        this.lname = lname;
        this.avatar = '';
    }
}

export class DailyLog {
    // date: str
    // userDaily: [UserDaily]
    constructor(date, userDaily = []) {
        this.date = date;
        this.userDaily = userDaily;
    }
}

export class UserDaily {
    // user: username(string)
    // total: int
    // easy_cnt: int
    // medium_cnt: int
    // hard_cnt: int
    // easy: [str]
    // medium: [str]
    // hard: [str]
    constructor(user, total = 0, easy_cnt = 0, medium_cnt = 0, hard_cnt = 0, easy = [], medium = [], hard = []) {
        this.user = user;
        this.total = total;
        this.easy_cnt = easy_cnt;
        this.medium_cnt = medium_cnt;
        this.hard_cnt = hard_cnt;
        this.easy = easy;
        this.medium = medium;
        this.hard = hard;
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
    constructor(user, submissions = []) {
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

export class Problem {
    constructor(difficulty, title, titleSlug) {
        this.title = title;
        this.titleSlug = titleSlug;
        this.difficulty = difficulty;
    }
}

export class AllProblemList {
    // problems: [Problem]
    constructor(problems = []) {
        this.problems = problems;
    }
}

export class UserProblem {
    // titleSlug: str
    // timestamp: int
    constructor(titleSlug, timestamp) {
        this.titleSlug = titleSlug;
        this.timestamp = timestamp;
    }
}