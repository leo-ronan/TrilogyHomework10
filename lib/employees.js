class employee {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    setId() {
        return this.id;
    }

    setName() {
        return this.name;
    }

    setEmail() {
        return this.email;
    }

    getRole() {
        return "Employee";
    }
};
module.exports = employee;