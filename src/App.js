import "./App.css";
import "./style.css";
import {useState} from "react";
import Papa from "papaparse";

function App() {
    const [cache, setCache] = useState(new Set());

    const [values, setValues] = useState([]);

    const [item, setItem] = useState();
    const [dupl, setDupl] = useState(false);

    const changeHandler = (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {

                const valuesArray = [];


                results.data.map((d) => {
                    valuesArray.push(Object.values(d));
                });
                setValues(valuesArray);
            },
        });
    };

    const handeGenerate = () => {
        const ind = Math.floor(Math.random() * values.length);
        if (cache.has(ind)) {
            setDupl(true);
            return;
        } else {
            const newCache = new Set(cache);
            newCache.add(ind);
            setCache(newCache);
            setItem(values[ind]);
            setDupl(false);
        }
    }

    return (
        <div className="parent-container">
            <div className="rectangle-container">
                <h1>РАНДОМАЙЗЕР ИЗ СПИСКА</h1>
                <input type="file" id="csv-file" accept=".csv" onChange={changeHandler}/>
                <br/>
                <br/>
                <textarea id="input-field" className="custom-input"
                          placeholder="Добавьте по одному участнику в каждой строке..."/>
                <br/>
                <br/>
                <button className="button1" onClick={handeGenerate}>Выбрать победителя</button>
                <p> Победитель: <a href={item} target= '_blank'>{item} </a></p>
            </div>
        </div>
    )
}

export default App;


