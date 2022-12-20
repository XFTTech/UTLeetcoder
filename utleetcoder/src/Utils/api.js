import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://leetcode.com',
    timeout: 10000
})

export const getRecentSubmission = async (username) => {
    const query = `{recentAcSubmissionList(username: "${username}", limit: 20) {id title titleSlug timestamp}}`
    return await apiClient.get("graphql?query=" + query);
    // return await apiClient.get('/accounts/plans/');
}