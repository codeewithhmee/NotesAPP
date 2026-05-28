import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [notes,   setNotes]   = useState([]);
  const [title,   setTitle]   = useState("");
  const [content, setContent] = useState("");
  //delete
  async function deletee(e) {
    console.log(e)
    const updatedNotes = notes.filter(note => note._id !== e._id);
    console.log(updatedNotes)
    setNotes(updatedNotes);
      const res  = await fetch("http://localhost:5000/api/deleteNote", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ e })
    })
    
  }
  //logout
  const navigate=useNavigate()
   function a(){
   localStorage.removeItem("user_id");
   navigate('/login')
  }
  //  Fetch Notes 
 

const fetchNotes = async () => {
  const userId = localStorage.getItem("user_id");
  
  if (!userId) return; 

  try {
    const res  = await fetch(`http://localhost:5000/api/getNotes/${userId}`);
    const data = await res.json();
    setNotes(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

useEffect(() => {
  fetchNotes();
}, []); 
  //  Save Note 
  const saveNote = async () => {
    const userId = localStorage.getItem("user_id");
    await fetch("http://localhost:5000/api/addNote", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ title, content, author: userId }),
    });
    fetchNotes();
    

  };

  return (
<div className="container">
  {/* NAVBAR */}
  <div className="navbar">
    <div>
      <h2 className="logo">Notes App</h2>
    </div>

    <button className="logoutBtn" onClick={a}>
      Logout
    </button>
  </div>

  {/* MAIN CONTENT */}
  <div className="mainContent">
    {/* CREATE NOTE */}
    <div className="createSection">
      <h3 className="sectionTitle">Create Note</h3>

      <input
        className="input"
        placeholder="Enter title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="textarea"
        placeholder="Write something amazing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="saveBtn" onClick={saveNote}>
        Save Note
      </button>
    </div>

    {/* NOTES LIST */}
    <div className="notesSection">
      <h3 className="sectionTitle">My Notes</h3>

      <div className="notesGrid">
        {notes.map((note) => (
          <div key={note._id} className="noteCard">
            <h4 className="noteTitle">{note.title}</h4>
            <p className="noteContent">{note.content}</p>
            <button onClick={() => deletee(note)} className="deleteBtn">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  );
};

export default Home;