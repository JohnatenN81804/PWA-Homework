import { openDB } from 'idb';

const DB_NAME = "jate"

const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const YOUR_OPEN_DB_VAR = await openDB(DB_NAME, 1);
  const YOUR_TX_VAR = YOUR_OPEN_DB_VAR.transaction(DB_NAME, 'readwrite');
  const YOUR_STORE_VAR = YOUR_TX_VAR.objectStore(DB_NAME);

  const request = YOUR_STORE_VAR.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

export const getDb = async () => {
  const YOUR_OPEN_DB_VAR = await openDB(DB_NAME, 1);
  const YOUR_TX_VAR = YOUR_OPEN_DB_VAR.transaction(DB_NAME, 'readonly');
  const YOUR_STORE_VAR = YOUR_TX_VAR.objectStore(DB_NAME);

  const request = YOUR_STORE_VAR.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();
