import React, {useState} from "react";
import { IoClose } from "react-icons/io5";
import {Box, MenuItem, TextField} from "@mui/material";
import {Colors} from "../../../shared/colors";
import {AiOutlinePlus} from "react-icons/ai";
import {supabase} from "../../../App";
import {FaTrash} from "react-icons/fa";

export default function EditAssetPopOver({refetch, isActive, setIsActive, id, previousName, previousType, previousTicker, previousShares}) {
    // TODO: export somewhere else
    const Types = [
        'Cash',
        'Bank'
    ]

    const [name, setName] = useState(previousName)
    const [type, setType] = useState(previousType)
    const [ticker, setTicker] = useState(previousTicker)
    const [shares, setShares] = useState(previousShares)

    const [nameError, setNameError] = useState(false)
    const [typeError, setTypeError] = useState(false)
    const [tickerError, setTickerError] = useState(false)
    const [sharesError, setSharesError] = useState(false)

    async function updateAsset(id, assetUpdates) {
        if (name === '') {
            setNameError(true)
        } else {
            setNameError(false)
        }
        if (type === '') {
            setTypeError(true)
        } else {
            setTypeError(false)
        }
        if (ticker === '') {
            setTickerError(true)
        } else {
            setTickerError(false)
        }
        if (isNaN(shares)) {
            setSharesError(true)
        } else {
            setSharesError(false)
        }
        if (name === '' || type === '' || ticker === '' || isNaN(shares)) {
            return false
        }

        await supabase.functions.invoke(`my-assets/${id}`, {
            method: "PUT",
            body: {
                asset: assetUpdates
            }
        })
        await refetch()
        return true
    }

    async function deleteAsset(id) {
        await supabase.functions.invoke(`my-assets/${id}`, {
            method: "DELETE"
        })
        await refetch()
    }

    const deactivate = () => {
        document.getElementById('assetsPage').style.filter = 'blur(0px)'
        document.getElementById('header').style.filter = 'blur(0px)'
        document.getElementById('leftSide').style.filter = 'blur(0px)'

        document.getElementById('assetsPage').style.pointerEvents = 'auto'
        document.getElementById('header').style.pointerEvents = 'auto'
        document.getElementById('leftSide').style.pointerEvents = 'auto'

        setIsActive(false)
    }

    return(
        <div id={'assetPopOver'} style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(0px)',
            zIndex: 1
        }}>
            <div style={{
                position: 'relative',
                width: 1000,
                height: 300,
                borderRadius: 16,
                backgroundColor: '#1F2228',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{
                    color: 'white',
                    position: 'absolute',
                    top: 22,
                    left: 28,
                    fontSize: 24
                }} >
                    Editing asset
                </div>
                <IoClose size={32} style={{
                    color: 'white',
                    position: 'absolute',
                    top: 15,
                    right: 20,
                    cursor: 'pointer'
                }} onClick={() => {
                    deactivate()
                }} />
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '20ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        value={name}
                        error={nameError}
                        onChange={e => setName(e.target.value)}
                        focused
                        InputProps={{
                            style: {
                                color: 'white',
                            },
                        }}

                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Type"
                        value={type}
                        error={typeError}
                        onChange={e => setType(e.target.value)}
                        focused
                        select
                        InputProps={{
                            style: {
                                color: 'white',
                            },
                        }}
                    >
                        {Types.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        required
                        id="outlined-required"
                        label="Ticker Name"
                        value={ticker}
                        error={tickerError}
                        onChange={e => setTicker(e.target.value)}
                        focused
                        InputProps={{
                            style: {
                                color: 'white',
                            },
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        type="number"
                        value={shares}
                        error={sharesError}
                        onChange={e => setShares(parseFloat(e.target.value))}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="Shares"
                        focused
                        InputProps={{
                            style: {
                                color: 'white',
                            },
                        }}
                    />
                </Box>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 20,
                    right: 25,
                    gap: 15
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                        color: 'white',
                        borderRadius: 12,
                        backgroundColor: 'red',
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 13,
                        paddingTop: 13,
                        cursor: 'pointer'
                    }} onClick={async () => {
                        await deleteAsset(id)
                        deactivate()
                    }}>
                        <FaTrash size={14} style={{}}/>
                        <div style={{fontSize: 16}}>Delete asset</div>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                        color: 'white',
                        borderRadius: 12,
                        backgroundColor: Colors.Accent,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 13,
                        paddingTop: 13,
                        cursor: 'pointer'
                    }} onClick={async () => {
                        const asset = {
                            name: name,
                            type: type,
                            ticker: ticker,
                            shares: shares
                        }
                        if (await updateAsset(id, asset)) {
                            deactivate()
                        }
                    }}>
                        <AiOutlinePlus size={16} style={{}}/>
                        <div style={{fontSize: 16}}>Save asset</div>
                    </div>
                </div>

            </div>
        </div>
    )
}
