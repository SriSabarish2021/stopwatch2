import React, { useRef, useState, useEffect} from 'react'
import './Stopwatch.css'
const Stopwatch = () => {
    const [isrunning,setisrunning]=useState(false)
    const [elapsedtime,setelapsedtime]=useState(0)
    const intervalref=useRef(null)
    const strtref=useRef(0)

    useEffect(() => {
      
        if(isrunning){
            intervalref.current=setInterval(() => {
                setelapsedtime(Date.now()-strtref.current)
            }, 10);
        }
    
      return () => {
        clearInterval(intervalref.current)
      }
    }, [isrunning])
    
    let start=()=>{
        strtref.current=Date.now()-elapsedtime
        setisrunning(true)
    }
    let stop=()=>{
        setisrunning(false)
    }
    let reset=()=>{
        setelapsedtime(0)
        strtref.current=0
        setisrunning(false)
    }
    let formattime=()=>{
        let hour=Math.floor(elapsedtime/(1000*60*60)).toString().padStart(2,0)
        let minites=Math.floor(elapsedtime/(1000*60)%60).toString().padStart(2,0)
        let seconds=Math.floor(elapsedtime/(1000)%60).toString().padStart(2,0)
        let millisec=Math.floor((elapsedtime%1000)/10).toString().padStart(2,0)

        return `${minites} : ${seconds} : ${millisec}`
    }
  return (
    <div className='container'>
        <div className='placement'>
            <p className='timer'>{formattime()}</p>
        </div>
        <div className='btn'>
            <button className='indibtn blue' onClick={()=>start()}>Start</button>
            <button className='indibtn' onClick={()=>reset()}>Reset</button>
            <button className='indibtn red' onClick={()=>stop()}>Stop</button>
        </div>
    </div>
  )
}

export default Stopwatch