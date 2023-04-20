import {useEffect, useState} from "react";
import {supabase} from "../App";

export default function Home() {
    const [data, setData] = useState();

    async function getData() {
        const { data, error } = await supabase.functions.invoke("my-assets", {
            method: "GET"
        })
        console.log(data)
    }

    async function addData() {
        const { data, error } = await supabase.functions.invoke("my-assets", {
            method: "POST",
            body: {
                asset: {
                    name: "testName2",
                    ticker: "TST2",
                    type: "testType2",
                    shares: 400
                }
            }
        })
        console.log(data)
    }

    return (
        <div>
            <button onClick={addData}>add asset</button>
            <button onClick={getData}>get assets</button>
        </div>
    );
}