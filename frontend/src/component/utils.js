import axios from 'axios';

export const problemUrl = "https://leetcode.com/problems/"
export const userUrl = "https://leetcode.com/"

export const fileClient = axios.create({
    baseURL: '.',
    timeout: 10000
});

export const getUsers = async () => {
    return await fileClient.get("/data/leetcoder_ids.json");
};

export const getDailyStats = async (date) => {
    return await fileClient.get("/data/daily_stats/" + date + ".json");
};

export const getUserInfo = async (lcid) => {
    return await fileClient.get("../data/user_info/" + lcid + ".json");
}
