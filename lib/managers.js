const employee = require("./employees");

class managers extends employee {
    constructor(id, name, email, officeNumber) {
        super(id, name, email);
        this.officeNumber = officeNumber;
    }

    setOfficeNumber() {
        return this.officeNumber;
    }

    setRole() {
        return "Manager";
    }
};
module.exports = managers;