import React, { useState, useEffect } from 'react'
import { Note,db } from '../utils/db'
import { getAllTags } from '../utils/dbHelpers'
import Select from 'react-select'
import NavBar from '../components/NavBar'
import Card from '../components/Card';

type CardProps = {
    card:Note
  }

const Home = () => {
    const [notes,setNotes] = useState<Note[]>([]);
    const [tags,setTags] = useState<string[]>([]);
    const [shownNotes, setShownNotes] = useState<Note[]>([]);
    const [isloaded,setLoaded] = useState<boolean>(false);
    const [searchQuery,setSearchQuery] = useState<string>("");
    const [searchTags,setSearchTags] = useState<string[]>([]);



    async function getAllNotes() {
        const notesStored = await db.notes.toArray();
        setNotes(notesStored);
        setShownNotes(notesStored);
        console.log("Notes",notesStored);
    };


    async function getAllTags(){
        const tagsStored = await db.notes.orderBy('tags').uniqueKeys();
        setTags(tagsStored as string[]);
        console.log("Tags",tagsStored)

    };


    async function createNote(){
        const result = await db.notes.add({
            name:"",
            tags:[],
            content:""
        })
        console.log("RESULT",result);
    };


    const searchFilter = () => {
        let selectedNotes = notes;
        selectedNotes = selectedNotes.filter((note) => {
            return note.name.toLowerCase().includes(searchQuery.toLowerCase())
        })
        if (searchTags.length > 0){
            selectedNotes = selectedNotes.filter( (note) => {
                return searchTags.every((i) => note.tags.includes(i))
            })
        }

        console.log(selectedNotes);
        setShownNotes(selectedNotes);
    }
    useEffect(() => {
        getAllNotes();
        getAllTags();
        setLoaded(true);
    },[]);


  return (
    <>
    {isloaded && <>
        <NavBar />
        <div className='flex justify-center gap-x-10 m-5'>
            <input className='border-2 border-black focus:border-red w-[40vw]' type='text' onChange={(e) => setSearchQuery(e.target.value)}></input>
            <Select className='w-[30vw]' isClearable isMulti options={tags.map((d)=> {return {label:d,value:d}})} onChange={(options) => setSearchTags(options.map((val) => val.value))}/>
            <button className='border-2 border-black p-2 bg-indigo-200' onClick={searchFilter}>Search</button>
            
        </div>
        <button className='border-2 border-black p-2 text-center' onClick={createNote}>Create</button>
        <div className='grid grid-cols-2'>
            {shownNotes.map((data) => {
                return (<Card styles='border-2 min-w-fit p-2 cursor-pointer' note={data} key={data.id}/>)
            })}
        </div>
        
    </>}
    </>
  )
}

export default Home