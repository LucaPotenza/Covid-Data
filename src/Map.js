import {WorldMap} from "react-svg-worldmap";
import './Map.css'
import {useContext, useState} from "react";
import {CountriesContext} from "./App";

export const spacing = (x) => {
    x = x.replace(/([A-Z])/g," $1")
    x = x.charAt(0).toUpperCase() + x.slice(1)
    return x
}

function Map() {
    let [selected,setSelected] = useState('cases')
    let map=[]
    const [data,country,setCountry] = useContext(CountriesContext)

    map = data.map(x => {
        if(x.countryInfo.iso2 !== null) {
            return ({country: x.countryInfo.iso2.toLowerCase(), value: x[selected]})
        }
        else {return ({country: '0', value: ''})}
    })
    map=map.filter(x=>{return(x.country !== '0')})

    const clickAction = ({countryCode,countryName}) => {
        setCountry({code: countryCode,name: countryName})
    };

    return(
        <div className='MapContainer'>
        <WorldMap
            data={map}
            size='responsive'
            color='red'
            backgroundColor='#101520'
            frameColor='white'
            frame='true'
            title={<div style={{padding: '2em'}}>
                    <select id="country" value={selected} onChange={(e)=>{setSelected(e.target.value)}}>
                        {
                            Object.keys(data[0]).filter((x)=>{
                                return(Number.isFinite(data[0][x]) && x!=='updated')
                            }).map((x,index)=>{
                                return(<option key={index}>{spacing(x)}</option>)
                            })
                        }
                    </select>
                </div>
                }
            borderColor='white'
            onClickFunction={clickAction}
            style={{margin: '0 auto'}}
        />
            <p style={{fontSize: '0.8em',padding: 0,margin: 0}}>click on a country</p>
        </div>
    )
}

export default Map;