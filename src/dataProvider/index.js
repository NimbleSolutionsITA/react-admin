import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    GET_MANY,
    GET_MANY_REFERENCE,
} from 'react-admin';
import cognitoDataProvider from "./cognitoDataProvider";
import dynamoDataProvider from "./dynamoDataProvider";

const httpClient = (url, options = {}) => {
    console.log(process.env.REACT_APP_API_URL)
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const auth = JSON.parse(localStorage.getItem('auth'));
    options.headers.set('Authorization', `Bearer ${auth.signInUserSession.idToken.jwtToken}`);

    const urlObj = new URL(url)
    if (urlObj.pathname.split('/').includes('users')) {
        const range = JSON.parse(urlObj.searchParams.get('range'))
        const perPage = (range[1] + 1) - range[0]
        const page = (range[0] / perPage) + 1
        let tokenArray = JSON.parse(localStorage.getItem('tokenObj'))
        if (!(page in tokenArray)) {
            tokenArray[page] = localStorage.getItem('pagToken')
            localStorage.setItem("tokenObj",JSON.stringify(tokenArray))
        }
        const PagToken = {
            token : localStorage.getItem('pagToken') || '',
            tokenArray
        }
        options.method = 'POST'
        options.body = JSON.stringify(PagToken)
    }

    return fetchUtils.fetchJson(url, options);
}

const dataProviders = (apiUrl) => [
    {
        dataProvider: cognitoDataProvider(apiUrl, httpClient),
        resources: ['users'],
    },
    {
        dataProvider: dynamoDataProvider(apiUrl, httpClient),
        resources: ['segnalazioni', 'email-templates'],
    },
];

export default (type, resource, params) => {
    const dataProviderMapping = dataProviders(process.env.REACT_APP_API_URL).find((dp) =>
        dp.resources.includes(resource));

    const mappingType = {
        [GET_LIST]: 'getList',
        [GET_ONE]: 'getOne',
        [GET_MANY]: 'getMany',
        [GET_MANY_REFERENCE]: 'getManyReference',
        [CREATE]: 'create',
        [UPDATE]: 'update',
        [UPDATE_MANY]: 'updateMany',
        [DELETE]: 'delete',
    };

    return dataProviderMapping.dataProvider[mappingType[type]](resource, params);
};