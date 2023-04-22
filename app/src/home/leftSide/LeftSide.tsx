import {Colors} from "../../shared/colors";
import Navigation from "./navigation/Navigation";
import Favourites from "./Favourites";

export default function LeftSide({activePage, setActivePage}) {
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
            <Navigation activePage={activePage} setActivePage={setActivePage} />
            <Favourites />
        </div>
    )
}