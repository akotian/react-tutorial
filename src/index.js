import _ from 'lodash';
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar.js'
import VideoList from './components/video_list.js'
import VideoDetail from './components/video_detail.js'
const API_KEY = 'youtube_api_key_here';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'videos': [],
      'selectedVideo': null
    };
    this.videoSearch('dogs');
  }

  videoSearch(term) {
    YTSearch({'key': API_KEY, 'term': term},  (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]});
    });
  }

  render() {
    const videoSearch = _.debounce((term) => this.videoSearch(term), 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          videos={this.state.videos}
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) } />
      </div>
    );
  }
}

ReactDom.render(
  <App />,
  document.querySelector('.container'));
