import Map from "./Map";
import './App.css';
import useAxios from "axios-hooks";
import {Button, Collapse} from 'react-bootstrap'
import Dashboard from "./Dashboard";
import React, {createContext, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import History from "./History";
import Footer from "./Footer";


export function LoaderWidget() {
    return (
        <div className="App">
        <svg viewBox='0 0 512 512' width='50vw' height='45vh' style={{margin: '3em auto'}}>
            <path className='virus-app'
                  fill="currentColor"
                  opacity='0.2'
                  d="M483.55,227.55H462c-50.68,0-76.07-61.27-40.23-97.11L437,115.19A28.44,28.44,0,0,0,396.8,75L381.56,90.22c-35.84,35.83-97.11,10.45-97.11-40.23V28.44a28.45,28.45,0,0,0-56.9,0V50c0,50.68-61.27,76.06-97.11,40.23L115.2,75A28.44,28.44,0,0,0,75,115.19l15.25,15.25c35.84,35.84,10.45,97.11-40.23,97.11H28.45a28.45,28.45,0,1,0,0,56.89H50c50.68,0,76.07,61.28,40.23,97.12L75,396.8A28.45,28.45,0,0,0,115.2,437l15.24-15.25c35.84-35.84,97.11-10.45,97.11,40.23v21.54a28.45,28.45,0,0,0,56.9,0V462c0-50.68,61.27-76.07,97.11-40.23L396.8,437A28.45,28.45,0,0,0,437,396.8l-15.25-15.24c-35.84-35.84-10.45-97.12,40.23-97.12h21.54a28.45,28.45,0,1,0,0-56.89ZM224,272a48,48,0,1,1,48-48A48,48,0,0,1,224,272Zm80,56a24,24,0,1,1,24-24A24,24,0,0,1,304,328Z"/>
        </svg>
        </div>
    );
}

export function ErrorPanel({message}) {
    let err = JSON.parse(JSON.stringify(message, null, 2))
    const [open,setOpen] = useState(false)

    return (
        <div className="App">
            <h1 style={{ margin: '3em',color:'white'}}>Error : {err.status}</h1>
            <h2>{err.message}</h2>
            <Button onClick={(e)=> {
                setOpen(!open)
                open?e.target.querySelector('svg').id='open':e.target.querySelector('svg').id='close'
            }} variant="dark" style={{border: 'solid white 1px',margin: '2em auto',display:'flex'}}>
                <svg viewBox='0 0 10 10' className='icon'> <path d='M 0 5 L 5 8 L 10 5' fill='none' stroke='white' strokeWidth='1px'/></svg>
                expand</Button>
            <Collapse in={open}>
                    <pre>{JSON.stringify(message, null, '\t')}</pre>
            </Collapse>
            <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin></script>
        </div>
    );
}

export const CountriesContext = createContext()

function App() {
    let [country,setCountry] = useState({code: '',name: ''})

    let [{data,loading,error}] = useAxios('https://disease.sh/v3/covid-19/countries');
    if (loading) return <LoaderWidget/>
    if (error) return <ErrorPanel message={error}/>

  return (
    <div className="App">
        <CountriesContext.Provider value={[data,country,setCountry]}>
            <h1 style={{fontSize: '5em'}}>Covid Data</h1>
            <Map/>
            <Dashboard/>
            <History/>
            <Footer/>
        </CountriesContext.Provider>
    </div>
  );
}

export default App;
