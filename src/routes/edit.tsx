import Editor from "../components/Editor";
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Note, db } from "../utils/db";
import { useParams } from "react-router";
import CreatableSelect from 'react-select/creatable';
import NavBar from "../components/NavBar";
import {FaSave} from "react-icons/fa"
import { getAllTags } from "../utils/dbHelpers";


const Edit = () => {
  const sampleText = "Hello World\n# HI\n- [ ] Task 1";
  const [loading,setLoading] = useState<boolean>(true);
  const [content,setContent] = useState<string>("");
  const [title,setTitle] = useState<string>("");
  const [tags,setTags] = useState<string[]>([]);
  const [allTags,setAllTags] = useState<string[]>([]);
  let urlParams = useParams();
  
  const updateFunction = (doc: string) => {setContent(doc)};

  async function saveContent(event: React.MouseEvent<HTMLButtonElement>){
    await saveNote();
  }

  async function saveNote(){
    console.log("tags",tags);
    if (typeof urlParams.noteId === 'undefined'){
      const data = await db.notes.add({content: content, name: title,tags:tags});
      console.log(data);
    }
    if (typeof urlParams.noteId === 'string'){
      const data = await db.notes.update(parseInt(urlParams.noteId),{content: content, name: title,tags:tags});
      console.log("data savenote",data)
    }
  }

  // Initial Data Fetch Function
  async function getInitialData(){
    setLoading(true);
    if (typeof urlParams.noteId === "undefined"){
      setLoading(false);
    }
    else{
      if (typeof urlParams.noteId === "string"){
        const data = await db.notes.get(parseInt(urlParams.noteId));
        console.log("data",data);
        if (typeof data !== "undefined") {
          setContent(data.content);
          setTitle(data.name)
          setTags(data.tags);
        }
      }
      setLoading(false);
    }


    
    // setContent()
  }

  async function getAllTags(){
    const tagsStored = await db.notes.orderBy('tags').uniqueKeys();
    setAllTags(tagsStored as string[]);
    // console.log("Tags",tagsStored)
};
  useEffect(() => {
    getInitialData();
    getAllTags();
    setLoading(false);
  },[])
  return (
    <>
    {!loading && <>
      <NavBar showNewButton={false}/>
      <div className="flex justify-center border-2 border-slate-600 m-10 rounded">
      <input type="text" className="text-2xl w-full text-center font-mono p-2" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)}}></input>

      </div>
      <div className="flex flex-row-reverse gap-x-4  m-10 rounded w-fit text-center">
      <CreatableSelect className='w-[30vw]' isClearable isMulti value={tags.map(d => {return {label:d,value:d}})}  options={allTags.map(d => {return {label:d,value:d}})} onChange={(options) => setTags(options.map(d => d.value))}/>
      <button className="border-2 border-black p-2 rounded text-2xl" onClick={saveContent}><FaSave /></button>
      </div>

      <Editor content={content} onChange={updateFunction}/>
      </>}
    </>
  )
}

export default Edit;