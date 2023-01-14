import fs from 'fs';
import { UserDaily } from './entities.js';
const file_path = '../../frontend/public/data/';

const format_date = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return `${year}-${month}-${day}`;
}

const update_daily_log = async (user) => {
    const json = fs.readFileSync(file_path + `raw/${user}.json`, 'utf8');
    const user_raw = JSON.parse(json);
    let orig_logs = new Map();
    for (const value of user_raw.submissions) {
        let date = format_date(new Date(value.timestamp * 1000));
        if (orig_logs.has(date)) {
            orig_logs.get(date).push(value.titleSlug);
        } else {
            orig_logs.set(date, [value.titleSlug]);
        }
    }
    return orig_logs;
}

const difficulty_classify = async (orig_logs, user) => {
    const json = fs.readFileSync(file_path + 'problems.json', 'utf8');
    const obj = JSON.parse(json);
    const problems = new Map(Object.entries(obj));
    let difficulty_logs = new Map();
    for (const [key, value] of orig_logs) {
        let easy = [], medium = [], hard = [];
        for (const problem of value) {
            if (problems.get(problem) === "Easy") {
                easy.push(problem);
            } else if (problems.get(problem) === "Medium") {
                medium.push(problem);
            } else {
                hard.push(problem);
            }
        }
        let easy_cnt = easy.length, medium_cnt = medium.length, hard_cnt = hard.length;
        let total_cnt = easy_cnt + medium_cnt + hard_cnt;
        difficulty_logs.set(key, new UserDaily(user, total_cnt, easy_cnt, medium_cnt, hard_cnt, easy, medium, hard));
    }
    return difficulty_logs;
}

export const getDailyLogs = async (user) => {
    // let orig_logs = new Map();
    // if (fs.existsSync(`../data/daily_log/${user}.json`)) {
    //     const json = fs.readFileSync(`../data/daily_log/${user}.json`, 'utf8');
    //     const obj = JSON.parse(json);
    //     orig_logs = new Map(Object.entries(obj));
    // }
    const orig_logs = await update_daily_log(user);
    let difficulty_logs = await difficulty_classify(orig_logs, user);
    return difficulty_logs;
}

 await getDailyLogs("zhuyuezx");