import {Grid, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import { AiFillStar, AiOutlineStar, AiFillEdit } from "react-icons/ai";
import {supabase} from "../../../App";

export default function Assets({data, refetch}) {
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
        <div style={{
            flex: '1 0 auto',
            marginTop: 30,
            marginLeft: 60,
            marginRight: 50,
            maxHeight: 'calc(86vh - 50px)',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{color: 'white', backgroundColor: 'red'}}>
                + add new asset
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
                        {data.map((asset) => (
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
                                    ? <AiFillStar size={24}  style={{cursor: 'pointer'}} onClick={() => removeFromFavourites(asset.id)} color={'gold'} />
                                    : <AiOutlineStar size={24} style={{cursor: 'pointer'}} onClick={() => addToFavourites(asset.id)} />}</TableCell>
                                <TableCell><AiFillEdit size={24} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
