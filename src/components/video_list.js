import React from 'react';
import VideoListItem from './video_list_item';

// this component doesn't really have any
// so a functional one would suffice
const VideoList = (props) => {
    // map through all video objects
    // and return an array of instances of video_list_item
    // console.log(props.videos);
    const videoItems = props.videos.map(video => {
        return <VideoListItem
            onVideoSelect={props.onVideoSelect}
            key={video.etag}
            video={video}
        />;
    });
    return (
        <ul className="col-md-4 list-group">
            {videoItems}
        </ul>
    );
};

export default VideoList;