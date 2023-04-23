import {Grid, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {useState} from "react";
import { AiFillStar, AiOutlineStar, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import {supabase} from "../../../App";
import {Colors} from "../../../shared/colors";
import AddAssetPopOver from "./AddAssetPopOver";
import EditAssetPopOver from "./EditAssetPopOver";

export default function Assets({data, refetch}) {
    const [addAssetPopOverIsActive, setAddAssetPopOverIsActive] = useState(false);
    const [editAssetPopOverIsActive, setEditAssetPopOverIsActive] = useState(false);

    let editValues = {
        id: '',
        name: '',
        type: '',
        ticker: '',
        shares: 0
    }
    const [editValuesHook, setEditValuesHook] = useState(editValues)

    if (addAssetPopOverIsActive || editAssetPopOverIsActive) {
        document.getElementById('assetsPage').style.filter = 'blur(5px)'
        document.getElementById('header').style.filter = 'blur(5px)'
        document.getElementById('leftSide').style.filter = 'blur(5px)'

        document.getElementById('assetsPage').style.pointerEvents = 'none'
        document.getElementById('header').style.pointerEvents = 'none'
        document.getElementById('leftSide').style.pointerEvents = 'none'
    }

    function editAsset(id, name, type, ticker, shares) {
        editValues.id = id
        editValues.name = name
        editValues.type = type
        editValues.ticker = ticker
        editValues.shares = shares

        setEditValuesHook(editValues);

        setEditAssetPopOverIsActive(true)
    }

    async function addToFavourites(id) {
        await supabase.functions.invoke(`my-assets/${id}`, {
            method: "PUT",
            body: {
                asset: {
                    is_favourite: true
                }
            }
        })
        await refetch()
    }

    async function removeFromFavourites(id) {
        await supabase.functions.invoke(`my-assets/${id}`, {
            method: "PUT",
            body: {
                asset: {
                    is_favourite: false
                }
            }
        })
        await refetch()
    }

    return(
        <div>
            {addAssetPopOverIsActive && <AddAssetPopOver refetch={refetch} isActive={addAssetPopOverIsActive} setIsActive={setAddAssetPopOverIsActive} />}
            {editAssetPopOverIsActive && <EditAssetPopOver
                isActive={editAssetPopOverIsActive}
                setIsActive={setEditAssetPopOverIsActive}
                id={editValuesHook.id}
                name={editValuesHook.name}
                type={editValuesHook.type}
                ticker={editValuesHook.ticker}
                shares={editValuesHook.shares}
            />}
            <div id={'assetsPage'} style={{
                flex: '1 0 auto',
                marginTop: 30,
                marginLeft: 60,
                marginRight: 50,
                maxHeight: 'calc(86vh - 50px)',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{right: 0, display: 'flex', justifyContent: 'end', marginBottom: 20}}>
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
                        paddingBottom: 10,
                        paddingTop: 10,
                        cursor: 'pointer'
                    }} onClick={() => {setAddAssetPopOverIsActive(true)}}>
                        <AiOutlinePlus size={16} style={{}}/>
                        <div style={{fontSize: 16}}>add new asset</div>
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Ticker</TableCell>
                                <TableCell>Shares</TableCell>
                                <TableCell>Current Price</TableCell>
                                <TableCell>Total Value USD</TableCell>
                                <TableCell>Total Value PLN</TableCell>
                                <TableCell>% of Port</TableCell>
                                <TableCell>Add to favourites</TableCell>
                                <TableCell>Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.map((asset) => (
                                <TableRow
                                    key={asset.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {asset.name}
                                    </TableCell>
                                    <TableCell>{asset.type}</TableCell>
                                    <TableCell>{asset.ticker}</TableCell>
                                    <TableCell>{asset.shares}</TableCell>
                                    <TableCell>0.52$</TableCell>
                                    <TableCell>{asset.shares * 0.52}$</TableCell>
                                    <TableCell>{asset.shares}PLN</TableCell>
                                    <TableCell>30%</TableCell>
                                    <TableCell>{asset.is_favourite
                                        ? <AiFillStar size={24} style={{cursor: 'pointer'}} onClick={() => removeFromFavourites(asset.id)} color={'gold'} />
                                        : <AiOutlineStar size={24} style={{cursor: 'pointer'}} onClick={() => addToFavourites(asset.id)} />}</TableCell>
                                    <TableCell><AiFillEdit size={24} style={{cursor: 'pointer'}} onClick={() => editAsset(
                                        asset.id, asset.name, asset.type, asset.ticker, asset.shares
                                    )} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
