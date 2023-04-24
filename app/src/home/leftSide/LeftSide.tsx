import {Colors} from "../../shared/colors";
import Navigation from "./navigation/Navigation";
import Favourites from "./favurites/Favourites";

export default function LeftSide({activePage, setActivePage, favouritesData}) {
    return(
        <div id={'leftSide'} style={{
            flex: '1 0 15%',
            // backgroundColor: 'green',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            borderRight: 'solid',
            borderRightColor: Colors.Secondary
        }}>
            <Navigation activePage={activePage} setActivePage={setActivePage} />
            <Favourites favouritesData={favouritesData} />
        </div>
    )
}