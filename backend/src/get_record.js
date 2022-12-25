import axios from 'axios';
import fs from 'fs';
import { RecentAcSubmissionList, UserRecentSubmissionList } from './entities.js';
import { getSubmission } from './last_submission.js';

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
    var recentSubmissionList = new UserRecentSubmissionList(user);
    if (fs.existsSync(`../data/raw/${user}.json`)) {
        const json = fs.readFileSync(`../data/raw/${user}.json`, 'utf8');
        const obj = JSON.parse(json);
        recentSubmissionList.submissions = obj.submissions;
    }
    let last_submission = await getSubmission(user);
    await getRecentSubmission(user)
        .then((res) => {
            // console.log(res.data.data.recentAcSubmissionList);
            res.data.data.recentAcSubmissionList.forEach((submission) => {
                if (last_submission.get(submission.titleSlug) === 0) {
                    recentSubmissionList.submissions.push(new RecentAcSubmissionList(submission.id, submission.title, submission.titleSlug, submission.timestamp));
                    last_submission.set(submission.titleSlug, submission.timestamp);
                    // console.log(`New submission: ${submission.titleSlug} ${submission.timestamp}`);
                }
            });
        })
        .catch((err) => {
            console.error(err);
        });
    return [recentSubmissionList, last_submission];
}