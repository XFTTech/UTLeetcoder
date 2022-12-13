# UTLeetcoder

## Get from leetcode api
- url: https://leetcode.com/graphql
- schema:
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

## TODO
- [ ] accounts endpoints
    - [ ] login
    - [ ] logout
    - [ ] register
    - [ ] 