import './App.css';
import * as React from "react";
import Header from './components/Header/Header';
import Matches from './components/Matches/Matches';
import Stories from './components/Stories/Stories';
// import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  
  return (
    // <BrowserRouter>
    // <Routes>
    //   <Route path='/Users/ankit.rana/Projects/fancode/index.html' element={
    //     <>
    //       <Header/>
    //       <div className='content-container'>
    //         <Matches/>
    //         <Stories/>
    //       </div>
    //     </>
    //   }/>
    //   <Route path=""/>
    // </Routes>
    // </BrowserRouter>
    <>
      <Header/>
        <div className='content-container'>
          <Matches/>
          <Stories/>
        </div>
    </>
  );
}

export default App;
