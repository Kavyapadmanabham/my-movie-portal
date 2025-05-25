import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Movies from './components/Movies'
import WatchList from './components/WatchList'
import Banner from './components/Banner'
import {BrowserRouter, Routes, Route} from  'react-router-dom'
import SearchResults from "./components/SearchResults";

function App() {

  let [watchlist , setWatchList] = useState([])

  let handleAddtoWatchList =(movieObj) =>{
    let newWatchList = [...watchlist, movieObj]
    localStorage.setItem('store', JSON.stringify(newWatchList))
    setWatchList(newWatchList)
    console.log(newWatchList)
  }

  let handleRemoveFromWatchList=(movieObj)=>{
    let filteredList = watchlist.filter((movie)=>{
      return movie.id != movieObj.id
    })
    localStorage.setItem('store' , JSON.stringify(filteredList))
    setWatchList(filteredList)
  }

  useEffect(()=>{
    let moviesFromLocalstorage = localStorage.getItem('store')
    if(!moviesFromLocalstorage){
      return
    }
    setWatchList(JSON.parse(moviesFromLocalstorage))
  } ,[])

  return (
    <>
    <BrowserRouter>
    <Navbar/>

    <Routes>
      <Route path = '/' element = {
        <>
        <Movies watchlist ={watchlist} handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchList = {handleRemoveFromWatchList}/> </>
        }/>
      <Route path = '/watchlist' element = {<WatchList watchlist={watchlist} setWatchList={setWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList}/>}/>
     <Route
  path="/search"
  element={
    <SearchResults
      watchlist={watchlist}
      handleAddtoWatchList={handleAddtoWatchList}
      handleRemoveFromWatchList={handleRemoveFromWatchList}
    />
  }
/>
    </Routes>


    </BrowserRouter>
    </>
  )
}

export default App