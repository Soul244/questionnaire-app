import React from 'react';
import App, { Container } from 'next/app';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as $ from 'jquery';
import withRedux from 'next-redux-wrapper';
import Head from 'next/head';
import { IntlProvider, addLocaleData } from 'react-intl';
import { initStore } from '../redux/store';
import '../css/index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import 'react-id-swiper/src/styles/css/swiper.css';
import GlobalStyles from '../css/globalStyles';
import locale_en from 'react-intl/locale-data/en';
import locale_tr from 'react-intl/locale-data/tr';

addLocaleData([...locale_en, ...locale_tr]);

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }

  componentDidMount() {
    window.$ = $; window.jQuery = $;
  }

  render() {
    const {
      Component, pageProps, store, generalReducer,
    } = this.props;
    const { locale, messages } = generalReducer;
    return (
      <IntlProvider key={locale} locale={locale} messages={messages}>
        <Container>
          <Head>
            <title>Questionnaire</title>
            <link rel="icon" type="image" href="/static/favicon.jpg" />
            <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600" rel="stylesheet" />
            <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"
            />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          </Head>
          <Provider store={store}>
            <>
              <GlobalStyles />
              <Component {...pageProps} />
            </>
          </Provider>
        </Container>
      </IntlProvider>
    );
  }
}

const mapStateToProps = state => ({
  generalReducer: state.generalReducer,
});

const ConnectedMyApp = connect(
  mapStateToProps,
  {},
)(MyApp);

export default withRedux(initStore)(ConnectedMyApp);
