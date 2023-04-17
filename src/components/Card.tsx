import React from 'react'
import { db, Note } from '../utils/db'
import {micromark} from 'micromark'
import { useNavigate } from 'react-router'
import {FaEdit, FaMinusCircle} from "react-icons/fa";

console.log(micromark('## Hello, *world*!').substring(0,10))

type CardProps = {
    note:Note
    styles: any
  }



const Card = ({note, styles}:CardProps) => {
    let navigate = useNavigate();
    function EditNote() {
        console.log(typeof note.id);
        if (typeof note.id === "number"){
            navigate(`/edit/${note.id}`)
        }
    }
    async function DeleteNote(){
      if (typeof note.id !== 'undefined'){
        await db.notes.delete(note.id).then(e =>{
          navigate(0);
        });
      }
    }
  return (
    <div className={styles}>
        <div className='text-center text-2xl mono underline'>{note.name}</div>
        <div className='text-center'>{note.tags.map((tag) => <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{tag}</span>)}</div>
        <div className='mx-4 mt-4' dangerouslySetInnerHTML={{__html:micromark(note.content).substring(0,30)}}></div>
        <div className='flex justify-center gap-x-10 mt-4 mb-2'>
          <FaMinusCircle className='cursor-pointer' onClick = {(e) => {DeleteNote();}}/>
          <FaEdit className='cursor-pointer' onClick={(e) => {EditNote();}} />
        </div>
    </div>
  )
}

export default Card