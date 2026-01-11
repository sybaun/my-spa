let pageUrls = {
 about: '/index.html?about',
 contact:'/index.html?contact'
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

function RenderAboutPage() {
 document.querySelector('main').innerHTML = `
 <h1 class="title">About Me</h1>
 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
}
function RenderContactPage() {
 document.querySelector('main').innerHTML = `
 <h1 class="title">Contact with me</h1>
 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
}
function popStateHandler() {
 let loc = window.location.href.toString().split(window.location.host)[1];
 if (loc === pageUrls.contact){ RenderContactPage(); }
 if(loc === pageUrls.about){ RenderAboutPage(); }
}
window.onpopstate = popStateHandler; 

function RenderContactPage() {
 document.querySelector('main').innerHTML = `
 <h1 class="title">Contact with me</h1>
 <form id="contact-form">
 <label for="name">Name:</label>
 <input type="text" id="name" name="name" required>
 <label for="email">Email:</label>
 <input type="email" id="email" name="email" required>
 <label for="message">Message:</label>
 <textarea id="message" name="message" required></textarea>
 <button type="submit">Send</button>
 </form>`;

 document.getElementById('contact-form').addEventListener('submit', (event) => {
 event.preventDefault();
 alert('Form submitted!');
 });
}

document.getElementById('theme-toggle').addEventListener('click', () => {
 document.body.classList.toggle('dark-mode');
});
