import React, { Component } from 'react'
import "./App.css";
import Upload from "./upload/Upload";


class App extends React.Component{
  render(){
   return(
      <div className="App">
        <header className="App-header">Zip-File Content Processor</header>
        <di className="Upload"><Upload/></di>
     </div>
    );
  }
}


export default App;