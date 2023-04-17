import Editor from "../components/Editor";
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Note, db } from "../utils/db";
import { useParams } from "react-router";
import Select from 'react-select'
import NavBar from "../components/NavBar";


const Edit = () => {
  const sampleText = "Hello World\n# HI\n- [ ] Task 1";
  const [loading,setLoading] = useState<boolean>(true);
  const [content,setContent] = useState<string>("");
  const [title,setTitle] = useState<string>("");
  const [tags,setTags] = useState<string[]>([]);
  let urlParams = useParams();
  //console.log("CL",content)
  const updateFunction = (doc: string) => {setContent(doc)}
  async function saveContent(event: React.MouseEvent<HTMLButtonElement>){
    await saveNote();
  }

  async function saveNote(){
    if (typeof urlParams.noteId === 'string' && typeof content === 'string' && typeof title === 'string'){
      const data = await db.notes.update(parseInt(urlParams.noteId),{content: content, name: title,tags:tags});
      console.log("data savenote",data)
    }
  }

  // Initial Data Fetch Function
  async function getInitialData(){
    setLoading(true);
    if (typeof urlParams.noteId === "string"){
      const data = await db.notes.get(parseInt(urlParams.noteId));
      console.log("data",data);
      if (typeof data !== "undefined") {
        setContent(data.content);
        setTitle(data.name)
        setTags(data.tags);
        setLoading(false);
      }
    }
    
    // setContent()
  }
  useEffect(() => {
    getInitialData();
  },[])
  return (
    <>
    {!loading && <>
      <NavBar />
      <input type="text" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)}}></input>
      <Editor content={content} onChange={updateFunction}/>
      <button className="border-2 border-black p-2" onClick={saveContent}>SAVE</button>
      </>}
    </>
  )
}

export default Edit;