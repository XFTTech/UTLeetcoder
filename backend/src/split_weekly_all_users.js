import fs from 'fs';
import { UserWeekly } from './entities.js'
const file_path = '../../frontend/public/data/';

const formatDate = (date) => date + 'T05:00:00.000Z';

const dateToWeek = (date) => {
    const year = date.getFullYear();
    let firstMonday = new Date(year, 0, 0);
    while (firstMonday.getDay() !== 1) {
        firstMonday.setDate(firstMonday.getDate() + 1);
    }

    // console.log(firstMonday.toLocaleDateString("en-US", { timeZone: "America/New_York" }));
    // console.log(firstMonday.toLocaleTimeString("en-US", { timeZone: "America/New_York" }));
    const diff = date - firstMonday;
    if (diff < 0) {
        console.log('date is before first monday of the year')
        return year - 1 + '-52';
    }
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    const week = Math.floor(day / 7);
    if (week + 1 < 10) {
        return `${year}-0${week + 1}`;
    } else {
        return `${year}-${week + 1}`;
    }
}


export const splitWeeklyAllUsers = async (users) => {
    let user_all_daily = new Map();
    users.map(async (user) => {
        // console.log(file_path + `daily_log/${user}.json`);
        const json = fs.readFileSync(file_path + `daily_log/${user}.json`, 'utf8');
        const obj = JSON.parse(json);
        const user_daily = new Map(Object.entries(obj));
        // console.log(user_daily, "here")
        for (const [date, detail] of user_daily) {
            const fmtDay = formatDate(date);
            const day = new Date(fmtDay);
            const week = dateToWeek(day);

            if (!user_all_daily.has(week)) {
                user_all_daily.set(week, new Map());
            }
            let weekLog = user_all_daily.get(week);
            if (!weekLog.has(user)) {
                weekLog.set(user, new UserWeekly(user, 0, 0, 0, 0, [], [], []));
            }

            let userLog = weekLog.get(user);
            userLog.total += detail.total;
            userLog.easy_cnt += detail.easy_cnt;
            userLog.medium_cnt += detail.medium_cnt;
            userLog.hard_cnt += detail.hard_cnt;
            userLog.easy = userLog.easy.concat(detail.easy);
            userLog.medium = userLog.medium.concat(detail.medium);
            userLog.hard = userLog.hard.concat(detail.hard);

            weekLog.set(user, userLog);

            user_all_daily.set(week, weekLog);
            // console.log(user_all_daily, "there")
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

// const res = await splitWeeklyAllUsers(["Ethan-ZYF"]);
// console.log(res);
