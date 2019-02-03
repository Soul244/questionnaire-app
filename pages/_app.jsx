import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import Head from 'next/head';

import { initStore } from '../redux/store';
import '../css/index.css';
import '../css/bootstrap.min.css';
import * as $ from 'jquery';
import 'react-toastify/dist/ReactToastify.css';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import { Navbar } from '../components/Shared';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }

  componentDidMount() {
    window.$ = $; window.jQuery = $;
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Head>
          <title>Bilemezsin Questionnaire</title>
          <link rel="icon" type="image" href="/static/favicon.jpg" />
          <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        </Head>
        <Provider store={store}>
        <>
          <Navbar />
          <Component {...pageProps} />
        </>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(MyApp);
