import {Colors} from "../../../shared/colors";
import React from "react";
import { MdDashboard } from "react-icons/md";
import { BsTable } from "react-icons/bs";

export default function Navigation({activePage, setActivePage}) {
    return(
        <div style={{
            flex: '0 0 30vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'end',
        }}>
            <div className={'nav-item'} id={'dashboards'} style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: activePage === 'dashboards' ? '#161920' : Colors.BG,
                padding: 18,
                maxWidth: '8vw',
                marginBottom: 10,
                borderBottomRightRadius: 15,
                borderTopRightRadius: 15,
                cursor: 'pointer'
            }} onClick={() => setActivePage('dashboards')}>
                <MdDashboard color={Colors.Accent} />
                <div style={{color: Colors.Accent, marginLeft: 10}}>Dashboards</div>
            </div>
            <div className={'nav-item'} id={'assets'} style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: activePage === 'assets' ? '#161920' : Colors.BG,
                padding: 18,
                maxWidth: '8vw',
                borderBottomRightRadius: 15,
                borderTopRightRadius: 15,
                cursor: 'pointer'
            }} onClick={() => setActivePage('assets')}>
                <BsTable color={Colors.Accent} />
                <div style={{color: Colors.Accent, marginLeft: 10}}>All your assets</div>
            </div>
        </div>
    )
}