import { openDB } from 'idb';

const initdb = async () => {
  try {
    const db = await openDB('jate', 1, {
      upgrade(db) {
        if (db.objectStoreNames.contains('jate')) {
          console.log('jate database already exists');
          return;
        }
        db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        console.log('jate database created');
      },
    });
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.add({ content });
    console.log('Content added to IndexedDB');
  } catch (error) {
    console.error('Error adding content to database:', error);
  }
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const allContent = await store.getAll();
    console.log('Content retrieved from IndexedDB');
    return allContent;
  } catch (error) {
    console.error('Error retrieving content from database:', error);
  }
};

// Initialize the database when the file is loaded
initdb();
