# ocr4ss

Simple frontend for OCR (Cloud Vision API)

## How to run

1. Obtain your Cloud Vision API Key

See [docs](https://cloud.google.com/vision/docs/auth)

2. Embed your key into `credentials.json`

```
cp credentials.json.tmpl credentials.json
(Edit credentials.json)
```

3. build sources

```
npm install
npm run build
```

4. run local server

```
npm run dev
```

## License

MIT
