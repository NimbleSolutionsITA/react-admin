import * as React from "react";
import {useRecordContext} from "react-admin";
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';

const Marker = ({lat, lng}) => (
    <div style={{position: 'absolute', transform: 'translate(-50%, -80%)' }}>
        <RoomIcon
            style={{fontSize: '8em'}}
            color="error"
            lat={lat}
            lng={lng}
        />
    </div>
)

const MapField = () => {
    const {lat, lng} = useRecordContext();

    return lat && lng ? (
        <div style={{position: 'relative', paddingBottom: '40%', width: '100%'}}>
            <div style={{position: 'absolute', width: '100%', height: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
                        libraries:['places', 'geometry', 'drawing', 'visualization']
                    }}
                    defaultCenter={{
                        lat,
                        lng
                    }}
                    defaultZoom={15}
                >
                    <Marker
                        lat={lat}
                        lng={lng}
                    />
                </GoogleMapReact>
            </div>
        </div>
    ) : null
}

export default MapField