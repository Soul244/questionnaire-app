const express = require('express');
const next = require('next');

const config = require('./config');
const setupApi = require('./api');

const app = next({ dev: config.isDev });
const handle = app.getRequestHandler();

const pageHandler = actualPath => (req, res) => {
  return app.render(req, res, actualPath, req.params);
};
const server = express();

async function createServer() {
  await setupApi(server, config);
  await app.prepare();

  server.get('/dashboard', (req, res) => res.redirect('/dashboard/polls'));
  server.get('/dashboard/polls/editor', pageHandler('/dashboard/polls/editor'));
  server.get('/dashboard/polls', pageHandler('/dashboard/polls'));
  server.get('/dashboard/polls/:slug/preview', pageHandler('/dashboard/polls/preview'));
  server.get('/dashboard/polls/:slug/editor', pageHandler('/dashboard/polls/editor'));
  server.get('/dashboard/polls/:slug/stats', pageHandler('/dashboard/polls/stats'));
  server.get('/embed/:slug', pageHandler('/embed'));
  server.get('*', (req, res) => handle(req, res));

  // For all other routes, use next.js.
  const listen = port => server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on :${port}`);
  });

  return { app, server, listen };
}

try {
  createServer().then(({ listen }) => {
    listen(config.port);
  });
} catch (ex) {
  console.error(ex.stack);
  process.exit(1);
}
