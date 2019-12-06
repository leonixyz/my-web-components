(() => {
  const css = `
    <style>
      * {
        box-sizing: border-box;
      }

      #overlay {
        position: fixed;
        z-index: 9;
        top: 0;
        left: 0;
        width:100%;
        height: 100%;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.8);
      }

      #close-overlay-icon {
        position: fixed; 
        top: 0;
        right: 0;
        padding: 1rem;
        color: #fff;
        font-size: 2rem;
        cursor: pointer;
      }

      #overlay-content {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
      }

      #overlay img {
        max-width: 100%;
        max-height: 100%;
      }
      
      .hidden {
        display: none;
      }

      .masonry { 
        column-count: auto;
        column-width: 320px;
        column-gap: 1rem;
      }

      .masonry img { 
        margin: 0.25rem 0;
        width:100%;
        transition: all .6s cubic-bezier(.17,.67,.3,.95);
        cursor: pointer;
      }

      .masonry img:hover {
        transform: scale(1.05);
        z-index: 1;
        box-shadow: 0px 5px 10px #000;
      }
    </style>
  `;

  const html = `
    <div id="overlay" class="hidden">
      <span id="close-overlay-icon">&times;</span>
      <div id="overlay-content">
      </div>
    </div>
  `;

  const template = document.createElement('template');
  template.innerHTML = css + html;


  // ****************************************************************************


  customElements.define('my-image-gallery',
    /**
     * An image gallery
     */
    class MyImageGallery extends HTMLElement {

      /**
       * Observed attributes
       */
      static get observedAttributes() {
        return [
          'images',
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

        // Get image list as an attribute
        this.images = JSON.parse(this.getAttribute('images')) || [];
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
        const overlay = this.shadowRoot.querySelector('#overlay');
        overlay.addEventListener('click', event => {
          overlay.classList.toggle('hidden');
        });

        const overlayContent = this.shadowRoot.querySelector('#overlay-content');
        const masonry = document.createElement('div');
        masonry.classList.add('masonry');

        this.images.forEach(img => {
          const i = document.createElement('img');
          i._src = img.preview;
          i.alt = img.alt;
          
          // add onclick callback
          i.addEventListener('click', event => {
            const largeImage = document.createElement('img');
            largeImage.src = img.url;
            largeImage.alt = img.alt;

            overlayContent.innerHTML = '';
            overlayContent.appendChild(largeImage);

            overlay.classList.toggle('hidden');
          });
          
          // implement lazy loading
          new IntersectionObserver(
            entries => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.src = entry.target._src;
                }
              });
            },
            {
              root: null,
              rootMargin: '500px',
              threshold: 0
            }
          ).observe(i);

          masonry.appendChild(i);
        });

        this.shadowRoot.appendChild(masonry);
      }
    }
  );
})();

