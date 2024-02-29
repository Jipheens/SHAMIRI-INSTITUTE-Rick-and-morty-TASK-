const NOTES_STORAGE_KEY = 'notes';

// Function to read notes from localStorage
export function readNotes(residentId?: string) {
  try {
    const notesData = localStorage.getItem(NOTES_STORAGE_KEY);
    const allNotes = notesData ? JSON.parse(notesData) : [];
    
    if (residentId) {
      return allNotes.filter((note: any) => note.residentId === residentId);
    } else {
      return allNotes;
    }
  } catch (error) {
    console.error('Error reading notes:', error);
    return [];
  }
}
  
// Function to write notes to localStorage
export function writeNotes(notes: string[]) {
  try {
    const notesJSON = JSON.stringify(notes, null, 2);
    localStorage.setItem(NOTES_STORAGE_KEY, notesJSON);
  } catch (error) {
    console.error('Error writing notes:', error);
  }
}
