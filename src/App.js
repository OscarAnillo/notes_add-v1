import { useEffect, useState } from "react";
import { noteService } from "./Components/services";

import "./styles.css";

function App() {
  const [newNote, setNewNote] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    noteService
      .getAll()
      .then((data) => {
        setData(data);
      })
      .catch(console.log);
  }, [setData]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!newNote) {
      alert("Please a note first!");
      return;
    }
    // noteService
    //   .create({
    //     content: newNote,
    //   })
    //   .then((res) => {
    //     setData(data.concat(res));
    //     setNewNote("");
    //   })
    //   .catch(console.log);
    try {
      const response = await fetch("http://localhost:3005/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newNote,
        }),
      });
      const jsonData = await response.json();
      setData(data.concat(jsonData));
      setNewNote("");
    } catch (err) {
      console.log(err);
    }
  };

  const clickHandlerDelete = (id) => {
    noteService.remove(id);
    const newNote = data.filter((note) => note.id !== id);
    setData(newNote);
  };

  return (
    <div className="App">
      <h1>Notes</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Add a note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button type="submit">Add note</button>
      </form>
      <div>
        {data.map((note) => (
          <div key={note.id} className="map-div">
            <div>
              <li>{note.content}</li>
              <span>{note.date}</span>
            </div>
            <button onClick={() => clickHandlerDelete(note.id)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
