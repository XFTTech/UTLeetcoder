const simpleGit = require("simple-git");
const git = simpleGit.default();

async function main() {
    try {
        const status = await git.status();
        
        await git.pull();

        await git.add(".");

        // commit with message
        await git.commit("Update");

        await git.push();

    } catch (error) {
        const status = await git.status();
        console.log("error happened");
        if (status.conflicted.length > 0) {
            return;
        }

        console.log(error);
    }
}

main();