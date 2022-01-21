import * as React from "react";
import { Admin, Resource, fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import AuthProvider from "./authProvider";
import Login from "./Login";
import Dashboard from "./Dashboard";
import {SegnalazioneList, SegnalazioneEdit, SegnalazioneCreate} from "./segnalazione";
import AnnouncementIcon from '@material-ui/icons/Announcement';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import italianMessages from 'ra-language-italian';
import {Amplify} from "aws-amplify";
import {apiUrl, userPoolId, AppClientId, region} from "./config";

// import {UserList} from './users';
// import UserIcon from '@material-ui/icons/Group';

const i18nProvider = polyglotI18nProvider(() => italianMessages, 'it');

Amplify.configure({
    Auth: {
        region,
        userPoolId,
        userPoolWebClientId: AppClientId,
    }
})

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const auth = JSON.parse(localStorage.getItem('auth'));
    options.headers.set('Authorization', `Bearer ${auth.signInUserSession.idToken.jwtToken}`);
    return fetchUtils.fetchJson(url, options);
}

const App = () => (
    <Admin
        authProvider={AuthProvider}
        loginPage={Login}
        dataProvider={simpleRestProvider(apiUrl, httpClient)}
        dashboard={Dashboard}
        i18nProvider={i18nProvider}
    >
        {/*<Resource
            name="users"
            list={UserList}
            icon={UserIcon}
        />*/}
        <Resource
            name="segnalazioni"
            list={SegnalazioneList}
            edit={SegnalazioneEdit}
            create={SegnalazioneCreate}
            icon={AnnouncementIcon}
        />
    </Admin>
);

export default App