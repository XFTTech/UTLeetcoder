import fs from 'fs';

export const splitDailyAllUsers = async (users) => {
    let user_all_daily = new Map();
    users.map(async (user) => {
        const json = fs.readFileSync(`../data/daily_log/${user}.json`, 'utf8');
        const obj = JSON.parse(json);
        // console.log(obj);
        const user_daily = new Map(Object.entries(obj));
        for (const [date, detail] of user_daily) {
            if (user_all_daily.has(date)) {
                let orig_all_daily = user_all_daily.get(date);
                orig_all_daily.set(user, detail);
            } else {
                let new_all_daily = new Map();
                new_all_daily.set(user, detail);
                user_all_daily.set(date, new_all_daily);
            }
        }
    });
    // console.log(user_all_daily);
    return user_all_daily;
}

splitDailyAllUsers(["zhuyuezx", "Ethan-ZYF", "Yorafa"]);