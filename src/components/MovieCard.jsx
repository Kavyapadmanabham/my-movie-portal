import React from 'react'

function MovieCard({movieObj, poster_path, name,handleAddtoWatchList, handleRemoveFromWatchList, watchlist}) {

  function doesContain(movieObj){
    for(let i = 0; i<watchlist.length; i++){
      if(watchlist[i].id === movieObj.id){
        return true
      }
    }
    return false
  }


  return (
    <div className = 'h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110  duration : 300 hover:cursor-pointer flex flex-col justify-between items-end'style = {{backgroundImage : `url(https://image.tmdb.org/t/p/w500${poster_path})`}}>

      {doesContain(movieObj) ? 
      <div onClick={()=>(handleRemoveFromWatchList(movieObj))} className= 'h-8 w-8 m-4 flex justify-center items-center rounded-lg bg-gray-900/60'>
        &#10060;</div> : 
      <div onClick={()=>(handleAddtoWatchList(movieObj))} className= 'h-8 w-8 m-4 flex justify-center items-center rounded-lg bg-gray-900/60'>
        &#128540;
      </div>}

      
      <div className='text-white text-xl w-full p-2 text-center bg-gray-900/60'>
        {name}
        </div>
    </div>
  )
}

export default MovieCard