import moment from 'moment'
import React from 'react'
import { MdCreate, MdDelete, MdOutlinePushPin } from 'react-icons/md'
const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote, onClick }) => {

  // Replaced moment.js with native JavaScript Date formatting
  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(isoDate).toLocaleDateString('en-GB', options);
  };

  return (
    <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out cursor-pointer' onClick={onClick}>
      <div className='flex items-center justify-between'>
        <div>
          <h6 className='text-sm font-medium'>{title}</h6>
          <span className='text-xs text-slate-500'>{formatDate(date)}</span>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
            <MdOutlinePushPin className={`cursor-pointer w-5 h-5 ${isPinned ? 'text-blue-500' : 'text-slate-300'}`} onClick={onPinNote} />
        </div>
      </div>
      <p className='text-xs text-slate-600 mt-2 whitespace-pre-wrap'>{content?.slice(0, 60)}</p>
      <div className='flex items-center justify-between mt-2'>
        <div className='text-xs text-slate-500'>{tags.map((item) => `#${item}`).join(' ')}</div>
        <div className='flex items-center gap-2' onClick={(e) => e.stopPropagation()}>
          <MdCreate className='cursor-pointer w-5 h-5 hover:text-green-600' onClick={onEdit} />
          <MdDelete className='cursor-pointer w-5 h-5 hover:text-red-500' onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

