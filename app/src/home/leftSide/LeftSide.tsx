import {Colors} from "../../shared/colors";
import Navigation from "./Navigation";
import Favourites from "./Favourites";

export default function LeftSide() {
    return(
        <div style={{
            flex: '1 0 15%',
            // backgroundColor: 'green',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            borderRight: 'solid',
            borderRightColor: Colors.Secondary
        }}>
            <Navigation />
            <Favourites />
        </div>
    )
}