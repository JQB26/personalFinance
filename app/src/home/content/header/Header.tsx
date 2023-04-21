import React from "react";
import {Colors} from "../../../shared/colors";
import Profile from "./Profile";

export default function Header() {
    return(
        <div style={{
            flex: '0 0 14vh',
            // backgroundColor: 'red',
            display: 'flex',
            alignItems: 'center'
        }}>
            <div style={{
                display: 'flex',
                position: 'relative',
                left: 60,
                flexDirection: 'column',
            }}>
                <div style={{
                    color: Colors.Light,
                    fontSize: 36,
                    marginBottom: 10,
                    fontWeight: 'bold'
                }}>Personal Finance</div>
                <div style={{
                    color: Colors.Light,
                    fontSize: 20,
                }}>Dashboards</div>
            </div>

            <Profile />
        </div>
    )
}
