import { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [text, setText] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const [textEng, setTextEng] = useState("");
  const [textEngFilter, setTextEngFilter] = useState("");
  const [words, setWords] = useState([]);

  const submit = () => {
    const data = {
      eng: textEng,
      az: text,
    };
    setWords((prev) => {
      localStorage.setItem(
        "wordsAzEng",
        JSON.stringify({ data: [...prev, data] })
      );
      return [...prev, data];
    });
    setText("");
    setTextEng("");
  };

  useEffect(() => {
    if (localStorage.getItem("wordsAzEng")) {
      setWords(JSON.parse(localStorage.getItem("wordsAzEng")).data);
    }
  }, []);

  return (
    <div className="p-3 bg-dark text-white vh-100">
      Filter:
      <div className="mb-3 w-25">
        <label htmlFor="exampleInputEmail1" className="form-label">
          İngilis dilinə görə axtar
        </label>
        <input
          value={textEngFilter}
          onChange={(e) => setTextEngFilter(e.target.value)}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3 w-25">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Azərbaycan dilinə görə axtar
        </label>
        <input
          value={textFilter}
          onChange={(e) => setTextFilter(e.target.value)}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <hr />
      <div className="mb-3 w-25">
        <label htmlFor="exampleInputEmail1" className="form-label">
          İngilis dili
        </label>
        <input
          value={textEng}
          onChange={(e) => setTextEng(e.target.value)}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3 w-25">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Azərbaycan dili
        </label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <button onClick={submit} type="button" className="btn btn-primary">
        Əlavə et
      </button>
      <hr />
      <table className="table text-white">
        <thead>
          <tr>
            <th>İngilis dili</th>
            <th>Azərbaycan dili</th>
          </tr>
        </thead>
        <tbody>
          {words
            .filter((filterItem) => filterItem.eng.includes(textEngFilter))
            .filter((filterItemAz) => filterItemAz.az.includes(textFilter))
            .map((item, index) => (
              <tr key={index}>
                <td>{item.eng}</td>
                <td>{item.az}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
