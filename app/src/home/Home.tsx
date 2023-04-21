import React, {useEffect, useState} from "react";
import {supabase} from "../App";
import {Funnel, FunnelChart, LabelList, Pie, PieChart, Sankey, Tooltip, Treemap} from "recharts";
import { useQuery } from "react-query";
import {Avatar} from "@mui/material";
import Favourites from "./favourites/Favourites";
import {Colors} from "../shared/colors";
import Content from "./content/Content";

export default function Home() {
    const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
        'my-assets',
        getData
    )

    const [userInitials, setUserInitials] = useState('JS')

    async function getData() {
        const { data, error } = await supabase.functions.invoke("my-assets", {
            method: "GET"
        })
        console.log(data)
        return data.assets;
    }

    async function addData() {
        const { data, error } = await supabase.functions.invoke("my-assets", {
            method: "POST",
            body: {
                asset: {
                    name: "testName4",
                    ticker: "TST4",
                    type: "testType4",
                    shares: 700
                }
            }
        })
        console.log(data)
        await refetch()
    }

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <div style={{display: 'flex', flexWrap: 'wrap', backgroundColor: Colors.BG, margin: 0, padding: 0, height: '100vh', width: '100vw'}}>
            <Favourites />
            <Content />
            {/*<button onClick={addData}>add asset</button>*/}
            {/*<button onClick={getData}>get assets</button>*/}
            {/*<button onClick={() => {supabase.auth.signOut()}}>logout</button>*/}
            {/*<Treemap*/}
            {/*    width={730}*/}
            {/*    height={250}*/}
            {/*    data={data}*/}
            {/*    dataKey='shares'*/}
            {/*    aspectRatio={4 / 3}*/}
            {/*    stroke='black'*/}
            {/*    fill='#3fcf8e'*/}
            {/*/>*/}
            {/*<PieChart width={730} height={250}>*/}
            {/*    <Pie data={data} dataKey="shares" nameKey="name" cx="50%" cy="50%" fill="#3fcf8e" label />*/}
            {/*</PieChart>*/}
        </div>
    );
}