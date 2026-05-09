// 1. Responsive Hamburger Menu
const menuBtn = document.getElementById('menu-button');
const navMenu = document.getElementById('nav-menu');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuBtn.textContent = navMenu.classList.contains('open') ? 'X' : '☰';
});

// 2. Dynamic Footer Dates
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// 3. Course Array Data (Updated to mark WDD 231 as incomplete)
const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
];

// 4. Rendering and Filtering Functions
const courseList = document.getElementById('course-list');
const totalCreditsEl = document.querySelector('#total-credits span');

function renderCourses(filter = 'All') {
    courseList.innerHTML = '';
    let filteredCourses = courses;

    if (filter !== 'All') {
        filteredCourses = courses.filter(c => c.subject === filter);
    }

    // Output course cards
    filteredCourses.forEach(course => {
        const div = document.createElement('div');
        div.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
        div.textContent = `${course.subject} ${course.number}`;
        courseList.appendChild(div);
    });

    // Calculate total credits dynamically using reduce
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsEl.textContent = totalCredits;
}

// 5. Button Event Listeners
document.getElementById('all-btn').addEventListener('click', () => renderCourses('All'));
document.getElementById('cse-btn').addEventListener('click', () => renderCourses('CSE'));
document.getElementById('wdd-btn').addEventListener('click', () => renderCourses('WDD'));

// Initialize view
renderCourses();
