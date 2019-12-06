# WIP: My Web Components

My collection of web components. This repo is still a work in progress.

## Setup

1. `git clone`
2. `npm install`
3. `npx webpack`
4. include resulting **main.js** in your webpage

## Components

### Contact form

```
<my-contact-form
  subject="Vostra email o nr. di telefono"
  message="Messaggio"
  submit="Invia"
  delivered="Messaggio inviato."
  retry="Riprova pi&ugrave; tardi."
  error="Si &egrave; verificato un errore.">
</my-contact-form>
```

### Image gallery

```
<my-image-gallery 
  images='[
    {"preview":"img/gallery/previews/0015.jpg", "url":"img/gallery/0015.jpg", "alt":""},
    {"preview":"img/gallery/previews/0005.jpg", "url":"img/gallery/0005.jpg", "alt":""},
    {"preview":"img/gallery/previews/0003.jpg", "url":"img/gallery/0003.jpg", "alt":""},
    {"preview":"img/gallery/previews/0009.jpg", "url":"img/gallery/0009.jpg", "alt":""},
    {"preview":"img/gallery/previews/0001.jpg", "url":"img/gallery/0001.jpg", "alt":""},
    {"preview":"img/gallery/previews/0007.jpg", "url":"img/gallery/0007.jpg", "alt":""},
    {"preview":"img/gallery/previews/0002.jpg", "url":"img/gallery/0002.jpg", "alt":""},
    {"preview":"img/gallery/previews/0013.jpg", "url":"img/gallery/0013.jpg", "alt":""},
    {"preview":"img/gallery/previews/0004.jpg", "url":"img/gallery/0004.jpg", "alt":""},
    {"preview":"img/gallery/previews/0006.jpg", "url":"img/gallery/0006.jpg", "alt":""},
    {"preview":"img/gallery/previews/0014.jpg", "url":"img/gallery/0014.jpg", "alt":""},
    {"preview":"img/gallery/previews/0008.jpg", "url":"img/gallery/0008.jpg", "alt":""},
    {"preview":"img/gallery/previews/0010.jpg", "url":"img/gallery/0010.jpg", "alt":""},
    {"preview":"img/gallery/previews/0011.jpg", "url":"img/gallery/0011.jpg", "alt":""},
    {"preview":"img/gallery/previews/0012.jpg", "url":"img/gallery/0012.jpg", "alt":""}
  ]'>
</my-image-gallery>
```
