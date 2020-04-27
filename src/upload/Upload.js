import React, { Component } from 'react'
import ReactTable from "react-table"
import './Upload.css'
import uploadLogo from './upload-logo.svg'


class Upload extends React.Component{
 
  constructor(props){
    super(props)
    console.log('react:',React)
    console.log('ReactTable :',ReactTable);
    this.fileInputRef = React.createRef()
    this.state =
    {
      file:'',
      data:[],
      
    }

  ;
  

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
      const formData = new FormData();
      formData.append('zipFile',this.state.file);
    fetch('http://localhost:8080/upload', {
      // content-type header should not be specified!
      mode: 'no-cors',
      method: 'POST',
      body: formData
     })
      .then(response =>{ return response.json()} )
      .then( 
        this.startEventsource()
        )
      .catch(error => console.log(error)
    );
  }

  startEventsource(){
   console.log("event source created")
    var eventSource = new EventSource("http://localhost:8080/getAllInfo");
    eventSource.onmessage = e =>{
      this.setState({data :  [...this.state.data, JSON.parse(e.data)]});
      console.log(e.data);
    }

    }
  render(){
    this.columns = [
      {
        Header: "Zip Name",
        accessor: "zipName"
      },
      {
        Header: "Extracted Name",
        accessor: "extractedName"
      },
      {
        Header: "File Content",
        accessor: "fileContent"
      },
      {
        Header: "Country",
        accessor: "country"
      },
      {
        Header: "Status",
        accessor: "status"
      },
      {
        Header: "Date",
        accessor: "date"
      }
    ]


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
          <div>  
             <ReactTable  
                  data={this.state.data}  
                  columns={this.columns}  
                 
              />
          </div>      
      </div>
    );
  }

}

// class Table extends React.Component{
//   render(){
//     return(
// <table>
//   <tr>
//     <th>Zip Name</th>
//     <th>Extracted Name</th>
//     <th>File Content</th>
//     <th>Country</th>
//     <th>Status</th>
//     <th>Date</th>
// </tr>
// </table>
//     )
//     ;
//   }
// }

export default Upload