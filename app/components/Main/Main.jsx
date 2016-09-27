import Header from '../Header/Header';
import Footer from '../Footer';
import Playlist from './Playlist';

let Main = (props) => {
    return (
        <div className="full-height">
            <Header search={true} id={props.params.playlist_id} />
            <Playlist id={props.params.playlist_id} />
            <Footer />
        </div>
    );
};

export default Main;
