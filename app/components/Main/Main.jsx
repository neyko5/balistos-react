import Header from '../Header/Header';
import Footer from '../Footer';
import Playlist from './Playlist';

function Main(props){
    return (
        <div className="full-height">
            <Header search={true} playlist={props.params.playlist_uri} />
            <Playlist playlist={props.params.playlist_uri} />
            <Footer />
        </div>
    );
};

export default Main;
