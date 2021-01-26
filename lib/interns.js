const employee = require("./employees");

class interns extends employee {
    constructor(id, name, email, college) {
        super(id, name, email);
        this.college = college;
    }

    setCollege() {
        return this.college;
    }

    setRole() {
        return "Intern";
    }
};
module.exports = interns;