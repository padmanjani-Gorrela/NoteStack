import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ({tags, setTags}) => {

    const [InputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const addNewTag = () => {
        if(InputValue.trim() !== ""){
            setTags([...tags, InputValue.trim()]);
            setInputValue("");
        }
    }
    const handlekeyDown = (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
            addNewTag();
        }   
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    }
  return (
    <div>

        {tags.length > 0 && <div className='felx items-center gap-2 mt-2'>
            {tags.map((tag, index) => (
                <span key={index} className='flex items-center gp-2 text-slate-900 bg-slate-100 px-3 py-1 rounded'>
                    #{tag}
                    <button>
                        <MdClose className='inline-block text-base ml-1 cursor-pointer hover:text-red-600'
                        onClick={() => {
                            const newTags = tags.filter((t, i) => i !== index);
                            setTags(newTags);
                        }}/>
                    </button>
                </span>
            ))}
        </div>}
        <div className='flex items-center gap-4 mt-3'>
            <input type="text" 
            value = {InputValue}
            className='text-sm bg-transparent outline-none border border-slate-300 px-3 py-2 rounded w-full'
            placeholder='Add tags'
            onChange={handleInputChange}
            onKeyDown={handlekeyDown}/> 

            <button className='w-8 h-8 flex items-center justify-center rounded bg-slate-200 hover:bg-blue-700' onClick={() => {addNewTag()}}>
                <MdAdd className='text-2xl text-blue-700  hover:text-white'/>           
            </button>
        </div>
    </div>
  )
}

export default TagInput