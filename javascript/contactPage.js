const openContactPage = function () {
    clearMain();
    const contactPageHTML = `
    <section class="section--contact-page">
        <div class="banner">
            <h1 class="contact-header">Contact Us</h1>
            <p class="banner-text">Questions, bug reports, feedback, feature requests -- Let us know!</p>
        </div>
        <form class="contact-form" id="contact-form">

            <label for="contact-form-input__email">Email Address</label>
            <input type="email"/ class="contact-form-input__email">
            <label for="contact-form-input__subject">Subject</label>
            <input type="text"/ class="contact-form-input__content">
            <label for="contact-form-input__content">How can we help?</label>
            <textarea form="contact-form" rows="10" class="contact-form-input__content"></textarea>

            <button class="contact-form__button">Send</button>
        </form>

    </section>
    `
    document.querySelector('main').insertAdjacentHTML('afterbegin', contactPageHTML);
    document.querySelector('.contact-form').addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('submit form');
    })
}
