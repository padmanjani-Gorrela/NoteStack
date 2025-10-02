import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/Input/Toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard';


const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });
  // Inside your Home.jsx component

  const [viewNote, setViewNote] = useState(null);

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: '',
    type: 'add'
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
   const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: 'edit' });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: '',
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/get-all-notes');
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", 'delete');
        getAllNotes();
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  }

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(`/update-note-pinned/${noteId}`, {
        "isPinned": !noteData.isPinned,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully", 'edit');
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  }

   const onSearchNote = async (query) => {
      try {
          const response = await axiosInstance.get("/search-notes", { params: { query } });
          if(response.data && response.data.notes){
              setIsSearch(true);
              setAllNotes(response.data.notes);
          }
      } catch (error) {
          console.log(error);
      }
  };
  
  const handleClearSearch = () => {
      setIsSearch(false);
      getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    Modal.setAppElement('#root'); // Important for accessibility
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
      <div className="container mx-auto">
        {allNotes.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 p-4">
          {allNotes.map((item) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdAt}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              onDelete={() => deleteNote(item)}
              onPinNote={() => updateIsPinned(item)}
              onClick={() => setViewNote(item)}
            />
          ))}
        </div>) : (<EmptyCard message={isSearch ? "Oops! No notes found matching your search🤧." : "No notes yet🤧! Click the '+' button to add your first note😊."}/>)}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: 'add', data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setOpenAddEditModal({ isShown: false, type: 'add', data: null });
        }}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
        }}
        contentLabel="Add or Edit Note"
        className="w-[90%] md:w-[60%] lg:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: 'add', data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      {/* Add this entire block to the return() of Home.jsx */}
      {/* MODIFIED MODAL: For viewing a note's full content */}
      <Modal
        isOpen={!!viewNote}
        onRequestClose={() => setViewNote(null)}
        style={{
          overlay: { backgroundColor: 'rgba(0,0,0,0.2)' },
        }}
        contentLabel="View Note"
        // I've updated the classes here to make the modal wider and ensure it scrolls
        className="w-[95%] md:w-[75%] lg:w-[60%] max-h-[80vh] bg-white rounded-md mx-auto mt-14 p-5 overflow-y-auto no-scrollbar"
      >
        <div className="relative">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 absolute -right-3 -top-3"
            onClick={() => setViewNote(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" /></svg>
          </button>
          <h2 className="text-2xl font-bold mb-2 text-slate-900">{viewNote?.title}</h2>
          <div className="text-xs text-slate-500 mb-4">
            {viewNote?.tags.map(tag => `#${tag}`).join(' ')}
          </div>
          <p className="text-base text-slate-700 whitespace-pre-wrap mt-4">{viewNote?.content}</p>
        </div>
      </Modal>

      <Toast

        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
