import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const useFirestore = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(collectionRef);
        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Firestore Data:', documents); // <--- ADD THIS LINE
        setData(documents);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data from Firestore:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName]); // Re-fetch if the collection name changes (though in this app, it's likely static)

  return { data, loading, error };
};

export default useFirestore;