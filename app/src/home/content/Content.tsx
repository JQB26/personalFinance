import Header from "./header/Header";
import React from "react";
import Dashboards from "./dashboards/Dashboards";
import Assets from "./assets/Assets";

export default function Content({activePage, data, refetch}) {
    return(
        <div style={{
            flex: '1 0 85%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Header activePage={activePage} />
            {activePage === 'dashboards' ? <Dashboards data={data} /> : <Assets data={data} refetch={refetch} />}
        </div>
    )
}
