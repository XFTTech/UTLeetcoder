import { getDailyLogs } from './get_daily_logs.js';
import { getRecentSubmissionList } from './get_record.js';
import { splitDailyAllUsers } from './split_daily_all_users.js';
import { splitWeeklyAllUsers } from './split_weekly_all_users.js';
import fs from 'fs';
const file_path = '../../frontend/public/data/';

const writeData = async (path, data) => {
    // classify data as map
    fs.writeFileSync(path, data);
}

const update_submission = async (user) => {
    await getRecentSubmissionList(user)
        .then(async (res) => {
            await writeData(file_path + `raw/${user}.json`,
                JSON.stringify(res[0]));
            await writeData(file_path + `last_submission/${user}.json`,
                JSON.stringify(Object.fromEntries(res[1])));
            console.log(`${user} getRecentSubmissionList complete`)
        })
        .catch((err) => {
            console.error(err);
        });
}

const update_daily_log = async (user) => {
    await getDailyLogs(user)
        .then(async (res) => {
            await writeData(file_path + `daily_log/${user}.json`,
                JSON.stringify(Object.fromEntries(res)));
            console.log(`${user} getDailyLogs complete`)
        })
        .catch((err) => {
            console.error(err);
        });
}

const split_daily_all_users = async (users) => {
    // console.log('start split_daily');
    const user_all_daily = await splitDailyAllUsers(users);
    for (const date of user_all_daily.keys()) {
        await writeData(file_path + `daily_stats/${date}.json`,
            JSON.stringify(Object.fromEntries(user_all_daily.get(date))));
    }
    console.log('split_daily complete');
}

// const split_weekly_all_users = async (users) => {
//     // console.log('start split_weekly');
//     const user_all_weekly = await splitWeeklyAllUsers(users);
//     for (const week of user_all_weekly.keys()) {
//         const str_week = week.toString();
//         if (str_week.length === 1) {
//             str_week = '0' + str_week;
//         }
//         await writeData(file_path + `weekly_stats/week-${str_week}.json`,
//             JSON.stringify(Object.fromEntries(user_all_weekly.get(week))));
//     }
//     console.log('split_weekly complete');
// }

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
