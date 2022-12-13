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

## TODO
- [ ] front end