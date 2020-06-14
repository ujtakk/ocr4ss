# ocr4ss

Simple frontend for OCR (Cloud Vision API)

## How to run

### Obtain your Cloud Vision API Key

See [docs](https://cloud.google.com/vision/docs/auth)

### Embed your key into `credentials.json`

```
cp credentials.json.tmpl credentials.json
(Edit credentials.json)
```

(NOTE: Do not publish your `credentials.json`)

### Build

```
npm install
npm run build
```

### Run local server

```
npm run dev
```

## License

MIT
