import { getRecentSubmissionList } from './get_record.js';
import fs from 'fs';
import { DailyLog, UserHistory, UserAllSubmission } from './entities.js';

const main = async () => {
    const users = JSON.parse(fs.readFileSync('../data/leetcoder_ids.json', 'utf8'));
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
            });
    });
}

main();

