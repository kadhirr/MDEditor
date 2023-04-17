import React from 'react'
import { Note } from '../utils/db'
import {micromark} from 'micromark'
import { useNavigate } from 'react-router'

console.log(micromark('## Hello, *world*!').substring(0,10))

type CardProps = {
    note:Note
    styles: any
  }



const Card = ({note, styles}:CardProps) => {
    let navigate = useNavigate();
    function clickEvent() {
        if (typeof note.id === "string"){
            navigate(`/edit/${note.id}`)
        }
    }
  return (
    <div className={styles} onClick={(e) => {clickEvent();}}>
        <div className='text-center text-2xl mono underline'>{note.name}</div>
        <div className='text-center'>{note.tags.map((tag) => <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{tag}</span>)}</div>
        <div dangerouslySetInnerHTML={{__html:micromark(note.content).substring(0,30)}}></div>
    </div>
  )
}

export default Card