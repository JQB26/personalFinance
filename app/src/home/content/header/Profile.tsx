import {Colors} from "../../../shared/colors";
import {Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {supabase} from "../../../App";

export default function Profile() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const [name, setName] = useState("JS")

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = async () => {
        await supabase.auth.signOut()
    }

    useEffect(() => {
        const run = async () => {
            const userName = (await supabase.from('users').select('*').maybeSingle())
                .data.name
            setName(userName.substring(0, 2).toUpperCase())
        }

        void run()
    }, [])

    return(
        <div style={{
            display: 'flex',
            position: 'fixed',
            right: 40
        }}>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar sx={{ bgcolor: Colors.Light, color: 'black', width: 64, height: 64 }}>{name}</Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '70px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {/*<MenuItem key='Profile' onClick={handleCloseUserMenu}>*/}
                    {/*    <Typography textAlign="center">Profile</Typography>*/}
                    {/*</MenuItem>*/}
                    <MenuItem key='Logout' onClick={logout}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </div>
    )
}