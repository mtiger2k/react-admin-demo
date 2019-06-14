import React, {Component} from 'react';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import logo from './logo.svg';
import './App.css';

import dataProviderFactory from './dataProvider';
import fakeServerFactory from './fakeServer';

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
          <Admin dataProvider={dataProvider} >
            <Resource name="customers" list={ListGuesser} edit={EditGuesser} />
            <Resource name="commands" list={ListGuesser} edit={EditGuesser} options={{ label: 'Orders' }} />
            <Resource name="invoices" list={ListGuesser} edit={EditGuesser} />
            <Resource name="products" list={ListGuesser} edit={EditGuesser} />
            <Resource name="categories" list={ListGuesser} edit={EditGuesser} />
            <Resource name="reviews" list={ListGuesser} edit={EditGuesser} />
          </Admin>
        );
    }
}

export default App;
