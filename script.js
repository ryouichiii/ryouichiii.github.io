const toggleButton = document.getElementById('toggle-button');
const sidebar = document.getElementById('sidebar');
const mobileMq = window.matchMedia('(max-width:800px)');
const currentYear = new Date().getFullYear();
const yearElement = document.getElementById('year');
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');
const body = document.body;
const savedSidebar = localStorage.getItem('sidebarClosed');

/* Grab current year */
yearElement.textContent = currentYear;

/* Preloader */
var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
    var s = loader.style;
    s.opacity = 1;
    /*  */
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

/* Apply saved sidebar state on desktop */
if (savedSidebar === 'true' && !(window.matchMedia && window.matchMedia('(max-width:800px)').matches)) {
    sidebar.classList.add('close');
    toggleButton.classList.add('rotate');
}

/* Sidebar toggle function */
function toggleSidebar() {
    /* Toggle animation */
    sidebar.classList.add('animate')
    void sidebar.offsetWidth
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')

    /* Close open submenus when closing sidebar */
    closeAllSubMenus()
    /* Persist sidebar state */
    localStorage.setItem('sidebarClosed', sidebar.classList.contains('close') ? 'true' : 'false');
}
/* Dropdown function */
function toggleSubMenu(button) {

    /* Close any other open menus */
    if(!button.nextElementSibling.classList.contains('show'))
        closeAllSubMenus()

    button.nextElementSibling.classList.toggle('show')
    button.classList.toggle('rotate')

    /* Open Sidebar if closed (Desktop) */
    if (window.matchMedia && window.matchMedia('(min-width:800px)').matches) {
        if (sidebar.classList.contains('close')) {
            /* Toggle animation (the sequel) */
            sidebar.classList.add('animate')
            void sidebar.offsetWidth
            sidebar.classList.toggle('close')
            toggleButton.classList.toggle('rotate')
            /* Persist sidebar state when opening via dropdown */
            localStorage.setItem('sidebarClosed', sidebar.classList.contains('close') ? 'true' : 'false');
        }
    }
}
/* Close menu function */
function closeAllSubMenus() {
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show')
        ul.previousElementSibling.classList.remove('rotate')
    })
}
/* Re-open sidebar when switching to mobile view */
function handleMobileChange(e) {
    if (e.matches) {
        sidebar.classList.remove('close');
        toggleButton.classList.remove('rotate');
        /* Closes dropdown */
        closeAllSubMenus()
        /* Clear persisted closed state on mobile */
        localStorage.setItem('sidebarClosed', 'false');
        return;
    } else {
        /* When returning to desktop, reapply saved state */
        const saved = localStorage.getItem('sidebarClosed');
        if (saved === 'true') {
            sidebar.classList.add('close');
            toggleButton.classList.add('rotate');
        } else {
            sidebar.classList.remove('close');
            toggleButton.classList.remove('rotate');
        }
    }
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
/* Remove animation toggle */
sidebar.addEventListener('transitionend', function (e) {
    if (e.propertyName !== 'width') return
    sidebar.classList.remove('animate')
})