import {Colors} from "../../../shared/colors";
import React, {useState} from "react";
import {Popover, Typography} from "@mui/material";

export default function FavouriteComponent({favouriteItem}) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return(
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: 20,
            marginBottom: 15,
        }}>
            <div style={{
                width: 45,
                height: 45,
                borderRadius: 50,
                backgroundColor: '#24272E',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    style={{
                        color: Colors.Light,
                        fontSize: 13,
                        fontWeight: 'bold'
                    }}
                >
                    {favouriteItem.ticker}
                </Typography>
                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: 'none',
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography sx={{ p: 1 }}>{favouriteItem.name}</Typography>
                </Popover>
            </div>
            <div style={{
                width: '45%',
                height: 42,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 8,
                color: Colors.Light,
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                borderStyle: 'solid',
                borderColor: Colors.Accent
            }}>
                {favouriteItem.shares.toFixed(2)}
            </div>
        </div>
    )
}
