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
        document.getElementById('assetsPage').style.transition = 'all 0.2s ease'
        document.getElementById('header').style.transition = 'all 0.2s ease'
        document.getElementById('leftSide').style.transition = 'all 0.2s ease'

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
                refetch={refetch}
                isActive={editAssetPopOverIsActive}
                setIsActive={setEditAssetPopOverIsActive}
                id={editValuesHook.id}
                previousName={editValuesHook.name}
                previousType={editValuesHook.type}
                previousTicker={editValuesHook.ticker}
                previousShares={editValuesHook.shares}
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
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader={true}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{backgroundColor: Colors.BG, color: Colors.TableHeadText}}>Name</TableCell>
                                <TableCell style={{backgroundColor: Colors.BG, color: Colors.TableHeadText}}>Type</TableCell>
                                <TableCell style={{backgroundColor: Colors.BG, color: Colors.TableHeadText}}>Ticker</TableCell>
                                <TableCell style={{backgroundColor: Colors.BG, color: Colors.TableHeadText}}>Shares</TableCell>
                                <TableCell style={{backgroundColor: Colors.BG, color: Colors.TableHeadText}}>Current Price</TableCell>
                                <TableCell style={{backgroundColor: Colors.BG, color: Colors.TableHeadText}}>Total Value USD</TableCell>
                                <TableCell style={{backgroundColor: Colors.BG, color: Colors.TableHeadText}}>% of Portfolio</TableCell>
                                <TableCell style={{backgroundColor: Colors.BG, color: Colors.TableHeadText}}>Add to favourites</TableCell>
                                <TableCell style={{backgroundColor: Colors.BG, color: Colors.TableHeadText}}>Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.map((asset) => (
                                <TableRow
                                    key={asset.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    style={{backgroundColor: Colors.BG}}
                                >
                                    <TableCell component="th" scope="row" style={{color: Colors.Light}}>
                                        {asset.name}
                                    </TableCell>
                                    <TableCell style={{color: Colors.Light}}>{asset.type}</TableCell>
                                    <TableCell style={{color: Colors.Light}}>{asset.ticker}</TableCell>
                                    <TableCell style={{color: Colors.Light}}>{asset.shares}</TableCell>
                                    <TableCell style={{color: Colors.Light}}>{asset.currentPrice?.toFixed(2)} $</TableCell>
                                    <TableCell style={{color: Colors.Light}}>{asset.totalValueUSD?.toFixed(2)} $</TableCell>
                                    <TableCell style={{color: Colors.Light}}>{(asset.portfolioFraction * 100)?.toFixed(2)} %</TableCell>
                                    <TableCell>{asset.is_favourite
                                        ? <AiFillStar size={24} style={{cursor: 'pointer'}} onClick={() => removeFromFavourites(asset.id)} color={'gold'} />
                                        : <AiOutlineStar size={24} style={{cursor: 'pointer'}} color={Colors.Light} onClick={() => addToFavourites(asset.id)} />}</TableCell>
                                    <TableCell><AiFillEdit size={24} style={{cursor: 'pointer'}} color={Colors.Light} onClick={() => editAsset(
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
