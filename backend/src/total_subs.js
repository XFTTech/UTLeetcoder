import axios from 'axios';
import fs from 'fs';
const file_path = '../../frontend/public/data/';



const apiClient = axios.create({
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
    baseURL: 'https://leetcode.com',
    timeout: 100000
})

export const getAllsubmissions = async (username) => {
    const query = `{ matchedUser(username: "${username}") {
        username
        profile {
            userAvatar
        }
        submitStats: submitStatsGlobal {
                acSubmissionNum {
                    difficulty
                    count
                }
            }
        }
        userContestRanking(username: "${username}") 
        {
            attendedContestsCount
            rating
            globalRanking
            totalParticipants
            topPercentage
        }
    }`
    return await apiClient.get("graphql?query=" + query);
}

export const getNumSubs = async (username) => {
    let totalSubs = 0;
    let contestRating = 1500;
    let avatar = "";
    await getAllsubmissions(username)
        .then((res) => {
            avatar = res.data.data.matchedUser.profile.userAvatar;
            res.data.data.matchedUser.submitStats.acSubmissionNum.forEach((submission) => {
                if (submission.difficulty === "All") {
                    totalSubs += submission.count;
                }
            });
            contestRating = res.data.data.userContestRanking ? res.data.data.userContestRanking.rating : 0;
        })
        .catch((err) => {
            console.error(err);
        });
    return { username, totalSubs, contestRating, avatar };
}

export const writeSubs = async (users) => {
    console.log('start writeSubs');
    // console.log(users);
    let totalSubs = new Map();
    for (const user of users) {
        const res = await getNumSubs(user);
        totalSubs.set(user, res);
    }
    fs.writeFileSync(file_path + `total_subs.json`, JSON.stringify(Object.fromEntries(totalSubs)));
}

// await writeSubs(["Ethan-ZYF", "Yorafa"]);
// const res = await getNumSubs("Roccay");
// console.log(res);