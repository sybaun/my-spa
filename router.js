let pageUrls = {
 about: '/index.html?about',
 contact:'/index.html?contact',
 gallery: '/index.html?gallery'
};

function OnStartUp() {
 popStateHandler();
}

OnStartUp();

document.querySelector('#about-link').addEventListener('click', (event) => {
 let stateObj = { page: 'about' };
 document.title = 'About';
 history.pushState(stateObj, "about", "?about");
 RenderAboutPage();
});
document.querySelector('#contact-link').addEventListener('click', (event) => {
 let stateObj = { page: 'contact' };
 document.title = 'Contact';
 history.pushState(stateObj, "contact", "?contact");
 RenderContactPage();
});
document.querySelector('#gallery-link').addEventListener('click', () => {
    let stateObj = { page: 'gallery' };
    document.title = 'Gallery';
    history.pushState(stateObj, "gallery", "?gallery");
    RenderGalleryPage();
});


function RenderAboutPage() {
 document.querySelector('main').innerHTML = `
 <h1 class="title">About Me</h1>
 <p>This is the about me page.</p>
 <p>I am a web developer with a passion for creating beautiful and functional websites.</p>
 <p>I have experience in HTML, CSS, JavaScript, and various frameworks.</p>
 <p>I love learning new technologies and improving my skills.</p>`;
}

function RenderContactPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">Contact</h1>
        <p>If you want to contact me, please fill out the form below:</p>
        <form id="contact-form">
            <input type="text" id="name" placeholder="Name">
            <input type="email" id="email" placeholder="Email">
            <textarea id="message" placeholder="Message"></textarea>

            <div class="g-recaptcha" data-sitekey="TWOJ_SITE_KEY"></div>

            <button type="submit">Send</button>
        </form>
    `;

    document.getElementById('contact-form').addEventListener('submit', validateForm);
}


function RenderGalleryPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">Gallery</h1>
        <p>This gallery demonstrates pictures took by me.</p>
        <p>Click on an image to view it in a modal.</p>
        <div class="gallery">
            ${Array.from({ length: 9 }).map((_, i) => `
                <img 
                    src="images/${i+1}.jpg" 
                    class="gallery-img lazy"
                    height="300" width="300"
                />
            `).join('')}
        </div>

        <div id="modal" class="modal">
            <span id="close-modal">X</span>
            <img id="modal-img">
        </div>
    `;

    initLazyLoading();
    initModal();
}



function popStateHandler() {
 let loc = window.location.href.toString().split(window.location.host)[1];
 if (loc === pageUrls.contact){ RenderContactPage(); }
 if(loc === pageUrls.about){ RenderAboutPage(); }
 if (loc === pageUrls.gallery) { RenderGalleryPage(); }
}
window.onpopstate = popStateHandler; 



document.getElementById('theme-toggle').addEventListener('click', () => {
 document.body.classList.toggle('dark-mode');
});

function initLazyLoading() {
    const images = document.querySelectorAll('.lazy');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fetch(entry.target.dataset.src)
                    .then(res => res.blob())
                    .then(blob => {
                        entry.target.src = URL.createObjectURL(blob);
                    });
                observer.unobserve(entry.target);
            }
        });
    });

    images.forEach(img => observer.observe(img));
}

function initModal() {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');

    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImg.src = img.src;
        });
    });

    document.getElementById('close-modal').onclick = () => {
        modal.style.display = 'none';
    };

    modal.onclick = (e) => {
        if (e.target === modal) modal.style.display = 'none';
    };
}

function validateForm(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name) {
        document.getElementById('name').classList.add("input-error");
        return;
    }
    if (!email) {
        document.getElementById('email').classList.add('input-error');
        return;
    }
    if (!message) {
        document.getElementById('message').classList.add('input-error');
        return;
    }


    if (!email.includes('@')) {
        document.getElementById('email').classList.add('input-error');
        return;
    }
    alert('Formularz wysłany poprawnie');
    
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';

    document.getElementById('email').classList.remove('input-error');
    document.getElementById('name').classList.remove('input-error');
    document.getElementById('message').classList.remove('input-error');
    
}

