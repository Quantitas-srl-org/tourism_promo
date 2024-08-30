![Quantitas Logo](./assets/images/quantitas-logo.svg)

# Quantitas Tourism Promo Landing page
Benvenuto! Questo ambiente di sviluppo si basa su **Jekyll** con **Webpack** per la compilazione del Vanilla JS e **Tailwind** per lo stile CSS.

### Installazione
1. Per eseguire l'applicazione in locale è necessario installare **Ruby Gem**. Segui la guida relativa al tuo sistema operativo che trovi a [questo link](https://jekyllrb.com/docs/installation/) 
2. Installa **Jekyll** e **Bundler**: `gem install jekyll bundler`
3. Installa le dipendenze di **Node**: `npm run install`
4. Entra nella cartella del progetto e lancia l'ambiente di sviluppo con `npm run build`. Questo comando esegue `bundle exec jekyll serve` con l'opzione `--livereload` . 

Fatto! Ora puoi visitare il sito su: [http://localhost:4000/](http://localhost:4000/)

### Sviluppo
Per compilare CSS e JS eseguire i seguenti comandi: 

- CSS: `npm run css`
- JS: `npm run js`

Puoi eseguire tutti i comandi contemporaneamente lanciando `npm run dev` che sfrutta Concurrently per eseguire insieme `npm run css & npm run js & npm run build`

**TODO:** 

Webpack è configurato in `mode=development`, per l'ambiente di produzione aggiornare `webpack.config.js` a `mode=production`.

Jekyll è configurato con `debug: true`, per l'ambiente di produzione aggiornare `_config.yml` mettendo `false` a debug.
