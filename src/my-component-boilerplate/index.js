(() => {
  const css = `
      <style>
        /* Custom styles for this element in here. */
      </style>
  `;

  const html = `
    <!-- Template markup for this element in here. -->
    <slot name="my-slot">
      <!-- Template slot markup in here. -->
    </slot>
  `;

  const template = document.createElement('template');
  template.innerHTML = css + html;


  // ****************************************************************************


  customElements.define('my-component',
    /**
     * My Component
     */
    class MyComponent extends HTMLElement {

      /**
       * Observed attributes
       */
      static get observedAttributes() {
        // It should return an array containing the names of the
        // attributes you want to observe.
        return [
          'my-attribute',
        ];
      }

      
      /**
       * Setup custom element
       */
      constructor () {
        // Always call super() first in constructor.
        super();

        // Attach a shadow DOM - will be available as this.shadowRoot
        this.attachShadow({ mode: 'open' })
          .appendChild(template.content.cloneNode(true));

        // Implement element functionality in here.
        console.log('constructor');
      }


      /**
       * Invoked each time the custom element is appended into
       * a document-connected element. This will happen each time
       * the node is moved, and may happen before the element's
       * contents have been fully parsed. 
       * Any work that involved fetching resources or rendering
       * should be in here.
       */
      connectedCallback () {
        console.log('connectedCallback');
      }


      /*
       * Invoked each time the custom element is disconnected
       * from the document's DOM.
       */
      disconnectedCallback () {
        console.log('disconnectedCallback');
      }


      /*
       * Invoked each time the custom element is moved to a new document.
       */
      adoptedCallback () {
        console.log('adoptedCallback');
      }


      /*
       * Invoked each time one of the custom element's attributes
       * is added, removed, or changed. Which attributes to notice
       * change for is specified in a static get observedAttributes
       * method.
       */
      attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
      }
    }
  );
})();
