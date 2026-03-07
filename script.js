const mobileMq = window.matchMedia('(max-width:800px)');
const currentYear = new Date().getFullYear();
const yearElement = document.getElementById('year');
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');
const body = document.body;
const terms = document.getElementById('terms');
const agree = document.getElementById('agree');
const images = document.querySelectorAll('.comm-container img');
const closePopup = document.getElementById('close-popup');
const popupContainer = document.getElementById('popup-container');
const popupImage = document.getElementById('popup-image');
const cloudLight = "./images/clouds.webp";
const cloudDark = "./images/clouds-dark.webp";
const cloudReplace = document.getElementsByClassName('cloudreplace');
let cloud = cloudLight;

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

/* Cloud animation theme swapping */
function updateCloud() {
    cloud = body.classList.contains('dark-mode') ? cloudDark : cloudLight;
    Array.from(cloudReplace).forEach(element => {
        element.src = cloud;
    });
}

/* Link images theme swapping */
function updateLinkImages() {
    const linkImages = document.querySelectorAll('.link-container img, .utau-container img');
    const isDarkMode = body.classList.contains('dark-mode');
    linkImages.forEach(img => {
        const src = img.src;
        if (isDarkMode) {
            // Switch to dark mode image
            img.src = src.replace(/\.webp$/, '-dark.webp');
        } else {
            // Switch back to light mode image
            img.src = src.replace(/-dark\.webp$/, '.webp');
        }
    });
}


/* Add listener for theme toggle */
themeToggle.addEventListener('click', () => {
    // Show preloader
    loader.style.display = 'flex';
    loader.style.opacity = '1';
    
    body.classList.toggle('dark-mode');
    /* Save theme prefs */
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.setItem('theme', '');
    }
    updateCloud(); // Changes clouds to specific theme
    updateLinkImages(); // Changes link images to specific theme
    
    // Hide preloader after images load
    const allImages = document.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = allImages.length;
    
    const hidePreloader = () => {
        var s = loader.style;
        var intervalId = setInterval(function(){
            s.opacity -= 0.1;
            if (s.opacity <= 0) {
                clearInterval(intervalId);
                loader.style.display = "none";
            }
        }, 40);
    };
    
    // If no images, hide immediately
    if (totalImages === 0) {
        hidePreloader();
        return;
    }
    
    allImages.forEach(img => {
        if (img.complete) {
            loadedCount++;
        } else {
            img.addEventListener('load', () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    hidePreloader();
                }
            });
            img.addEventListener('error', () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    hidePreloader();
                }
            });
        }
    });
    
    if (loadedCount === totalImages) {
        hidePreloader();
    }
});
/* Check for locally saved theme preference */
if (currentTheme) {
    body.classList.add(currentTheme);
}
updateCloud(); // Changes clouds to already saved theme
updateLinkImages(); // Changes link images to already saved theme

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

/* Close commission terms modal when agreed to */
agree.addEventListener('click', () => {
    terms.classList.add('agreed');
});

/* Image Preview Pop-up */
images.forEach((image, i) => {
    image.addEventListener('click', ()=> {
        imageOpened(`./images/comm/image${i+1}.webp`);
    });
});
closePopup.addEventListener('click', ()=> {
    popupContainer.style.opacity = '0';
    popupContainer.style.pointerEvents = 'none';
    popupImage.style.opacity = '0';
    popupImage.src = 0; /* Blanks source, so previous image isnt shown while the selected one loads */
});
function imageOpened(pic) {
    popupImage.style.opacity = '1';
    popupContainer.style.opacity = '1';
    popupContainer.style.pointerEvents = 'all';
    popupImage.src = pic;
};