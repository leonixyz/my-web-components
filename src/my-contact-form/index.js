(() => {
  const css = `
    <style>
      * {
        box-sizing: border-box;
      }

      :host {
        position: fixed;
        z-index: 100;
        bottom: 0;
        right: 0;
        max-width: 20rem;
        padding: 0.5rem;
        margin: 0.5rem;
        background: #000;
        color: #fff;
        border-radius: 2rem;
        width: 3rem;
        height: 3rem;
        overflow: hidden;
        transition: all .6s cubic-bezier(.17,.67,.3,.95);
      }
      
      :host form {
        transition: all .6s cubic-bezier(.17,.67,.3,.95);
        opacity: 0;
      }

      :host(:hover) {
        width: 20rem;
        height: 18rem; 
        overflow: initial;
        border-radius: initial;
      }

      :host(:hover) form {
        opacity: 1;
      }

      .icon {
        width: 2rem;
        height: 2rem;
      }

      input, textarea, button {
        width: 100%;
        font-family: sans-serif;
        font-size: 1rem;
        border: 0;
        margin: .2rem 0;
      }

      input, textarea {
        background: #fff;
        color: #000;
      }

      textarea {
        height: 9.8rem;
      }

      button {
        background: #555;
        color: #fff;
        height: 2.5rem;
      }

      button:disabled {
        opacity: 0.5;
      }
    </style>`;

  const html = `
    <section>
      <svg version="1.1" class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 485.411 485.411" style="enable-background:new 0 0 485.411 485.411;" xml:space="preserve">
        <g>
          <path style="fill:#ffffff;" d="M0,81.824v321.763h485.411V81.824H0z M242.708,280.526L43.612,105.691h398.187L242.708,280.526z M163.397,242.649L23.867,365.178V120.119L163.397,242.649z M181.482,258.533l61.22,53.762l61.22-53.762L441.924,379.72H43.487 L181.482,258.533z M322.008,242.655l139.535-122.536v245.059L322.008,242.655z"/>
        </g>
      </svg>
      <form name="contact-form" method="POST" action="https://www.roman.bz.it/api/contact" class="hidden">
        <div class="form-field">
          <input type="text" name="subject" placeholder="Subject" required>
        </div>
        <div class="form-field">
          <textarea name="message" placeholder="Message" required></textarea>
        </div>
        <div class="form-field">
          <button name="submitBtn">Submit</button>
        </div>
      </form>
    </section>`;

  const template = document.createElement('template');
  template.innerHTML = css + html;


  // ****************************************************************************


  customElements.define('my-contact-form',
    /**
     * A contact form that POSTs to an API in order to send me an email.
     */
    class MyContactForm extends HTMLElement {

      /**
       * Observed attributes
       */
      static get observedAttributes() {
        return [
          'subject',
          'message',
          'submit',
          'delivered',
          'retry',
          'error'
        ];
      }


      /**
       * Setup custom element
       */
      constructor () {
        // usual stuff
        super();
        this.attachShadow({ mode: 'open' })
          .appendChild(template.content.cloneNode(true));

        // replace attribute values in template
        this.shadowRoot.querySelector('input').placeholder    = this.getAttribute('subject')   || 'Subject';
        this.shadowRoot.querySelector('textarea').placeholder = this.getAttribute('message')   || 'Message';
        this.shadowRoot.querySelector('button').innerText     = this.getAttribute('submit')    || 'Send';

        // handle form submission via AJAX
        const form = this.shadowRoot.querySelector('form');
        form.subjectLabel   = this.getAttribute('subject')   || 'Subject';
        form.messageLabel   = this.getAttribute('message')   || 'Message';
        form.submitLabel    = this.getAttribute('submit')    || 'Send';
        form.deliveredLabel = this.getAttribute('delivered') || 'Message delivered.';
        form.retryLabel     = this.getAttribute('retry')     || 'Please retry later.';
        form.errorLabel     = this.getAttribute('error')     || 'An error occurred.';
        form.addEventListener('submit', this.submit);
      }


      /**
       * Implement form submission via AJAX.
       */
      submit (event) {
        event.preventDefault();
        const form = event.target;

        const subject = form.subject.value;
        const message = form.message.value;
        if (!subject || !message) {
          return;
        }

        form.submitBtn.disabled = true;
        form.submitBtn.innerText = '...';
        
        fetch(form.action, {
          method: form.method,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            subject: subject,
            message: message
          })
        })
        .then(async response => {
          response = await response.json();
          let message;
          if (response && response.MessageId) {
            message = form.deliveredLabel;
          } else if (response && response.error) {
            message = `${response.error} ${form.retryLabel}`;
          } else {
            message = `${form.errorLabel} ${form.retryLabel}`;
          }

          form.innerHTML = `<p>${message}</p>`;

          return form;
        })
        .then(form => {
          setTimeout(() => {
            form.parentNode.innerHTML = html;
          }, 6000)
        });
      }
    }
  );
})();
