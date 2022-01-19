import * as React from "react";
import {DateField} from "react-admin";

const TimestampDateField = props => {
    const recordWithTimestampAsInteger = {
        [props.source]: parseInt(props.record[props.source], 10)
    };
    return <DateField {...props} record={recordWithTimestampAsInteger} />
}

export default TimestampDateField;