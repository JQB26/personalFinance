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

export default function Dashboards({data}) {
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

    // TODO: fix that code
    let groupByTypeSum = {
        Cash: 0,
        Bank: 0
    }
    data.forEach((el) => {
        groupByTypeSum[el.type] += el.shares
    })
    let dataGroupByTypeSum = [
        {
            name: 'Cash',
            shares: groupByTypeSum.Cash
        },
        {
            name: 'Bank',
            shares: groupByTypeSum.Bank
        }
    ]

    const groupByCategory = data.reduce((group, el) => {
        const { type } = el;
        group[type] = group[type] ?? [];
        group[type].push(el);
        return group;
    }, {});

    return(
        <div style={{
            flex: '1 0 auto',
            // backgroundColor: 'gray',
            marginTop: 30,
            marginLeft: 60,
            marginRight: 50,
            maxHeight: 'calc(86vh - 30px)',
            overflow: 'auto'
        }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Item>
                        <ResponsiveContainer width="90%" height="90%">
                            <Treemap width={0} height={0} data={data} dataKey="shares" stroke="#fff" fill="#8884d8">
                                <Tooltip />
                            </Treemap>
                        </ResponsiveContainer>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <ResponsiveContainer width="90%" height="90%">
                            <Treemap width={0} height={0} data={dataGroupByTypeSum} dataKey="shares" aspectRatio={4 / 3} stroke="#fff" fill="#8884d8">
                                <Tooltip />
                            </Treemap>
                        </ResponsiveContainer>
                    </Item>
                </Grid>
                <Grid item xs={6}>
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
                                <Bar dataKey="shares" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Item>
                </Grid>
                <Grid item xs={6}>
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
                                <Bar dataKey="shares" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Item>
                </Grid>
                <Grid item xs={6}>
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
                                <Bar dataKey="shares" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Item>
                </Grid>
                <Grid item xs={6}>
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
                                <Bar dataKey="shares" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={500} height={500}>
                                <Pie
                                    dataKey="shares"
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
