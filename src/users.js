import * as React from "react";
import { List, Datagrid, TextField, BooleanField, DateField } from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="userEmail" />
            <BooleanField source="userEmailVerified" />
            <DateField source="userCreateDate" />
            <DateField source="userLastModifiedDate" />
            <TextField source="userStatus" />
            <BooleanField source="userEnabled" />
        </Datagrid>
    </List>
);