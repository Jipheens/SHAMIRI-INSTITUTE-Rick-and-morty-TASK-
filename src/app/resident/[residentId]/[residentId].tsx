import React, { useState, useEffect } from 'react';

import { readNotes, writeNotes } from '../../../utils/notes';
import { MyTabs } from '@/components/Tabs';

interface AddNoteFormProps {
  onAddNote: (newNote: string) => Promise<void>;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ onAddNote }) => {
  const [note, setNote] = useState('');

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await onAddNote(note);
      setNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="note" className="block text-lg font-semibold text-gray-700">
          Add Note
        </label>
        <textarea
          id="note"
          name="note"
          placeholder="Enter your note here..."
          value={note}
          onChange={handleNoteChange}
          className="min-h-[120px] w-full resize-y rounded-lg border border-zinc-300 px-3 py-2 shadow-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400 dark:focus:border-violet-500 dark:focus:ring-violet-500/20"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
      >
        Submit
      </button>
    </form>
  );
};

interface ResidentDetailsProps {
  residentId: string;
}

const ResidentDetails: React.FC<ResidentDetailsProps> = ({ residentId }) => {
  const [resident, setResident] = useState<any>(null);
  const [notes, setNotes] = useState<string[]>([]);
  
  useEffect(() => {
    const words = window.location.href.split("/");
    const newId = words[words.length - 1]
    fetchResident(newId);
    loadNotes(newId);
    console.log("resident id on receiving",newId)
  }, [residentId]);

  const fetchResident = async (id: string) => {
    
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);


      const data = await response.json();
      setResident(data);
    } catch (error) {
      console.error('Error fetching resident:', error);
    }
  };

  const loadNotes = async (residentId: string) => {
    try {
      const loadedNotes = await readNotes(residentId);
      setNotes(loadedNotes);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const handleAddNote = async (newNote: string) => {
    try {
      const updatedNotes = [...notes, newNote];
      writeNotes(updatedNotes);
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">Rick and Morty</h1>
      <MyTabs />
        {resident && (
          <div className="p-2 border rounded-md mb-8 mt-8" >
            <div className="p-2 border rounded-md mb-8 mt-8 max-w-[500px]">
              <h1 className="mb-4 mt-4"> Name: {resident.name}</h1>
              <img src={resident.image} alt={resident.name} className="mb-4 mt-4" />
              <p className="mb-4 mt-4">Status: {resident.status}</p>
            </div>
            {/* Add the form for adding notes here */}
            <AddNoteForm onAddNote={handleAddNote} />
            {/* Display existing notes */}
              <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Notes</h2>
              {notes.map((note, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md mb-2 max-w-[300px]">
                  <p>{note}</p>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default ResidentDetails;
