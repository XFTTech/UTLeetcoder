import axios from 'axios';
import fs from 'fs';
const file_path = '../../frontend/public/data/';



const apiClient = axios.create({
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
    baseURL: 'https://leetcode.com',
    timeout: 100000
})

export const getAllsubmissions = async (username) => {
    const query = `{ matchedUser(username: "${username}") { username profile { userAvatar } submitStats: submitStatsGlobal { acSubmissionNum { difficulty count submissions }}}}`
    return await apiClient.get("graphql?query=" + query);
}

export const getNumSubs = async (username) => {
    let totalSubs = 0;
    let avatar = "";
    await getAllsubmissions(username)
        .then((res) => {
            avatar = res.data.data.matchedUser.profile.userAvatar;
            res.data.data.matchedUser.submitStats.acSubmissionNum.forEach((submission) => {
                if (submission.difficulty === "All") {
                    totalSubs += submission.count;
                }
            });
        })
        .catch((err) => {
            console.error(err);
        });
    return { totalSubs, avatar };
}

export const writeSubs = async (users) => {
    console.log('start writeSubs');
    // console.log(users);
    let totalSubs = new Map();
    for (const user of users) {
        const { totalSubs: nums, avatar } = await getNumSubs(user);
        totalSubs.set(user, { nums, avatar });
    }
    fs.writeFileSync(file_path + `total_subs.json`, JSON.stringify(Object.fromEntries(totalSubs)));
}

// writeSubs(["Ethan-ZYF", "Yorafa"]);