# Libro Mastro — pubblicazione su Netlify

Questa cartella è pronta per essere pubblicata su Netlify. Include:

- `public/index.html` — l'app (identica a quella che usavi in chat, ma collegata a un vero database online)
- `netlify/functions/storage.js` — la funzione che legge/scrive i dati su **Netlify Blobs** (il database gratuito di Netlify), protetta da un codice d'accesso personale
- `netlify.toml`, `package.json` — configurazione

Il risultato: apri il sito da qualsiasi dispositivo (telefono, PC, tablet), inserisci il tuo codice, e vedi/modifichi sempre gli stessi dati.

## 1. Crea un account Netlify (se non ce l'hai già)

https://app.netlify.com/signup — è gratuito, basta per questo utilizzo.

## 2. Installa la Netlify CLI

Sul tuo computer, apri un terminale ed esegui:

```bash
npm install -g netlify-cli
netlify login
```

Si aprirà il browser per autorizzare l'accesso al tuo account.

## 3. Dentro questa cartella, installa le dipendenze

```bash
cd libro-mastro
npm install
```

## 4. Collega e pubblica il sito

```bash
netlify init
```

Rispondi alle domande:
- **"Create & configure a new site"**
- scegli il team/account personale
- il nome del sito lascialo a scelta di Netlify o personalizzalo (es. `il-tuo-nome-libro-mastro`)
- alla domanda sui comandi di build, lascia tutto vuoto/predefinito (non serve build, `public` è già la cartella pubblicata)

Poi pubblica in produzione:

```bash
netlify deploy --prod
```

## 5. Imposta il tuo codice d'accesso personale (passaggio importante)

Questo è ciò che rende il sito accessibile solo a te:

```bash
netlify env:set APP_PASSCODE "scegli-un-codice-lungo-e-a-te-noto"
netlify deploy --prod
```

(il secondo comando ripubblica il sito così la funzione legge la nuova variabile d'ambiente)

Da questo momento, chiunque apra il sito senza conoscere il codice non potrà leggere né scrivere nessun dato — la funzione risponde "non autorizzato" a ogni richiesta priva del codice corretto.

## 6. Fatto

Apri l'indirizzo che Netlify ti ha assegnato (tipo `https://il-tuo-nome-libro-mastro.netlify.app`), inserisci il codice scelto al punto 5, e da lì in poi l'app ricorderà l'accesso su quel dispositivo (puoi disconnetterti col link "esci" in fondo alla pagina).

Ripeti l'accesso col codice su ogni altro dispositivo da cui vuoi usarla: i dati sono online, quindi li vedrai identici ovunque.

## Aggiornare l'app in futuro

Se in futuro vuoi modificare l'app (nuove funzioni, correzioni), sostituisci `public/index.html` con la nuova versione e rilancia:

```bash
netlify deploy --prod
```

I dati salvati (transazioni, ricorrenze) restano intatti: vivono in Netlify Blobs, separati dal codice del sito.

## Note sulla sicurezza

Il codice d'accesso è una protezione semplice ma efficace per un uso personale: senza il codice esatto, la funzione che legge/scrive i dati rifiuta ogni richiesta. Non è un sistema con account/password multipli — va bene per "solo io", non per condividere l'accesso con altre persone in modo differenziato. Se in futuro ti serve un vero sistema multi-utente, si può aggiungere (Netlify Identity o simili).
"# libroMastro" 
