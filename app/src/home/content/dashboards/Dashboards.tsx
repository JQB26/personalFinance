import {Grid, Paper, styled} from "@mui/material";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    Treemap,
    XAxis,
    YAxis
} from "recharts";
import React from "react";
import {Colors} from "../../../shared/colors";

export default function Dashboards({inputData}) {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#1A2027',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 350,
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }));

    const data = inputData.reduce((accumulator, currentObject) => {
        const modifiedObject = {...currentObject, totalValueUSD: Number(currentObject.totalValueUSD?.toFixed(2))}
        accumulator.push(modifiedObject)
        return accumulator
    }, [])

    console.log({inputData, data})

    // TODO: fix that code
    let groupByTypeSum = {
        Cash: 0,
        Bank: 0
    }
    data.forEach((el) => {
        groupByTypeSum[el.type] += (el.totalValueUSD || 0)
    })
    let dataGroupByTypeSum = [
        {
            name: 'Cash',
            totalValueUSD: Number(groupByTypeSum.Cash.toFixed(2))
        },
        {
            name: 'Bank',
            totalValueUSD: Number(groupByTypeSum.Bank.toFixed(2))
        }
    ]

    const groupByCategory = data.reduce((group, el) => {
        const { type } = el;
        group[type] = group[type] ?? [];
        group[type].push(el);
        return group;
    }, {});

    const dashboardTitleStyle = {
        display: 'flex',
        justifyContent: 'center',
        color: Colors.Light,
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10
    }

    return(
        <div style={{
            flex: '1 0 auto',
            marginTop: 30,
            marginLeft: 60,
            marginRight: 50,
            maxHeight: 'calc(86vh - 30px)',
            overflow: 'auto'
        }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <div style={dashboardTitleStyle}>All assets by total USD value</div>
                    <Item>
                        <ResponsiveContainer width="90%" height="90%">
                            <Treemap width={0} height={0} data={data} dataKey="totalValueUSD" stroke="#fff" fill="#8884d8">
                                <Tooltip />
                            </Treemap>
                        </ResponsiveContainer>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <div style={dashboardTitleStyle}>Total USD value by grouped Type</div>
                    <Item>
                        <ResponsiveContainer width="90%" height="90%">
                            <Treemap width={0} height={0} data={dataGroupByTypeSum} dataKey="totalValueUSD" aspectRatio={4 / 3} stroke="#fff" fill="#8884d8">
                                <Tooltip />
                            </Treemap>
                        </ResponsiveContainer>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <div style={dashboardTitleStyle}>All assets by total USD value</div>
                    <Item>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 15,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="totalValueUSD" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <div style={dashboardTitleStyle}>Total USD value by grouped Type</div>
                    <Item>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={dataGroupByTypeSum}
                                margin={{
                                    top: 15,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="totalValueUSD" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <div style={dashboardTitleStyle}>Cash assets by total USD value</div>
                    <Item>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={groupByCategory['Cash']}
                                margin={{
                                    top: 15,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="totalValueUSD" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <div style={dashboardTitleStyle}>Bank assets by total USD value</div>
                    <Item>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={groupByCategory['Bank']}
                                margin={{
                                    top: 15,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="totalValueUSD" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <div style={dashboardTitleStyle}>All assets Pie Chart</div>
                    <Item>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={500} height={500}>
                                <Pie
                                    dataKey="totalValueUSD"
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                />
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Item>
                </Grid>
            </Grid>
        </div>
    )
}
