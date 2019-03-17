const express = require('express');
const next = require('next');
const compression = require('compression');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression());
    server.get('/giris-yap', (req, res) => {
      const actualPage = '/auth';
      return app.render(req, res, actualPage);
    });

    server.get('/anasayfa', (req, res) => {
      const actualPage = '/index';
      return app.render(req, res, actualPage);
    });

    server.get('/anket/:_id', (req, res) => {
      const actualPage = '/poll';
      const queryParams = { _id: req.params._id };
      return app.render(req, res, actualPage, queryParams);
    });


    server.get('/dashboard', (req, res) => {
      const actualPage = '/dashboard';
      return app.render(req, res, actualPage);
    });


    server.get('/dashboard/editor/yeni-anket', (req, res) => {
      const actualPage = '/dashboard/editor';
      return app.render(req, res, actualPage);
    });

    server.get('/dashboard/editor/:_id', (req, res) => {
      const actualPage = '/dashboard/editor';
      const queryParams = { _id: req.params._id };
      return app.render(req, res, actualPage, queryParams);
    });

    server.get('/dashboard/on-izleme/:ispreview', (req, res) => {
      const actualPage = '/dashboard/preview';
      const queryParams = { ispreview: req.params.ispreview };
      return app.render(req, res, actualPage, queryParams);
    });

    server.get('/dashboard/istatistikler/:_id', (req, res) => {
      const actualPage = '/dashboard/stats';
      const queryParams = { _id: req.params._id };
      return app.render(req, res, actualPage, queryParams);
    });

    // For all other routes, use next.js.
    server.get('*', (req, res) => handle(req, res));

    server.get('*.js', (req, res, next) => {
      req.url += '.gz';
      res.set('Content-Encoding', 'gzip');
      next();
    });

    server.listen(process.env.PORT || 3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
