import React, {Component} from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import logo from './logo.svg';
import './App.css';

import dataProviderFactory from './dataProvider';
import fakeServerFactory from './fakeServer';

import englishMessages from './i18n/en';

import visitors from './visitors';
import products from './products';
import orders from './orders';
import invoices from './invoices';

const i18nProvider = locale => {
    if (locale === 'fr') {
        return import('./i18n/fr').then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
};

class App extends Component {
    state = { dataProvider: null };

    async componentWillMount() {
        this.restoreFetch = await fakeServerFactory(
            process.env.REACT_APP_DATA_PROVIDER
        );

        const dataProvider = await dataProviderFactory(
            process.env.REACT_APP_DATA_PROVIDER
        );

        this.setState({ dataProvider });
    }

    componentWillUnmount() {
        this.restoreFetch();
    }

    render() {
        const { dataProvider } = this.state;

        if (!dataProvider) {
            return (
                <div className="loader-container">
                    <div className="loader">Loading...</div>
                </div>
            );
        }

        return (
          <Admin dataProvider={dataProvider} i18nProvider={i18nProvider} >
            <Resource name="customers" {...visitors} />
            <Resource name="products" {...products} />
            <Resource name="commands" {...orders} options={{ label: 'Orders' }} />
            <Resource name="invoices" {...invoices} />
            <Resource name="categories" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
            <Resource name="reviews" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
          </Admin>
        );
    }
}

export default App;
