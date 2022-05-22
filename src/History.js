import useAxios from "axios-hooks";
import React, {useState} from "react";
import {ErrorPanel, LoaderWidget} from "./App";
import {
    createContainer,
    VictoryAxis,
    VictoryBrushContainer,
    VictoryChart, VictoryLegend,
    VictoryLine, VictoryTooltip
} from "victory";
import {numberWithCommas} from "./Dashboard";
import './History.css'

function Chart({data}){
    const color = ["red","green","blue"]

    const maxPoints=100

    const rounding = (x) => {
        let exp = ''
        if(x>=1000){exp = 'k';x=x/1000}
        if(x>=1000){exp = 'M';x=x/1000}
        if(x>=1000){exp = 'B';x=x/1000}
        x=Math.round(x)
        return(`${numberWithCommas(x)} ${exp}`)
    }

    const getEntireDomain = () => {
        const X = []
        const Y = []
        Object.keys(data).forEach((d)=>{
            data[d].forEach((c)=> {
                X.push(c.x)
            })
            data[d].forEach((c) => {
                Y.push(c.y)
            })
        })

        return {x: [X[0],X[X.length-1]],y: [Math.min(...Y),Math.max(...Y)]}
    }

    const [dom,setDom] = useState(getEntireDomain())

    const getData=(fullData) => {
        const filtered = fullData.filter((d) => (d.x>=dom.x[0] && d.x<=dom.x[1]))
        return reducePoint(filtered)
    }

    const reducePoint=(filtered)=>{
        if (filtered.length > maxPoints ) {
            const k = Math.ceil(filtered.length / maxPoints);
            return filtered.filter(
                (d, i) => ((i % k) === 0)
            );
        }
        return filtered;
    }

    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

    return(
        <div id='container'>
            <VictoryChart
                width={800} height={300}
                domain={getEntireDomain()}
                padding={{top: 50, left: 70, right: 50, bottom: 30}}
                scale={{x: "time"}}
                containerComponent={
                    <VictoryZoomVoronoiContainer responsive={true}
                                          zoomDimension="x"
                                          zoomDomain={dom}
                                          onZoomDomainChange={(x)=>{setDom(x)}}
                                                 labels={({ datum }) => {

                                                     return(`${datum.childName} \n ${datum.x.toLocaleDateString()} \n ${rounding(datum.y)} `)
                                                 }}
                                                 labelComponent={
                                                     <VictoryTooltip
                                                         flyoutWidth={90}
                                                         flyoutStyle={{stroke: "black",strokeWidth: 1,fill: 'grey'}}/>
                                                 }
                    />
                }
            >
                <VictoryLegend
                    x={100}
                    data={Object.keys(data).map((d,i) => {
                        return({name: d,symbol:{fill: color[i]}})
                    })}
                />
                <VictoryAxis dependentAxis
                             tickFormat={(x) => (rounding(x))}
                />
                <VictoryAxis/>
                {
                    Object.keys(data).map((d,i)=>(
                        <VictoryLine
                            name={d}
                            style={{
                                data: {stroke: color[i]}
                            }}
                            data={getData(data[d])}
                        />
                    ))
                }
            </VictoryChart>

            <VictoryChart
                width={800}
                height={90}
                scale={{x: "time"}}
                domain={getEntireDomain()}
                padding={{top: 0, left: 70, right: 50, bottom: 30}}
                containerComponent={
                    <VictoryBrushContainer responsive={true}
                                           brushDimension="x"
                                           brushDomain={dom}
                                           onBrushDomainChange={(x)=>{setDom(x)}}
                                           brushStyle={{fill: "white", fillOpacity: 0.1}}
                    />
                }
            >
                <VictoryAxis
                    tickFormat={(x) => new Date(x).getFullYear()}
                />
                {Object.keys(data).map((d,i) => (
                    <VictoryLine
                        style={{
                            data: {stroke: color[i]}
                        }}
                        data={reducePoint(data[d])}
                    />
                ))}
            </VictoryChart>
        </div>
    )
}

function History(){
    let [{data,loading,error}] = useAxios('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
    if (loading) return <LoaderWidget/>
    if (error) return <ErrorPanel message={error} />

    let Data = {}

    Object.keys(data).forEach((d) => {
        const thisData = data[d]
        Data[d] = Object.keys(thisData).map(item => {return({x: new Date(item),y: thisData[item]})})
    })

    return (
        <div style={{margin: '0 auto',width: '100%',maxWidth: '900px'}}>

            <h1>Histical Worldwide Data</h1>

            <Chart data={Data} />

        </div>
    )
}

export default History