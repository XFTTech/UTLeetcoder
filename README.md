# UTLeetcoder

## Website
- [UTLeetcoder](https://coder.xfttech.org/)
- [Daily Log](https://coder.xfttech.org/select_daily)
- [Weekly Log](https://coder.xfttech.org/select_weekly)


## Get from leetcode api
- url: https://leetcode.com/graphql
- get user:
    ```graphql
    { matchedUser(username: "YOUR_USERNAME") {
        username
        submitStats: submitStatsGlobal {
                acSubmissionNum {
                    difficulty
                    count
                    submissions
                }
            }
        }
    }
    ```
- get recent list:
    ```graphql
    {
    recentAcSubmissionList(username: "Ethan-ZYF", limit: 50) {
        id
        title
        titleSlug
        timestamp
    }
    }
    ```
## More APIs
- [Leetcode API](LeetcodeAPI.md)

## TODO
- [ ] front end
    - [x] user profile page Modal of problem list with given difficulty
    - [ ] Change the header of each page
    - [ ] Better UI

## Instructions

To run this project locally, you should know we have two parts: backend and frontend.
- For backend, we write scripts to add users, problems and get users' submissions from leetcode api, all of those data will be stored in `./frontend/public/data` folder.
  - why we use `./frontend/public/data` folder? Because we use `create-react-app` to build our frontend, and it will put all the static files in `./frontend/public` folder, so we put all the data in `./frontend/public/data` folder.
- For frontend, we use data generate by backend to build a website to show the data.
- Since we split our project into two parts, you may need to run two times `npm install` to install the dependencies of each part (a.k.a run `npm install` in both folder).

If you want add new users, the easiest way is to modify `./backend/new_user.json` file, and then run `node add_user.js` to add new users (please notice, we use lots of relative path in our project, so you should go `./backend/src` folder to run most of our scripts).

If you want to get your data as soon as possible rather than auto script run on scheduled time, you can run `node index.js` to get all data of users that registered.

Ofc, don't forget to update problems list by running `node get_all_problems.js` in `./backend/src` folder, otherwise your submission of new problems may not be shown.


## Contribution

If you want to contribute to this project, please follow the instructions below:

1. Fork this repo
2. write your code
3. make a pull request
4. wait for review

## Issues

If you have any questions, please open an issue.
