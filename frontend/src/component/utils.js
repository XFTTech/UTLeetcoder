import axios from 'axios';

export const problemUrl = "https://leetcode.com/problems/"
export const userUrl = "https://leetcode.com/"

export const fileClient = axios.create({
    baseURL: './data',
    timeout: 30000
});

export const getUsers = async () => {
    return await fileClient.get("/leetcoder_ids.json");
};

export const getWeeks = async () => {
    return await fileClient.get("/weeks.json");
};

export const getDailyStats = async (date) => {
    return await fileClient.get("/daily_stats/" + date + ".json");
};

export const getWeeklyStats = async (week) => {
    return await fileClient.get("/weekly_stats/week-" + week + ".json");
};

export const getAllStats = async () => {
    return await fileClient.get("/alltime.json");
};

export const getUserInfo = async (lcid) => {
    return await fileClient.get("/user_info/" + lcid + ".json");
};

export const getUserDailyStats = async (lcid) => {
    return await fileClient.get("/daily_log/" + lcid + ".json");
};

export const userLoader = async () => {
    const users = (await getUsers()).data;
    return { users };
};

export const getUserImage = async (lcid) => {
    return await fileClient.get("/Creator/" + lcid + "/page.png");
};

export const getAllDate = async () => {
    return await fileClient.get("/dates.json");
};

export const getRelativeUrl = () => {
    return window.location.href.split('/')[1].split('?');
};

export const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
};

export const isMobile = () => {
    return getWindowDimensions().width < 768;
}