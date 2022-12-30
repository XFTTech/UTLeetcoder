import { getDailyLogs } from './get_daily_logs.js';
import { getRecentSubmissionList } from './get_record.js';
import { splitDailyAllUsers } from './split_daily_all_users.js';
import fs from 'fs';
const file_path = '../../frontend/public/data/';

const writeData = async (path, data) => {
    // classify data as map
    fs.writeFileSync(path, data);
}

const update_submission = async (user) => {
    await getRecentSubmissionList(user)
        .then(async (res) => {
            // console.log(res)
            await writeData(file_path + `raw/${user}.json`,
                JSON.stringify(res[0]));
            await writeData(file_path + `last_submission/${user}.json`,
                JSON.stringify(Object.fromEntries(res[1])));
            console.log('write complete1')
        })
        .catch((err) => {
            console.error(err);
        });
}

const update_daily_log = async (user) => {
    await getDailyLogs(user)
        .then(async (res) => {
            // console.log(res)
            await writeData(file_path + `daily_log/${user}.json`,
                JSON.stringify(Object.fromEntries(res)));
            console.log('write complete2')
        })
        .catch((err) => {
            console.error(err);
        });
}

const split_daily_all_users = async (users) => {
    console.log('start write3');
    const user_all_daily = await splitDailyAllUsers(users);
    for (const date of user_all_daily.keys()) {
        await writeData(file_path + `daily_stats/${date}.json`,
            JSON.stringify(Object.fromEntries(user_all_daily.get(date))));
    }
    console.log('write complete3');
}

const main = async () => {
    const users = JSON.parse(fs.readFileSync(file_path + 'leetcoder_ids.json', 'utf8'));
    let idx = users.length;
    await users.map(async (user) => {
        await update_submission(user);
        await update_daily_log(user);
        idx--;
        if (idx === 0) await split_daily_all_users(users);
    });
}

main();
