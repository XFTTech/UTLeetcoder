import { getRecentSubmissionList } from './get_record.js';
import fs from 'fs';
import { DailyLog, UserHistory, UserAllSubmission } from './entities.js';

const main = async () => {
    const users = JSON.parse(fs.readFileSync('../data/leetcoder_ids.json', 'utf8'));
    users.map((user) => {
        getRecentSubmissionList(user)
            .then((res) => {
                // write to file users[i].json
                // fs.writeFile(`../data/raw/${user}.json`, JSON.stringify(res), (err) => {
                //     if (err) {
                //         console.error(err);
                //     }
                // });
                let daily_map = {};
                // console.log(res.submissions[0])
                res.submissions.map((submission) => {
                    const date = new Date(submission.timestamp * 1000).toLocaleDateString();
                    if (date in daily_map) {
                        daily_map[date].push(submission.titleSlug);
                    } else {
                        daily_map[date] = [submission.titleSlug];
                    }
                });
                // console.log(daily_map);
                // create list of DailyLog
                let daily_logs = [];
                for (const date in daily_map) {
                    daily_logs.push(new DailyLog(date, daily_map[date]));
                }
                // console.log(daily_logs);
                fs.writeFile(`../data/daily_log/${user}.json`, JSON.stringify(daily_logs), (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            })
            .catch((err) => {
                console.error(err);
            });
    });
}

main();

