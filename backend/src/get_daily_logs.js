import fs from 'fs';
import { getRecentSubmissionList } from './get_record.js';

export const getDailyLogs = async(users) => {
    // console.log(users)
    let users_daily_logs = new Map();
    await Promise.all(users.map(async (user) => {
        await getRecentSubmissionList(user)
            .then((res) => {
                // write to file users[i].json
                // fs.writeFile(`../data/raw/${user}.json`, JSON.stringify(res), (err) => {
                //     if (err) {
                //         console.error(err);
                //     }
                // });
                let daily_map = new Map();
                // console.log(res.submissions[0])
                res.submissions.map((submission) => {
                    const date = new Date(submission.timestamp * 1000).toLocaleDateString();
                    if (daily_map.has(date)) {
                        daily_map.get(date).push(submission.titleSlug);
                    } else {
                        daily_map.set(date, [submission.titleSlug]);
                    }
                });
                users_daily_logs.set(user, daily_map);
                console.log(users_daily_logs.size);
            })
            .catch((err) => {
                console.error(err);
            });
    }));
    return users_daily_logs;
}