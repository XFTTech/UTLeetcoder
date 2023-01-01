import { UserProblem } from './entities.js';
import fs from 'fs';
import axios from 'axios';
const file_path = '../../frontend/public/data/';

export const getSubmission = async (username) => {
    // determine if username.json exists
    // if not, create a new one
    // if yes, read the file and update the map


    const json = fs.readFileSync(file_path + `problems.json`, 'utf8');
    const obj = JSON.parse(json);
    let map = new Map(Object.entries(obj));

    map.forEach((value, key) => {
        map.set(key, 0);
    });
    if (!fs.existsSync(file_path + `last_submission/${username}.json`)) {
        return map;
    }
    const user_json = fs.readFileSync(file_path + `last_submission/${username}.json`, 'utf8');
    const user_obj = JSON.parse(user_json);
    const user_submission = new Map(Object.entries(user_obj));
    user_submission.forEach((value, key) => {
        map.set(key, value);
    });
    return map;
}
