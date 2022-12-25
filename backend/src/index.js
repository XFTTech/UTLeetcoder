import { getDailyLogs } from './get_daily_logs.js';
import fs from 'fs';

const main = async () => {
    const users = JSON.parse(fs.readFileSync('../data/leetcoder_ids.json', 'utf8'));
    const users_daily_logs = await getDailyLogs(users);
    console.log(users_daily_logs.size)
    console.log("after return");
    users.map((user) => {
        fs.writeFile(`../data/daily_log/${user}.json`, JSON.stringify(Object.fromEntries(users_daily_logs.get(user))), (err) => {
            if (err) {
                console.error(err);
            }
        });
    });
}

main();

