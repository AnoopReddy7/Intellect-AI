let jobs = [];

function loadJobs() {
    jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    displayJobs(jobs);
}

function displayJobs(jobsToShow) {
    const jobsContainer = document.getElementById("jobs-container");
    jobsContainer.innerHTML = "";

    jobsToShow.forEach(job => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = job.id;
        card.innerHTML = `
            <h3>${job.companyName}</h3>
            <p>Role: ${job.jobRole}</p>
            <p>Details: ${job.companyDetails}</p>
            <p>Email: ${job.companyEmail}</p>
        `;
        jobsContainer.appendChild(card);
    });
}

window.addEventListener("load", loadJobs);
