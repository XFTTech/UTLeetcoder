import { getRecentSubmissionList } from './get_record.js';
import fs from 'fs';
const users = ['Ethan-ZYF', 'zhuyuezx', 'Yorafa']

const main = async () => {
    users.map((user) => {
        getRecentSubmissionList(user)
            .then((res) => {
                // write to file users[i].json
                fs.writeFile(`../data/raw/${user}.json`, JSON.stringify(res), (err) => {
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

