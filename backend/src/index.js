import { getDailyLogs } from './get_daily_logs.js';
import { getRecentSubmissionList } from './get_record.js';
import fs from 'fs';

const writeData = async (path, data) => {
    // classify data as map
    fs.writeFileSync(path, data);
}

const update_submission = async (user) => {
    await getRecentSubmissionList(user)
    .then(async (res) => {
        // console.log(res)
        await writeData(`../data/raw/${user}.json`, JSON.stringify(res[0]));
        await writeData(`../data/last_submission/${user}.json`, JSON.stringify(Object.fromEntries(res[1])));
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
        await writeData(`../data/daily_log/${user}.json`, JSON.stringify(Object.fromEntries(res)));
        console.log('write complete2')
    })
    .catch((err) => {
        console.error(err);
    });
}

const main = async () => {
    const users = JSON.parse(fs.readFileSync('../data/leetcoder_ids.json', 'utf8'));
    users.map(async (user) => {
        await update_submission(user);
        await update_daily_log(user);
    });
}

main();

