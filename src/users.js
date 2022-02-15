import * as React from "react";
import { List, Datagrid, TextField, BooleanField, DateField } from 'react-admin';

export const UserList = props => {
    return (
        <List {...props} bulkActionButtons={false}>
            <Datagrid rowClick="edit">
                <TextField source="id" sortable={false} />
                <TextField source="userEmail" sortable={false} />
                <BooleanField source="userEmailVerified" sortable={false} />
                <DateField source="userCreateDate" sortable={false} />
                <DateField source="userLastModifiedDate" sortable={false} />
                <TextField source="userStatus" sortable={false} />
                <BooleanField source="userEnabled" sortable={false} />
            </Datagrid>
        </List>
    )
};