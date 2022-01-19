import * as React from "react";
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
// import {UserList} from './users';
import {SegnalazioneList, SegnalazioneEdit, SegnalazioneCreate} from "./segnalazione";
import Dashboard from "./Dashboard";
import AnnouncementIcon from '@material-ui/icons/Announcement';
// import UserIcon from '@material-ui/icons/Group';
// import authProvider from "./authProvider";

const dataProvider = simpleRestProvider('https://codacons-rest.nimble-lab.com/admin');

const App = () => (
    <Admin
        dataProvider={dataProvider}
        dashboard={Dashboard}
        /*authProvider={authProvider}*/
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