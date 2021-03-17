import React from 'react';
import App from 'next/app';
import { CssBaseline } from '@material-ui/core';
import {appWithTranslation} from '../i18n';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { wrapper } from '../redux/store';
import GlobalStyle from '../components/styled-components/Global-Style';

/**
 * @class StartupApp Configuration component that is called for each page component.
 */
class StartupApp extends App {


	static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        //Anything returned here can be access by the client
        return {pageProps: pageProps};
    }

	render() {

		//Information that was returned  from 'getInitialProps' are stored in the props i.e. pageProps
		const { Component, pageProps } = this.props;

		return (
			<>
				<Head>
					<title>Patrik Duch, Solutions Architect</title>
        			<link rel="icon" href="/favicon.ico" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
					<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
				</Head>
					<StylesProvider injectFirst>
						<ThemeProvider theme={theme}>
							<CssBaseline />
							<GlobalStyle />
							<Component {...pageProps} />
						</ThemeProvider>
					</StylesProvider>
			</>
		);
	}
}


export default wrapper.withRedux(appWithTranslation(StartupApp));