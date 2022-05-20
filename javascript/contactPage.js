const openContactPage = function () {
  clearMain();
  const contactPageHTML = `
    <section class="section--contact-page">
        <div class="banner">
            <h1 class="contact-header">Contact Us</h1>
            <p class="banner-text">Questions, bug reports, feedback, feature requests -- Let us know!</p>
        </div>
        <form action="POST" data-netlify="true" class="contact-form" id="contact-form">

            <label for="contact-form-input__email">Email Address</label>
            <input name="email" type="email"/ class="contact-form-input__email">
            <label for="contact-form-input__subject">Subject</label>
            <input name="subject" type="text"/ class="contact-form-input__content">
            <label for="contact-form-input__content">How can we help?</label>
            <textarea name="message" form="contact-form" rows="10" class="contact-form-input__content"></textarea>
            <div class="recaptcha-box" data-netlify-recaptcha="true">
            </div>
            <button class="contact-form__button">Send</button>
        </form>

    </section>
    `;
  document
    .querySelector("main")
    .insertAdjacentHTML("afterbegin", contactPageHTML);
};
