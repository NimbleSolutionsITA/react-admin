import * as React from "react";
import {ArrayInput, SimpleFormIterator, TextInput, useRecordContext} from 'react-admin';

const ArrayField = ({ source }) => {
    const record = useRecordContext();
    const array= record[source].map(v => ({value: v}))
    console.log(array)
    return record ? (
        <ArrayInput source={array}>
            <SimpleFormIterator>
                <TextInput fullWidth source="value" />
            </SimpleFormIterator>
        </ArrayInput>
    ) : null;
}

export default ArrayField;