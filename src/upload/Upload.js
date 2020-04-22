import React, { Component } from 'react'
import './Upload.css'
import uploadLogo from './upload-logo.svg'
import Process from "../process/Process.js";

class Upload extends React.Component{
  constructor(props){
    super(props)
    this.fileInputRef = React.createRef()
    this.state =
    {
      file:''
    }

    this.openFileDialog = this.openFileDialog.bind(this)
    this.onFilesAdded = this.onFilesAdded.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
  }
  openFileDialog() {
    if (this.props.disabled) return
    this.fileInputRef.current.click()
  }
  onFilesAdded(event){
    event.preventDefault();
    this.setState({
      file: event.target.files[0]
  })}

  uploadFile() {
    fetch('http://localhost:8080/upload', {
      // content-type header should not be specified!
      mode: 'no-cors',
      method: 'POST',
      body: this.state.file
    })
      .then(response => response.json())
      .then(success => {
        // Do something with the successful response
      })
      .catch(error => console.log(error)
    );
  }

 
  render(){
    return(
      <div className="Upload">
        <div className="Content">
          <div className="Dropzone" onClick={this.openFileDialog}>
          <input
              ref={this.fileInputRef}
              className="FileInput"
              type="file"
              multiple
              onChange={this.onFilesAdded}
            />
          <img
            alt="upload"
            className="Icon"
            src={uploadLogo}
            />
            
          </div>
          <div className="Filename">
            <span>{this.state.file.name}</span>
          </div>
          <button onClick={this.uploadFile}>Process File</button>
          
       
        </div>
        <div className="Table">
          <Table/>
        </div>
      </div>
    );
  }

}

class Table extends React.Component{
  render(){
    return(
<table>
  <tr>
    <th>Zip Name</th>
    <th>Extracted Name</th>
    <th>File Content</th>
    <th>Country</th>
    <th>Status</th>
    <th>Date</th>
</tr>
</table>
    )
    ;
  }
}

export default Upload