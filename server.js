const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/giris-yap', (req, res) => {
      const actualPage = '/auth';
      return app.render(req, res, actualPage);
    });

    server.get('/anasayfa', (req, res) => {
      const actualPage = '/index';
      return app.render(req, res, actualPage);
    });

    server.get('/anket/:slug', (req, res) => {
      const actualPage = '/poll';
      const queryParams = { slug: req.params.slug };
      return app.render(req, res, actualPage, queryParams);
    });

    server.get('/anket/editor/yeni-anket', (req, res) => {
      const actualPage = '/poll/editor';
      return app.render(req, res, actualPage);
    });

    server.get('/anket/editor/:slug', (req, res) => {
      const actualPage = '/poll/editor';
      const queryParams = { slug: req.params.slug };
      return app.render(req, res, actualPage, queryParams);
    });

    server.get('/anket/on-izleme/:ispreview', (req, res) => {
      const actualPage = '/poll/preview';
      const queryParams = { ispreview: req.params.ispreview };
      return app.render(req, res, actualPage, queryParams);
    });

    server.get('/anket/anketlerim', (req, res) => {
      const actualPage = '/poll/list';
      return app.render(req, res, actualPage);
    });

    server.get('/anket/istatistikler/:slug', (req, res) => {
      const actualPage = '/poll/stats';
      const queryParams = { slug: req.params.slug };
      return app.render(req, res, actualPage, queryParams);
    });
    // For all other routes, use next.js.
    server.get('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
