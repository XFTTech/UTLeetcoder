# Leetcode API

By Network feature of chrome, we not hard to get the request and response of Leetcode API. Leetcode API is a GraphQL API, mainly have following features:
1. `matchedUser` query, which can get the user's information, including `submitStatsGlobal`, `tagProblemCounts` and so on.
2. `recentAcSubmissionList` query, which can get the user's recent accepted submissions.
3. `userContestRanking` query, which can get the user's contest ranking.
4. `userContestRankingHistory` query, which can get the user's contest ranking history.
5. `problemsetQuestionList` query, which can get the problem list just as the front page of [Leetcode Problem](https://leetcode.com/problemset/all/).
6. `topicTag` query, which can get the problem list of a specific tag, just as the tag page (e.g. [Leetcode arrary tag](https://leetcode.com/tag/array/)).
7. And any other query they ask cookies for authentication.



## URL Schema of Leetcode API (for axios)

```
?query=
{
    recentAcSubmissionList(username: "Yorafa") {
        id
        title
        titleSlug
        timestamp
    }
}
```

```
?query=
{ 
    matchedUser(username: "Yorafa") 
    {
        username
        submitStatsGlobal 
        {
            acSubmissionNum 
            {
                difficulty
                count
                submissions
            }
            totalSubmissionNum{
                difficulty
                count
                submissions
            }
        }
    }
}
```

```
?query=
{ 
    matchedUser(username: "Yorafa") 
    {
        username
        tagProblemCounts{
            advanced
            {
                tagName
                tagSlug
                problemsSolved
            }
            intermediate
            {
                tagName
                tagSlug
                problemsSolved
            }
            fundamental
            {
                tagName
                tagSlug
                problemsSolved
            }
        }
    }
}
```

```
?query=
{ 
    userContestRanking(username: "Yorafa") 
    {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
    }
}
```

```
?query=
{ 
    userContestRankingHistory(username: "Yorafa") 
        {
            attended
            trendDirection
            problemsSolved
            totalProblems
            finishTimeInSeconds
            rating
            ranking
            contest {
                title
                startTime
            }
        }
}
```

```
?query=
{ 
    problemsetQuestionList: questionList(categorySlug: "", skip: 0, filters: {}) 
    {
        total: totalNum
        questions: data{
            acRate
            difficulty
            freqBar
            isFavor
            status
            title
            titleSlug
        }
    }
}
```

```
?query=
{
    topicTag(slug: "array") 
    {
        name
        slug
        questions {
            status
            questionId
            title
            titleSlug
            difficulty
        }
    }
}
```

```
?query=
{
    activeDailyCodingChallengeQuestion {
        date
		userStatus
		link
		question {
			acRate
			difficulty
			freqBar
			frontendQuestionId: questionFrontendId
			isFavor
			paidOnly: isPaidOnly
			status
			title
			titleSlug
			hasVideoSolution
			hasSolution
			topicTags {
				name
				id
				slug
			}
		}
    }
}
```

## Use Fetch

If you are more familiar with fetch, you can use fetch to get the data from Leetcode API. The following is an example of using fetch to get the user's information.

```javascript
const init = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: QUERY }),
}
const response = await fetch('https://leetcode.com/graphql', init)
```

And for above `init` object, you can get `QUERY` just simply open your chrome/firefox or something else and inspect the network request of Leetcode. Then you will see the subsection `graphql/` in the network request, and you can get the `QUERY` from the `query` field in the request body from `Payload`.


