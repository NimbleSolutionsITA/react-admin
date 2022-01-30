import * as React from "react";
import { Admin, Resource, fetchUtils } from 'react-admin';
import dataProvider from "./dataProvider/index";
import AuthProvider from "./authProvider";
import Login from "./Login";
import Dashboard from "./Dashboard";
import {SegnalazioneList, SegnalazioneEdit, SegnalazioneCreate} from "./segnalazione";
import AnnouncementIcon from '@material-ui/icons/Announcement';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import italianMessages from 'ra-language-italian';
import {Amplify} from "aws-amplify";
import {apiUrl, userPoolId, AppClientId, region/*, apiUrlLocal*/} from "./config";
import {UserList} from './users';
import UserIcon from '@material-ui/icons/Group';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import {EmailTemplateCreate, EmailTemplateEdit, EmailTemplateList} from "./emailTemplate";
import { theme } from "./theme";

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

const App = () => (
    <Admin
        theme={theme}
        authProvider={AuthProvider}
        loginPage={Login}
        dataProvider={dataProvider(apiUrl, httpClient)}
        dashboard={Dashboard}
        i18nProvider={i18nProvider}
    >
        <Resource
            name="users"
            list={UserList}
            icon={UserIcon}
            options={{ label: 'Utenti' }}
        />
        <Resource
            name="email-templates"
            list={EmailTemplateList}
            edit={EmailTemplateEdit}
            create={EmailTemplateCreate}
            icon={AlternateEmailIcon}
            options={{ label: 'Template email' }}
        />
        <Resource
            name="segnalazioni"
            list={SegnalazioneList}
            edit={SegnalazioneEdit}
            create={SegnalazioneCreate}
            icon={AnnouncementIcon}
            options={{ label: 'Segnalazioni' }}
        />
    </Admin>
);

export default App