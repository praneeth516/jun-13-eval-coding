import React, { useEffect, useState } from "react";
import ButtonComponent from "./components/ButtonComponent";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([{}]);
  const [pdata, setPdata] = useState([{}]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [sort, setSort] = useState(true);
  const [Length, setLength] = useState(0);

  useEffect(() => {
    const fetchdata = () =>{
      fetch("https://json-server-mocker-masai.herokuapp.com/cities").then((res) => res.json())
      .then( info => info.sort(function(a,b){return a.population - b.population;})).then(cities => {setData(cities); setloading(false); setPdata(cities.slice(0,10)); setLength(cities.length/10);})
    }
   fetchdata();
   
  },[]);

  const sortbyIncreasing = () =>{
    setSort(prev =>  !prev)
    const sorted =data.sort(function(a,b){return a.population - b.population;})
    setData([...sorted])
    setPdata(sorted.slice(0,10));
  }
  const sortbyDecreasing = () =>{
    setSort(prev =>  !prev)
    const sorted =data.sort(function(a,b){return b.population - a.population;})
    setData([...sorted]);
    setPdata(sorted.slice(0,10));
  }
  const prev = () =>{
    setpage(prev => prev-1);
    setPdata(data.slice((page-1)*10 - 10, (page-1)*10))

  }
  const next = () =>{
    setpage(prev => prev+1);
    setPdata(data.slice((page+1)*10 - 10, (page+1)*10))

  }
  return (
    <div className="App">
      {loading && <div id="loading-container"></div>}
      {!loading && <table>
        <tr>
          <th>
            ID
          </th>
          <th>
            CITY NAME
          </th>
          <th>
            COUNTRY NAME
          </th>
          <th>
            POPULATION
          </th>
          </tr>
          {pdata.map(ele => <tr key={ele.id}>
            <td>{ele.id}</td>
            <td>{ele.name}</td>
            <td>{ele.country}</td>
            <td>{ele.population}</td>
          </tr>)}
      </table>}

      <div>
        <ButtonComponent id="SORT_BUTTON" title={sort ? 'Sort by Decreasing Population' : `Sort by Increasing Population`} onClick={sort ? sortbyDecreasing : sortbyIncreasing }/>
        <ButtonComponent disabled={page===1}  title="PREV" id="PREV" onClick={prev} />
        <ButtonComponent disabled={page===Length} id="NEXT" title="NEXT" onClick={next} />
      </div>
    </div>
  );
}