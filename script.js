const mobileMq = window.matchMedia('(max-width:800px)');
const currentYear = new Date().getFullYear();
const yearElement = document.getElementById('year');
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');
const body = document.body;

/* Preloader */
var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
    var s = loader.style;
    s.opacity = 1;
    var intervalId = setInterval(function(){
        s.opacity -= 0.1;
        if (s.opacity <= 0) {
            clearInterval(intervalId);
            loader.style.display = "none";
        }
    }, 40);
});

/* Add listener for theme toggle */
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    /* Save theme prefs */
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.setItem('theme', '');
    }
});
/* Check for locally saved theme preference */
if (currentTheme) {
    body.classList.add(currentTheme);
}

/* Dropdown function */
function toggleSubMenu(button) {
    /* Close any other open menus */
    if(!button.nextElementSibling.classList.contains('show'))
        closeAllSubMenus()

    button.nextElementSibling.classList.toggle('show')
    button.classList.toggle('rotate')
}
/* Close menu function */
function closeAllSubMenus() {
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show')
        ul.previousElementSibling.classList.remove('rotate')
    })
}
/* Close dropdown when switching to mobile view */
function handleMobileChange(e) {
        closeAllSubMenus()
}

if (mobileMq.addEventListener) mobileMq.addEventListener('change', handleMobileChange);
else mobileMq.addListener(handleMobileChange);
handleMobileChange(mobileMq);
/* Open dropdown by default in /utau/ pages */
if (window.location && window.location.pathname && window.location.pathname.indexOf('/utau/') !== -1) {
    const sub = sidebar.querySelector('.sub-menu');
    if (sub) {
        sub.classList.add('show')
        const btn = sub.previousElementSibling
        if (btn && btn.classList && btn.classList.contains('dropdown-button')) btn.classList.add('rotate')
    }
}

/* Grab current year */
yearElement.textContent = currentYear;