# UTLeetcoder

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
    - [ ] user profile page Modal of problem list with given difficulty
    - [ ] Change the header of each page
    - [ ] Better UI