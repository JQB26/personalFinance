import {Colors} from "../../../shared/colors";
import FavouriteComponent from "./FavouriteComponent";

export default function Favourites({favouritesData}) {
    const groups = favouritesData.reduce((groups, item) => {
        const group = (groups[item.type] || []);
        group.push(item);
        groups[item.type] = group;
        return groups;
    }, {});

    return(
        <div style={{
            flex: '1 0 auto',
            marginTop: 30,
            padding: 18,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start'
        }}>
            <div style={{
                fontSize: 24,
                fontWeight: 'bolder',
                color: Colors.Light,
                marginBottom: 20
            }}>
                Favourites
            </div>
            <div style={{
                fontSize: 18,
                color: Colors.Light,
                marginBottom: 10
            }}>
                Cash
            </div>
            {/*TODO: fix it*/}
            {groups['Cash'] && groups['Cash'].map((fav) => (
                <FavouriteComponent favouriteItem={fav} />
            ))}
            <div style={{
                fontSize: 18,
                color: Colors.Light,
                marginBottom: 10
            }}>
                Bank
            </div>
            {groups['Bank'] && groups['Bank'].map((fav) => (
                <FavouriteComponent favouriteItem={fav} />
            ))}
        </div>
    )
}
