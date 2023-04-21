import {Grid, Paper, styled} from "@mui/material";

export default function Dashboards() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#1A2027',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 300,
        marginBottom: 20,
    }));

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
                    <Item>1</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>2</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>3</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>4</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>1</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>2</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>3</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>4</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>1</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>2</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>3</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>4</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>1</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>2</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>3</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>4</Item>
                </Grid>
            </Grid>
        </div>
    )
}
