import React, {useEffect, useState} from "react";
import {supabase} from "../App";
import {Funnel, FunnelChart, LabelList, Pie, PieChart, Sankey, Tooltip, Treemap} from "recharts";
import { useQuery } from "react-query";
import {Avatar, CircularProgress} from "@mui/material";
import Favourites from "./leftSide/favurites/Favourites";
import {Colors} from "../shared/colors";
import Content from "./content/Content";
import LeftSide from "./leftSide/LeftSide";

export default function Home() {
    const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
        'my-assets',
        getData
    )

    const [favourites, setFavourites] = useState([])

    const [activePage, setActivePage] = useState('dashboards')

    async function getData() {
        const { data, error } = await supabase.functions.invoke("my-assets", {
            method: "GET"
        })
        console.log(data.assets)
        const assets = data.assets
        setFavourites(assets.filter((asset) =>
            asset.is_favourite
        ))
        return data.assets;
    }

    if (isLoading) {
        return (
            <div style={{display: 'flex', flexWrap: 'wrap', backgroundColor: Colors.BG, margin: 0, padding: 0, height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center'}}>
                <CircularProgress style={{color: Colors.Accent}} size={100} />
            </div>
        )
    }

    return (
        <div style={{display: 'flex', flexWrap: 'wrap', backgroundColor: Colors.BG, margin: 0, padding: 0, height: '100vh', width: '100vw'}}>
            <LeftSide activePage={activePage} setActivePage={setActivePage} favouritesData={favourites}/>
            <Content activePage={activePage} data={data} refetch={refetch}/>
        </div>
    );
}