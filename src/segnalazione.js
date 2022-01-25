import * as React from "react";
import {ArrayField,
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    Create,
    SimpleList, EmailField, ArrayInput, SimpleFormIterator,SelectField, SingleFieldList
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import UrlField from "./fields/url";
import DateField from "./fields/date";
import TimestampDateField from "./fields/date";
import {statusChoices} from "./config";
import UrlArrayField from "./fields/urlArray";

/*const segnalazioneFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
];*/

export const SegnalazioneList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List /*filters={segnalazioneFilters}*/ {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.messaggio}
                    secondaryText={record => `ID: ${record.id}`}
                    tertiaryText={record => new Date(record.localtimestampcreate).toLocaleDateString()}
                />
            ) : (
                <Datagrid>
                    <TextField source="id" />
                    <EmailField source="email" />
                    {/*<TextField source="indirizzo" />
                    <TextField source="lat" />
                    <TextField source="lng" />*/}
                    <TextField source="messaggio" />
                    <SelectField
                        fullWidth
                        source="status"
                        choices={statusChoices}
                    />
                    <UrlField source="audio" />
                    <UrlArrayField source="multimedia" />
                    <DateField source="localtimestampcreate" />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
}

export const SegnalazioneEdit = props => (
    <Edit {...props}>
        <SimpleForm onSubmit={console.log}>
            <TextInput fullWidth disabled source="id" />
            <TextInput type="email" fullWidth source="email" />
            <TextInput fullWidth source="indirizzo" />
            <TextInput type="number" fullWidth source="lat" />
            <TextInput type="number" fullWidth source="lng" />
            <TextInput fullWidth source="messaggio" multiline rows={10} />
            <TextInput fullWidth source="audio.key" />
            <SelectInput
                fullWidth
                source="status"
                choices={statusChoices}
            />
            <ArrayInput source="multimedia">
                <SimpleFormIterator>
                    <TextInput source="key" fullWidth />
                </SimpleFormIterator>
            </ArrayInput>
            <TimestampDateField disabled fullWidth source="localtimestampcreate" />
        </SimpleForm>
    </Edit>
);

export const SegnalazioneCreate = props => (
    <Create {...props}>
        <SimpleForm onSubmit={console.log}>
            <TextInput type="email" fullWidth source="email" />
            <TextInput fullWidth source="indirizzo" />
            <TextInput type="number" fullWidth source="lat" />
            <TextInput type="number" fullWidth source="lng" />
            <TextInput fullWidth source="messaggio" multiline rows={10} />
            <TextInput fullWidth source="audio.key" />
            <SelectInput
                fullWidth
                source="status"
                choices={statusChoices}
            />
            <ArrayInput source="multimedia">
                <SimpleFormIterator>
                    <TextInput fullWidth source="key" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);