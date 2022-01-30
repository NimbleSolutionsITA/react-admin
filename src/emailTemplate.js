import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    Create,
    SimpleList,
    EmailField,
    SelectField,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { useMediaQuery } from '@material-ui/core';
import {statusChoices} from "./config";

export const EmailTemplateList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.id}
                    secondaryText={record => record.subject}
                    tertiaryText={record => record.to}
                />
            ) : (
                <Datagrid>
                    <SelectField
                        fullWidth
                        source="id"
                        choices={statusChoices}
                        sortable={false}
                    />
                    <EmailField source="from" sortable={false} />
                    <EmailField source="to" sortable={false} />
                    <TextField source="subject" sortable={false} />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
}

export const EmailTemplateEdit = props => (
    <Edit {...props}>
        <SimpleForm onSubmit={console.log}>
            <SelectInput
                fullWidth
                source="id"
                choices={statusChoices}
            />
            <TextInput type="email" fullWidth source="from" />
            <TextInput type="email" fullWidth source="to" />
            <TextInput fullWidth source="subject" />
            <RichTextInput fullWidth source="template" />
        </SimpleForm>
    </Edit>
);

export const EmailTemplateCreate = props => (
    <Create {...props}>
        <SimpleForm onSubmit={console.log}>
            <SelectInput
                fullWidth
                source="id"
                choices={statusChoices}
            />
            <TextInput type="email" fullWidth source="from" />
            <TextInput type="email" fullWidth source="to" />
            <TextInput fullWidth source="subject" />
            <RichTextInput fullWidth source="template" />
        </SimpleForm>
    </Create>
);