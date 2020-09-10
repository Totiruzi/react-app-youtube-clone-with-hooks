import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import youtube from '../api/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const KEY = 'AIzaSyA5hvJ7N4rNSNnUaOO_S-HNKGYct6UOn4Q';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    onTermSubmit('dance');
  }, []);

  const onTermSubmit = async (term) => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
        part: 'snippet',
        type: 'video',
        maxResults: 5,
        key: KEY,
      },
    });

    setVideos(response.data.items);
    setSelectedVideo(response.data.items[0]);
  };

  // this helper method can be used in place of argumant provided for the onVideoSelect props on VideoDetail 
  // -> onVideoSelect= {(video) => setSelectedVideo(video)}-< the current code is the equivilent
  // const onVideoSelect = (video) => {
  //   setSelectedVideo(video);
  // };

  return (
    <div className="ui container">
      <SearchBar onTermSubmit={onTermSubmit} />
      <div className="ui stackable grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail video={selectedVideo} />
          </div>
          <div className="five wide column">
            <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
