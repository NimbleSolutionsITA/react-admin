import * as React from "react";
import { Card, CardContent, CardHeader } from '@material-ui/core';

const Dashboard = () => (
    <Card>
        <CardHeader title="Pannello di amministrazione per segnalazioni Codacons" />
        <CardContent>
            <div style={{maxWidth: '300px', margin: '0 auto'}}>
                <img width="100%" src="/logo.jpg" alt="Codacons logo" />
            </div>
        </CardContent>
    </Card>
);

export default Dashboard