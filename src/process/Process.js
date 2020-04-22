import React, { Component } from 'react'
import './Process.css'


class Process extends React.Component{
    constructor(props){
        super(props)
         this.state ={
            error: '',
            msg: ''
        }
        this.uploadFile = this.uploadFile.bind(this)
    }

     uploadFile(file) {
        fetch('http://localhost:8080/upload', {
          // content-type header should not be specified!
          method: 'POST',
          body: file,
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
            <div>
                <h4 style={{color: 'red'}}>{this.state.error}</h4>
                <h4 style={{color: 'green'}}>{this.state.msg}</h4>
                <button onClick={this.uploadFile}>Process File</button>
            </div>
        );
    }
}

export default Process