const employee = require('./employees');

class engineer extends employee {
    constructor(id, name, email, github) {
        super(id, name, email);
        this.github = github;
    }

    setGithubUser() {
        return this.github;
    }

    setRole() {
        return "Engineer";
    }
};
module.exports = engineer;