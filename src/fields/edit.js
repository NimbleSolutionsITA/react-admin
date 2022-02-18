import * as React from "react";
import {EditButton, useRecordContext} from 'react-admin';

const EditField = ({ source }) => {
    const record = useRecordContext();
    return record ? (
        <EditButton record={record} label={record[source]} />
    ) : null;
}

export default EditField;