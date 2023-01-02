import fs from 'fs';
import { IUser } from './entities.js';
import axios from 'axios';
const file_path = '../../frontend/public/data/';
const new_user = '../new_user.json'

const apiClient = axios.create({
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
    baseURL: 'https://leetcode.com',
    timeout: 10000
})

const getAllLCID = () => {
    const json = fs.readFileSync(file_path + 'leetcoder_ids.json', 'utf8');
    // parse to a list
    return JSON.parse(json);
}
const getAvatar = async (username) => {
    const query = `{ matchedUser(username: "${username}") { profile { userAvatar } } }`
    return await apiClient.get("graphql?query=" + query);
}

const addUser = async () => {
    const json = fs.readFileSync(new_user, 'utf8');
    // parse to a object
    const obj = JSON.parse(json);
    const user = new IUser(obj.LEETCODE_ID, obj.wechat_id, obj.first_name, obj.last_name);
    const avatar = await getAvatar(user.lcid);
    user.avatar = avatar.data.data.matchedUser.profile.userAvatar;
    const id_list = getAllLCID();
    if (id_list.includes(user.lcid)) {
        console.log('User already exists');
    } else {
        console.log('User added');
        id_list.push(user.lcid);
    }
    fs.writeFileSync(file_path + '/user_info/' + user.lcid + '.json', JSON.stringify(user));
    fs.writeFileSync(file_path + 'leetcoder_ids.json', JSON.stringify(id_list));
}

addUser();