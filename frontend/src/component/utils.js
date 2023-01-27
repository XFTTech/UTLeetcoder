import axios from 'axios';

export const problemUrl = "https://leetcode.com/problems/"
export const userUrl = "https://leetcode.com/"

export const fileClient = axios.create({
    baseURL: './data',
    timeout: 100000
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

export const getUserTotalSub = async () => {
    return await fileClient.get("/total_subs.json");
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
    return window.location.pathname;
};

export const getQuery = () => {
    return window.location.search;
};

export const isLocal = () => {
    return window.location.href.includes('localhost');
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

export const getLastUpdate = async () => {
    return await fileClient.get("/lastUpdate.json");
}

export const getProblemList = async () => {
    let tempClient = axios.create({
        baseURL: 'https://zerotrac.github.io/leetcode_problem_rating/data.json',
        timeout: 100000
    });
    return await tempClient.get();
}