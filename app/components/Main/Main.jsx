import Header from '../Header/Header';
import Footer from '../Footer';
import Playlist from './Playlist';

let Main = (props) => {
    return (
        <div className="full-height">
            <Header search={true} playlist={props.params.playlist_id} />
            <Playlist playlist={props.params.playlist_id} />
            <Footer />
        </div>
    );
};

export default Main;
