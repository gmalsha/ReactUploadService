import React, { Component } from 'react';
import "./App.css";
import Upload from "./upload/Upload";



class App extends React.Component{
  render(){
   return(
      <div className="App">
        <header className="App-header">Zip-File Content Processor</header>
        <div className="Upload"><Upload/></div>
       
     </div>
    );
  }
}


export default App;