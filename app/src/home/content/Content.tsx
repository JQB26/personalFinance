import Header from "./header/Header";
import React from "react";
import Dashboards from "./dashboards/Dashboards";

export default function Content() {
    return(
        <div style={{
            flex: '1 0 85%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Header />
            <Dashboards />
        </div>
    )
}
