import { UserProblem } from './entities.js';
import fs from 'fs';
import axios from 'axios';
const file_path = '../../frontend/public/data/';

export const getSubmission = async (username) => {
    // determine if username.json exists
    // if not, create a new one
    // if yes, read the file and update the map

    if (!fs.existsSync(file_path + `last_submission/${username}.json`)) {
        const json = fs.readFileSync(file_path + `problems.json`, 'utf8');
        const obj = JSON.parse(json);
        const map = new Map(Object.entries(obj));
        map.forEach((value, key) => {
            map.set(key, 0);
        });
        return map;
    } else {
        const json = fs.readFileSync(file_path + `last_submission/${username}.json`, 'utf8');
        const obj = JSON.parse(json);
        const map = new Map(Object.entries(obj));
        return map;
    }
}
