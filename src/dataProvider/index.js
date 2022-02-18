import {
    fetchUtils,
    sanitizeFetchType
} from 'react-admin';
import cognitoDataProvider from "./cognitoDataProvider";
import dynamoDataProvider from "./dynamoDataProvider";

const {REACT_APP_API_URL} = process.env

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const auth = JSON.parse(localStorage.getItem('auth'));
    options.headers.set('Authorization', `Bearer ${auth.signInUserSession.idToken.jwtToken}`);

    return fetchUtils.fetchJson(url, options);
}

const dataProviders = [
    {
        dataProvider: cognitoDataProvider(REACT_APP_API_URL, httpClient),
        resources: ['users'],
    },
    {
        dataProvider: dynamoDataProvider(REACT_APP_API_URL, httpClient),
        resources: ['segnalazioni', 'email-templates'],
    },
];

export default (type, resource, params) => {
    const {dataProvider} = dataProviders.find((dp) =>
        dp.resources.includes(resource));

    return dataProvider[sanitizeFetchType(type)](resource, params);
};