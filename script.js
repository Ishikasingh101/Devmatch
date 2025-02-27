document.getElementById("devForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let selectedSkills = [];
    document.querySelectorAll(".skills input:checked").forEach(checkbox => {
        selectedSkills.push(checkbox.value);
    });

    let experience = document.getElementById("experience").value;
    let role = determineRole(selectedSkills, experience);
    
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<h2>Your Ideal Role:</h2> <p>${role}</p><p>${getRoleDescription(role)}</p>`;
    resultDiv.classList.add("show-results");

    let resourcesDiv = document.getElementById("resources");
    resourcesDiv.innerHTML = getLearningResources(role);
    resourcesDiv.classList.add("show-results");

    setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: "smooth" });
    }, 200);
});

function determineRole(skills, experience) {
    if (skills.includes("Frontend") && skills.includes("Backend")) {
        return "Full Stack Developer";
    } else if (skills.includes("Frontend")) {
        return "Frontend Developer";
    } else if (skills.includes("Backend")) {
        return "Backend Developer";
    } else {
        return "Keep Learning! You're on the right path.";
    }
}

function getRoleDescription(role) {
    switch(role) {
        case "Frontend Developer":
            return "You will design beautiful UI/UX and work on responsive web applications using HTML, CSS, and JavaScript.";
        case "Backend Developer":
            return "You will handle server logic, databases, and APIs using Node.js, SQL, or MongoDB.";
        case "Full Stack Developer":
            return "You will work on both frontend and backend, handling everything from UI to database management.";
        default:
            return "Keep learning and exploring different technologies to find your perfect role!";
    }
}

function getLearningResources(role) {
    switch(role) {
        case "Frontend Developer":
            return "<h3>Recommended Resources:</h3><ul><li><a href='https://www.freecodecamp.org' target='_blank'>FreeCodeCamp</a></li><li><a href='https://developer.mozilla.org/' target='_blank'>MDN Web Docs</a></li></ul>";
        case "Backend Developer":
            return "<h3>Recommended Resources:</h3><ul><li><a href='https://nodejs.org/en/' target='_blank'>Node.js Official Docs</a></li><li><a href='https://expressjs.com/' target='_blank'>Express.js Docs</a></li></ul>";
        case "Full Stack Developer":
            return "<h3>Recommended Resources:</h3><ul><li><a href='https://fullstackopen.com/en/' target='_blank'>Full Stack Open</a></li><li><a href='https://www.theodinproject.com/' target='_blank'>The Odin Project</a></li></ul>";
        default:
            return "<h3>Keep Learning! Try platforms like <a href='https://www.codecademy.com/' target='_blank'>Codecademy</a> and <a href='https://www.udemy.com/' target='_blank'>Udemy</a>.</h3>";
    }
}
