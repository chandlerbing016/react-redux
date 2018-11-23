// create a new component
// this component should produce some html
import React, { Component } from 'react';
import _ from 'lodash';
import ReactDOM from "react-dom";
import YTSearch from 'youtube-api-search';

import SearchBar from "./components/searchbar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

const API_KEY = 'AIzaSyA11MbiBSEO0qfqyFuGdT5DQCNFBARzuNc';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('');
    }

    videoSearch(term) {
        // it's a promise; so rendering might happen before this could finish
        // which means, this.state.videos is empty on first render
        // so a child must check before utilising any props passed to it
        YTSearch({ key: API_KEY, term: term }, videos => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        // we're gonna handle throttling with loadsh
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 450);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />

                <VideoDetail video={this.state.selectedVideo} />

                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}
                />
            </div>
        ); // passing prop to videolist
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));

// so we just instantiated this component App ( like: <App /> )
// and insert this produced html into DOM (container class)