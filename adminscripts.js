const API_URL_EVENTS = 'http://localhost:63342/events';
const API_URL_JOBS = 'http://localhost:63342/jobs';

document.getElementById('event-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const event = {
        id: Date.now(), // Unique ID for each event
        name: document.getElementById('event-name').value,
        description: document.getElementById('event-description').value,
        location: document.getElementById('event-location').value,
        date: document.getElementById('event-date').value,
        contact: {
            email: document.getElementById('event-email').value,
            phone: document.getElementById('event-phone').value,
            website: document.getElementById('event-website').value,
        },
        type: document.getElementById('event-location').value ? 'offline' : 'online'
    };

    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));

    alert('Event added successfully');
    document.getElementById('event-form').reset();
    displayEvents(); // Refresh the events list
});

document.getElementById('job-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const job = {
        id: Date.now(), // Unique ID for each job
        companyName: document.getElementById('company-name').value,
        jobRole: document.getElementById('job-role').value,
        companyDetails: document.getElementById('company-details').value,
        companyEmail: document.getElementById('company-email').value,
    };

    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    jobs.push(job);
    localStorage.setItem('jobs', JSON.stringify(jobs));

    alert('Job added successfully');
    document.getElementById('job-form').reset();
    displayJobs(); // Refresh the jobs list
});

function displayEvents() {
    const eventsContainer = document.getElementById('events-container');
    const events = JSON.parse(localStorage.getItem('events')) || [];

    eventsContainer.innerHTML = events.map(event => `
        <div class="card" data-id="${event.id}">
            <h3>${event.name}</h3>
            <p>${event.description}</p>
            <p>${event.type === 'offline' ? 'Location: ' + event.location : ''}</p>
            <p>Date: ${event.date}</p>
            <p>Email: ${event.contact.email}</p>
            <p>Phone: ${event.contact.phone}</p>
            <p>Website: <a href="${event.contact.website}" target="_blank">${event.contact.website}</a></p>
            <button onclick="deleteEvent(${event.id})">Delete</button>
        </div>
    `).join('');
}

function displayJobs() {
    const jobsContainer = document.getElementById('jobs-container');
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    jobsContainer.innerHTML = jobs.map(job => `
        <div class="card" data-id="${job.id}">
            <h3>${job.companyName}</h3>
            <p>Role: ${job.jobRole}</p>
            <p>Details: ${job.companyDetails}</p>
            <p>Email: ${job.companyEmail}</p>
            <button onclick="deleteJob(${job.id})">Delete</button>
        </div>
    `).join('');
}

function deleteEvent(id) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events = events.filter(event => event.id !== id);
    localStorage.setItem('events', JSON.stringify(events));
    displayEvents(); // Refresh the events list
}

function deleteJob(id) {
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    jobs = jobs.filter(job => job.id !== id);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    displayJobs(); // Refresh the jobs list
}

document.addEventListener('DOMContentLoaded', () => {
    displayEvents();
    displayJobs();
});
