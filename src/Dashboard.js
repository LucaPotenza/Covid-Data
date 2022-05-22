import './Dashboard.css'
import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryLabel,
    VictoryTheme
} from "victory";
import React, {useContext} from 'react'
import useAxios from "axios-hooks";
import {CountriesContext, ErrorPanel, LoaderWidget} from "./App";
import {useState} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import {spacing} from "./Map";


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function Dashboard(){
    let [selected,setSelected] = useState(['cases','deaths'])

    let[dataC,country,setCountry] = useContext(CountriesContext)
    let dataB = []
    dataC.forEach((x) => {
        if(x.countryInfo.iso2 === country.code){
            dataB=selected.map((v)=>{return({x: v,y: x[v]})})
        }
        else{}
    })

    let theme = VictoryTheme.grayscale
    theme.axis.style.axis.stroke='white'
    theme.area.style.labels.fill='white'

    let [{data,loading,error}] = useAxios('https://disease.sh/v3/covid-19/all')
    if (loading) return <LoaderWidget/>
    if (error) return <ErrorPanel message={error} />
    let dataA=selected.map((v)=>{return({x: v,y: data[v]})})

    let options = []
    options=Object.keys(data).filter((x)=>{
        return(Number.isFinite(data[x]) && x!=='updated')
    }).map((x)=>{
        return({value: x,label: spacing(x)})
    })

    const height = 512;
    const width = 512;

    let jus = ''
    if(country.name !== ''){jus='space-around'}
    else{jus='center'}

    const Styles = {
        control: (provided,state) => ({ ...provided, backgroundColor: "grey",
            border: state.isFocused? '' : 'solid darkslategrey 1px',
            ":hover": {
                border: "white solid 1px"
            },
            width: '80vw',
            maxWidth: '500px'
        }),
        option: (styles, { isDisabled, isFocused }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? "darkslategrey" : undefined,
                color: isFocused ? "white" : "#dbdbdb",
                cursor: isDisabled ? "not-allowed" : "default"
            };
        },

        clearIndicator: (styles) => ({
            ...styles,
            color: "red",
            ":hover": {
                color: "white",
                backgroundColor: "rgba(256,0,0,0.3)"
            }
        }),

        menu: (styles) => ({
            ...styles,
            backgroundColor: "grey",
            color: "white",
            width: '80vw',
            maxWidth: '500px'
        }),

        multiValue: (styles) => {
            return {
                ...styles,
                backgroundColor: "darkslategrey"
            };
        },
        multiValueLabel: (styles) => ({
            ...styles,
            color: "white"
        }),
        multiValueRemove: (styles) => ({
            ...styles,
            color: "red",
            ":hover": {
                backgroundColor: "rgba(256,0,0,0.3)",
                color: "white"
            }
        })
    };


    const  handleChange = (option) => {
        option=option.map((x)=>{return(x.value)})
        setSelected(option)
    };

    return(
        <div>
            <div className='selectContainer'>
                <Select options={options} isMulti isSearchable isClearable
                        defaultValue={[options[0],options[2]]}
                        closeMenuOnSelect={false}
                        components={makeAnimated()}
                        styles={Styles}
                        onChange={handleChange}
                />
            </div>
            <div style={{display: 'flex',width: '90vw',maxWidth:'500px',margin: '0 auto',justifyContent: `${jus}`}}>
                <h1 style={{maxWidth:'200px'}}>{country.name}</h1>
                <h1>World</h1>
            </div>
            <svg viewBox='0 0 512 512' width='100%' height="45vh">
                <path className='virus' fill="currentColor" opacity='0.2' d="M483.55,227.55H462c-50.68,0-76.07-61.27-40.23-97.11L437,115.19A28.44,28.44,0,0,0,396.8,75L381.56,90.22c-35.84,35.83-97.11,10.45-97.11-40.23V28.44a28.45,28.45,0,0,0-56.9,0V50c0,50.68-61.27,76.06-97.11,40.23L115.2,75A28.44,28.44,0,0,0,75,115.19l15.25,15.25c35.84,35.84,10.45,97.11-40.23,97.11H28.45a28.45,28.45,0,1,0,0,56.89H50c50.68,0,76.07,61.28,40.23,97.12L75,396.8A28.45,28.45,0,0,0,115.2,437l15.24-15.25c35.84-35.84,97.11-10.45,97.11,40.23v21.54a28.45,28.45,0,0,0,56.9,0V462c0-50.68,61.27-76.07,97.11-40.23L396.8,437A28.45,28.45,0,0,0,437,396.8l-15.25-15.24c-35.84-35.84-10.45-97.12,40.23-97.12h21.54a28.45,28.45,0,1,0,0-56.89ZM224,272a48,48,0,1,1,48-48A48,48,0,0,1,224,272Zm80,56a24,24,0,1,1,24-24A24,24,0,0,1,304,328Z"/>
                <VictoryChart horizontal
                              height={height}
                              width={width}
                              padding={40}
                              standalone={false}
                              animate={{
                                  duration: 2000,
                                  onLoad: { duration: 1000 }
                              }}
                              domainPadding={50}
                >
                    <VictoryBar
                        style={{ data: { fill: "darkred" } }}
                        data={dataA}
                        y={(data) => (Math.abs(data.y))}
                        labels={({ datum }) => (`${numberWithCommas(datum.y)}`)}
                        barWidth={50}
                    />

                    <VictoryBar
                        style={{ data: { fill: "red" } }}
                        data={dataB}
                        y={(data) => (-Math.abs(data.y))}
                        labels={({ datum }) => (`${numberWithCommas(datum.y)}`)}
                        barWidth={50}
                    />

                    <VictoryAxis
                        width={width}
                        style={{
                            axis: { stroke: "white" },
                            ticks: { stroke: "white" },
                            tickLabels: { fontSize: 15, fill: "white" }
                        }}
                        tickLabelComponent={
                            <VictoryLabel
                                dx={0}
                                dy={-35}
                                textAnchor="end"
                            />
                        }
                        tickValues={dataA.map((point) => point.x).reverse()}
                    />
                    <VictoryAxis
                        orientation={"top"}
                        dependentAxis
                        tickFormat={(x) => {
                            let exp = ''
                            x=Math.abs(x)
                            if(x>=1000){exp = 'k';x=x/1000}
                            if(x>=1000){exp = 'M';x=x/1000}
                            if(x>=1000){exp = 'B';x=x/1000}
                            return(`${numberWithCommas(x)}${exp}`)
                        }}
                    />
                </VictoryChart>
            </svg>

        </div>
    )
}

export default Dashboard;