document.getElementById("devForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let selectedSkills = [];
    document.querySelectorAll(".skills input:checked").forEach(checkbox => {
        selectedSkills.push(checkbox.value);
    });

    let experience = document.getElementById("experience").value;
    let role = determineRole(selectedSkills);

    let loadingDiv = document.getElementById("loading");
    let resultDiv = document.getElementById("result");
    let resourcesDiv = document.getElementById("resources");

    // Show loading before displaying result
    loadingDiv.classList.remove("hidden");
    resultDiv.classList.add("hidden");
    resourcesDiv.classList.add("hidden");

    setTimeout(() => {
        loadingDiv.classList.add("hidden");
        resultDiv.innerHTML = `<h2>Your Ideal Role:</h2> <p>${role}</p><p>${getRoleDescription(role)}</p>`;
        resultDiv.classList.remove("hidden");

        resourcesDiv.innerHTML = getLearningResources(role);
        resourcesDiv.classList.remove("hidden");

        // Save to LocalStorage
        localStorage.setItem("skills", JSON.stringify(selectedSkills));
        localStorage.setItem("experience", experience);
    }, 1000);
});

document.getElementById("clear-selection").addEventListener("click", function() {
    document.querySelectorAll(".skills input").forEach(input => input.checked = false);
    document.getElementById("result").classList.add("hidden");
    document.getElementById("resources").classList.add("hidden");
    localStorage.clear();
});

/** ✅ Fixed: Determine Role Properly */
function determineRole(skills) {
    const hasFrontend = skills.includes("Frontend");
    const hasBackend = skills.includes("Backend");

    if (hasFrontend && hasBackend) return "Full Stack Developer";
    if (hasFrontend) return "Frontend Developer";
    if (hasBackend) return "Backend Developer";

    return "Keep Learning! You're on the right path.";
}

/** ✅ Fixed: Get Role Description */
function getRoleDescription(role) {
    const descriptions = {
        "Frontend Developer": "You specialize in UI/UX, creating visually appealing and interactive web pages.",
        "Backend Developer": "You handle server-side logic, databases, and APIs, ensuring application functionality.",
        "Full Stack Developer": "You work on both frontend and backend, managing complete end-to-end development."
    };
    return descriptions[role] || "Keep learning and exploring different technologies!";
}

/** ✅ Fixed: Get Learning Resources */
function getLearningResources(role) {
    const resources = {
        "Frontend Developer": `
            <h3>Recommended Resources:</h3>
            <ul>
                <li><a href="https://www.freecodecamp.org" target="_blank">FreeCodeCamp</a></li>
                <li><a href="https://developer.mozilla.org/" target="_blank">MDN Web Docs</a></li>
                <li><a href="https://css-tricks.com/" target="_blank">CSS Tricks</a></li>
            </ul>`,
        "Backend Developer": `
            <h3>Recommended Resources:</h3>
            <ul>
                <li><a href="https://nodejs.org/en/" target="_blank">Node.js Official Docs</a></li>
                <li><a href="https://expressjs.com/" target="_blank">Express.js Docs</a></li>
                <li><a href="https://www.postgresql.org/docs/" target="_blank">PostgreSQL Docs</a></li>
            </ul>`,
        "Full Stack Developer": `
            <h3>Recommended Resources:</h3>
            <ul>
                <li><a href="https://fullstackopen.com/en/" target="_blank">Full Stack Open</a></li>
                <li><a href="https://www.theodinproject.com/" target="_blank">The Odin Project</a></li>
                <li><a href="https://www.freecodecamp.org/news/learn-full-stack-development/" target="_blank">Full Stack Guide</a></li>
            </ul>`
    };
    return resources[role] || `<h3>Keep Learning!</h3>
        <p>Try platforms like 
            <a href="https://www.codecademy.com/" target="_blank">Codecademy</a>, 
            <a href="https://www.udemy.com/" target="_blank">Udemy</a>, and 
            <a href="https://www.coursera.org/" target="_blank">Coursera</a>.
        </p>`;
}

/** ✅ Fixed: Live Skill Search */
document.getElementById("skill-search").addEventListener("input", function() {
    let input = this.value.toLowerCase();
    let skills = ["HTML", "CSS", "JavaScript", "Node.js", "SQL", "MongoDB", "React.js", "Express.js"];
    
    let matches = skills.filter(skill => skill.toLowerCase().includes(input));
    
    let suggestionsList = document.getElementById("suggestions");
    suggestionsList.innerHTML = matches.map(skill => `<li>${skill}</li>`).join('');

    // Enable click-to-add functionality
    document.querySelectorAll("#suggestions li").forEach(item => {
        item.addEventListener("click", function() {
            let skillValue = item.textContent;
            document.querySelectorAll(".skills input").forEach(checkbox => {
                if (checkbox.nextSibling.nodeValue.trim() === skillValue) {
                    checkbox.checked = true;
                }
            });
            document.getElementById("skill-search").value = "";
            suggestionsList.innerHTML = "";
        });
    });
});

/** ✅ Fixed: Load Saved Preferences */
window.onload = function() {
    let savedSkills = JSON.parse(localStorage.getItem("skills")) || [];
    let savedExperience = localStorage.getItem("experience");

    document.querySelectorAll(".skills input").forEach(input => {
        if (savedSkills.includes(input.value)) {
            input.checked = true;
        }
    });

    if (savedExperience) {
        document.getElementById("experience").value = savedExperience;
    }
};
