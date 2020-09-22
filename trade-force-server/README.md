# Trade Force Server

## Database

We store all application data in JSON Server. Make sure it is started before
starting the Trade Force server. Start JSON Server in a different shell using
`yarn start:json-server`. This will start the JSON server at
http://localhost:9090.

Note that the Trade Force server picks up this URL from the `.env` file.

## Dev Build

```bash
yarn
yarn dev
```

## Prod Build

```bash
yarn build
node dist/index.js
```
