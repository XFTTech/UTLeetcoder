import axios from 'axios';
import fs from 'fs';
import { RecentAcSubmissionList, UserRecentSubmissionList } from './entities.js';
import { getSubmission } from './last_submission.js';
const file_path = '../../frontend/public/data/';

const startTimestamp = new Date('2022-12-16').getTime() / 1000;

const apiClient = axios.create({
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
    baseURL: 'https://leetcode.com',
    timeout: 30000
})

export const getRecentSubmission = async (username) => {
    // console.log(username)
    const query = `{recentAcSubmissionList(username: "${username}", limit: 20) {id title titleSlug timestamp}}`
    return await apiClient.get("graphql?query=" + query);
}

export const getRecentSubmissionList = async (user) => {
    var recentSubmissionList = new UserRecentSubmissionList(user);
    if (fs.existsSync(file_path + `raw/${user}.json`)) {
        // console.log('exist');
        const json = fs.readFileSync(file_path + `raw/${user}.json`, 'utf8');
        const obj = JSON.parse(json);
        recentSubmissionList.submissions = obj.submissions;
    }
    let last_submission = await getSubmission(user);
    await getRecentSubmission(user)
        .then((res) => {
            // console.log(res.data.data.recentAcSubmissionList);
            res.data.data.recentAcSubmissionList.forEach((submission) => {
                if (last_submission.get(submission.titleSlug) === 0
                    && submission.timestamp > startTimestamp
                ) {
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