import fs from 'fs';
import { getSubmission } from './last_submission.js';

const update_daily_log = async (orig_logs, user) => {
    const user_submissions = await getSubmission(user);
    for (const [key, value] of user_submissions) {
        if (value === 0) continue;
        const complete_date = new Date(value * 1000).toLocaleDateString();
        if (orig_logs.has(complete_date)) {
            // check if there is duplicate
            if (!orig_logs.get(complete_date).includes(key)) {
                orig_logs.get(complete_date).push(key);
            }
        } else {
            orig_logs.set(complete_date, [key]);
        }
    }
    return orig_logs;
}

export const getDailyLogs = async (user, ret) => {
    let orig_logs = new Map();
    if (fs.existsSync(`../data/daily_log/${user}.json`)) {
        const json = fs.readFileSync(`../data/daily_log/${user}.json`, 'utf8');
        const obj = JSON.parse(json);
        orig_logs = new Map(Object.entries(obj));
    }
    // console.log("before");
    // console.log(orig_logs);
    orig_logs = await update_daily_log(orig_logs, user);
    // console.log("after");
    // console.log(orig_logs);
    return orig_logs;
}

// getDailyLogs("zhuyuezx");