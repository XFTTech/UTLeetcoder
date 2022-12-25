import { getDailyLogs } from './get_daily_logs.js';
import fs from 'fs';

const main = async () => {
    const users = JSON.parse(fs.readFileSync('../data/leetcoder_ids.json', 'utf8'));
    const users_daily_logs = await getDailyLogs(users);
    console.log(users_daily_logs.size)
    console.log("after return");
    users.map((user) => {
        getRecentSubmissionList(user)
            .then((res) => {
                // console.log(res)
                fs.writeFile(`../data/raw/${user}.json`, JSON.stringify(res[0]), (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                fs.writeFile(`../data/last_submission/${user}.json`, JSON.stringify(Object.fromEntries(res[1])), (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            })
            .catch((err) => {
                console.error(err);
            }
        });
    });
}

main();

