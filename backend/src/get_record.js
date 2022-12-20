import axios from 'axios';
import fs from 'fs';
import { RecentAcSubmissionList, UserRecentSubmissionList } from './entities.js';


const apiClient = axios.create({
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
    baseURL: 'https://leetcode.com',
    timeout: 10000
})

const getRecentSubmission = async (username) => {
    // console.log(username)
    const query = `{recentAcSubmissionList(username: "${username}", limit: 20) {id title titleSlug timestamp}}`
    return await apiClient.get("graphql?query=" + query);
}

export const getRecentSubmissionList = async (user) => {
    let recentSubmissionList = new UserRecentSubmissionList(user);
    await getRecentSubmission(user)
        .then((res) => {
            // console.log(res.data.data.recentAcSubmissionList);
            res.data.data.recentAcSubmissionList.forEach((submission) => {
                recentSubmissionList.submissions.push(new RecentAcSubmissionList(submission.id, submission.title, submission.titleSlug, submission.timestamp));
            });
        })
        .catch((err) => {
            console.error(err);
        });
    return recentSubmissionList;
}