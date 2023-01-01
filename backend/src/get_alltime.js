import fs from 'fs';
import { UserAlltime } from './entities.js'
const file_path = '../../frontend/public/data/';


export const UserAlltimeStats = async (users) => {
    let user_alltime = new Map();
    users.map(async (user) => {
        const json = fs.readFileSync(file_path + `daily_log/${user}.json`, 'utf8');
        const obj = JSON.parse(json);
        const user_daily = new Map(Object.entries(obj));
        // console.log(user_daily, "here")
        let curr_user = new UserAlltime(user, 0, 0, 0, 0);
        for (const [date, detail] of user_daily) {
            curr_user.total += detail.total;
            curr_user.easy_cnt += detail.easy_cnt;
            curr_user.medium_cnt += detail.medium_cnt;
            curr_user.hard_cnt += detail.hard_cnt;
        }
        user_alltime.set(user, curr_user);
    });

    return user_alltime;
}

// const res = await UserAlltimeStats(["Ethan-ZYF"]);
// console.log(res);
