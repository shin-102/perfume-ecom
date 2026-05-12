import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const snap = await getDocs(collection(db, 'perfumes'));
        const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPerfumes(list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  return (
    <DataContext.Provider value={{ perfumes, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
/* eslint-disable */
export const useData = () => useContext(DataContext);
