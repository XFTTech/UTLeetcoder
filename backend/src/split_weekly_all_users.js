import fs from 'fs';
import { UserWeekly } from './entities.js'
const file_path = '../../frontend/public/data/';

const dateToWeek = (date) => {
    const year = date.getFullYear();
    const startYear = new Date(year, 0, 0);
    const diff = date - startYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    const week = Math.ceil(day / 7);
    return year + '-' + week;
}


export const splitWeeklyAllUsers = async (users) => {
    let user_all_daily = new Map();
    users.map(async (user) => {
        console.log(file_path + `daily_log/${user}.json`);
        const json = fs.readFileSync(file_path + `daily_log/${user}.json`, 'utf8');
        const obj = JSON.parse(json);
        const user_daily = new Map(Object.entries(obj));
        for (const [date, detail] of user_daily) {
            // if (user_all_daily.has(date)) {
            //     let orig_all_daily = user_all_daily.get(date);
            //     orig_all_daily.set(user, detail);
            // } else {
            //     let new_all_daily = new Map();
            //     new_all_daily.set(user, detail);
            //     user_all_daily.set(date, new_all_daily);
            // }
            // console.log(date)
            const day = new Date(date);
            // console.log(day)
            const week = dateToWeek(day);
            if (user_all_daily.has(week)) {
                let orig_all_daily = user_all_daily.get(week);
                orig_all_daily.set(user, detail);
            } else {
                let new_all_daily = new Map();
                new_all_daily.set(user, detail);
                user_all_daily.set(week, new_all_daily);
            }

        }
    });
    for (const [week, detail] of user_all_daily) {
        users.map(async (user) => {
            if (!detail.has(user)) {
                detail.set(user, new UserWeekly(user, 0, 0, 0, 0, [], [], []));
            }
        });
    }
    return user_all_daily;
}

// const today = new Date();
// console.log(today.toLocaleDateString("en-US", { timeZone: "America/New_York" }));
// console.log(today.toLocaleDateString("en-US", { timeZone: "Asia/Shanghai" }));
// const day = dateToWeek(today);
// console.log(day);


// const res = await splitWeeklyAllUsers(["zhuyuezx", "Ethan-ZYF", "Yorafa"]);
// console.log(res);