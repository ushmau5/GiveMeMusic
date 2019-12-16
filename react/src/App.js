import React from 'react';
import 'typeface-roboto';
import './App.css';

import SearchPanel from './components/SearchPanel';
import PlaylistTable from './components/PlaylistTable';
import ConvertButton from './components/ConvertButton';
import DownloadButton from './components/DownloadButton';

import STATUS from './status';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: STATUS.READY_TO_SEARCH,
      searchField: 'https://www.youtube.com/playlist?list=PLYSov4w3uC_H_bVdV5ODrtcrYi-2DSo9K',
      searchResults: {},
      selectedResults: [],
      downloadId: ''
    }

    this.setSearchField = this.setSearchField.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
    this.setSelectedResults = this.setSelectedResults.bind(this);
    this.postDownload = this.postDownload.bind(this);
    this.getDownload = this.getDownload.bind(this);
  }

  setSearchField(searchField) {
    this.setState({searchField});
  }

  getSearchResults() {
    let playlistId = this.state.searchField.split('=')[1];
    this.setState({ status: STATUS.SEARCHING});
    fetch(`http://localhost:5000/playlist/${playlistId}`)
    .then(response => response.json())
    .then(jsonData => this.setState({ status: STATUS.READY_TO_CONVERT, searchResults: jsonData }))
    .catch((error) => {
      this.setState({ status: STATUS.READY_TO_SEARCH })
      console.log(error)
    })
  }

  setSelectedResults(selectedResults) {
    this.setState({selectedResults})
  }

  postDownload() {
    let url_list = this.state.selectedResults.map(selectedVideoIndex => this.state.searchResults[selectedVideoIndex].url)
    this.setState({ status: STATUS.CONVERTING })
    fetch('http://localhost:5000/download', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        'url_list': url_list
      })
    })
    .then(response => response.json())
    .then(jsonData => this.setState({ status: STATUS.READY_TO_DOWNLOAD, downloadId: jsonData.download_id}))
    .catch((error) => {
      this.setState({ status: STATUS.READY_TO_CONVERT })
      console.log(error)
    })
  }

  getDownload() {
    fetch(`http://localhost:5000/download/${this.state.downloadId}`)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${this.state.downloadId}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => console.log(error));
  }


  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <SearchPanel status={this.state.status} searchField={this.state.searchField} onUpdateSearchField={this.setSearchField} onSearchButtonClick={this.getSearchResults}/>
        <PlaylistTable status={this.state.status} searchResults={this.state.searchResults} selectedResults={this.state.selectedResults} setSelectedResults={this.setSelectedResults}/>
        <ConvertButton status={this.state.status} onConvertButtonClick={this.postDownload} selectedResults={this.state.selectedResults}/>
        <DownloadButton status={this.state.status} onDownloadButtonClick={this.getDownload}/>
      </React.Fragment>
    )
  }
}

export default App;
