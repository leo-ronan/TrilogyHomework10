const fs = require("fs");
const path = require("path");
const employee = require("./employees.js");
const templateDir = path.resolve(__dirname, "../position-templates");

const render = employees => {
    const html = [];

    html.push(...employees
        .filter(employee => employee.setRole() === "Manager")
        .map(manager => renderManager(manager))
    );
    html.push(...employees
        .filter(employee => employee.setRole() === "Engineer")
        .map(engineer => renderEngineer(engineer))
    );
    html.push(...employees
        .filter(employee => employee.setRole() === "Intern")
        .map(intern => renderIntern(intern))
    );
    return renderIndex(html.join(""));
};

const renderManager = manager => {
    let template = fs.readFileSync(path.resolve(templateDir, "managers.html"), "utf8");
    template = fillCard(template, "role", manager.setRole());
    template = fillCard(template, "id", manager.setId());
    template = fillCard(template, "name", manager.setName());
    template = fillCard(template, "email", manager.setEmail());
    template = fillCard(template, "officeNumber", manager.setOfficeNumber());
    return template;
};

const renderEngineer = engineer => {
    let template = fs.readFileSync(path.resolve(templateDir, "engineers.html"), "utf8");
    template = fillCard(template, "role", engineer.setRole());
    template = fillCard(template, "id", engineer.setId());
    template = fillCard(template, "name", engineer.setName());
    template = fillCard(template, "email", engineer.setEmail());
    template = fillCard(template, "github", engineer.setGithubUser());
    return template;
};
  
const renderIntern = intern => {
    let template = fs.readFileSync(path.resolve(templateDir, "interns.html"), "utf8");
    template = fillCard(template, "role", intern.setRole());
    template = fillCard(template, "id", intern.setId());
    template = fillCard(template, "name", intern.setName());
    template = fillCard(template, "email", intern.setEmail());
    template = fillCard(template, "school", intern.setCollege());
    return template;
};

const renderIndex = html => {
    const template = fs.readFileSync(path.resolve(templateDir, "indexMain.html"), "utf8");
    return fillCard(template, "team", html);
};

const fillCard = (template, placeholder, value) => {
    const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
    return template.replace(pattern, value);
};

module.exports = render;