import axios from 'axios';
import fs from 'fs';
console.log("Hello World");
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
const userList = ['Ethan-ZYF', 'zhuyuezx', 'Yorafa'];

for (let i = 0; i < userList.length; i++) {
    getRecentSubmission(userList[i])
        .then((res) => {
            const user = userList[i];
            const data = res.data.data;
            //save to file
            fs.writeFile(`../data/${user}.json`, JSON.stringify(data), (err) => {
                if (err) {
                    console.error(err);
                }
            });
        })
        .catch((err) => {
            console.error(err);
        });
}