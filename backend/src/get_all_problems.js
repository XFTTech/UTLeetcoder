import axios from 'axios';
import fs from 'fs';
import { Problem, AllProblemList } from './entities.js';
const file_path = '../../frontend/public/data/';


const apiClient = axios.create({
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
    baseURL: 'https://leetcode.com',
    timeout: 100000
})

const getNumProblems = async () => {
    const query = `{ 
    problemsetQuestionList: questionList(categorySlug: "", skip: 0, limit: 50, filters: {}) { total: totalNum }}`
    return await apiClient.get("graphql?query=" + query);
}

const getProblems = async (skip, limit) => {
    const query = `{
    problemsetQuestionList: questionList(categorySlug: "", skip: ${skip}, limit: ${limit}, filters: {}) {questions: data{ difficulty title titleSlug }}}`
    return await apiClient.get("graphql?query=" + query);
}

export const getAllProblems = async (user) => {
    const response = await getNumProblems();
    const total = response.data.data.problemsetQuestionList.total;

    let allProblemList = new AllProblemList();
    for (let i = 0; i < total; i += 50) {
        await getProblems(i, 50)
            .then((res) => {
                res.data.data.problemsetQuestionList.questions.forEach((problem) => {
                    allProblemList.problems.push(new Problem(problem.difficulty, problem.title, problem.titleSlug));
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const map = new Map();
    allProblemList.problems.forEach((problem) => {
        map.set(problem.titleSlug, problem.difficulty);
    });

    fs.writeFile(file_path + `problems.json`, JSON.stringify(Object.fromEntries(map)), (err) => {
        if (err) {
            console.error(err);
        }
    });
}

getAllProblems();