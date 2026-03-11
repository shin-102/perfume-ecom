import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Plus, Edit, Trash2, X, Check, Search, Database, ExternalLink, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [filteredPerfumes, setFilteredPerfumes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const [currentPerfume, setCurrentPerfume] = useState({
    name: '',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=300',
    category: '',
    description: '',
    details: '',
    price: ''
  });

  const navigate = useNavigate();
  const availableCategories = [...new Set(perfumes.map(p => p.category).filter(Boolean))];

  const fetchPerfumes = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'perfumes'));
      const perfumeList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPerfumes(perfumeList);
      setFilteredPerfumes(perfumeList);
    } catch {
      setError('System sync failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPerfumes(); }, []);

  useEffect(() => {
    const filtered = perfumes.filter(p =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPerfumes(filtered);
  }, [searchQuery, perfumes]);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPerfume({ ...currentPerfume, [name]: value });
  };

  const openAddForm = () => {
    setCurrentPerfume({ name: '', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=300', category: '', description: '', details: '', price: '' });
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const openEditForm = (perfume) => {
    setEditingProductId(perfume.id);
    setCurrentPerfume({ ...perfume });
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProductId(null);
    setIsCustomCategory(false);
  };

  const savePerfume = async () => {
    try {
      if (isEditing) {
        await updateDoc(doc(db, 'perfumes', editingProductId), currentPerfume);
        showNotification('Entry Updated', 'success');
      } else {
        await addDoc(collection(db, 'perfumes'), currentPerfume);
        showNotification('Entry Created', 'success');
      }
      closeForm();
      fetchPerfumes();
    } catch {
      showNotification('Write Error', 'error');
    }
  };

  const deletePerfume = async (id) => {
    if (window.confirm('Confirm Deletion from Database?')) {
      try {
        await deleteDoc(doc(db, 'perfumes', id));
        showNotification('Entry Deleted', 'success');
        fetchPerfumes();
      } catch {
        showNotification('Delete Error', 'error');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  if (loading) return <div className="min-h-screen bg-[#051e34] flex items-center justify-center text-[#FFCA28] font-black uppercase tracking-[0.5em]">Initialising Console...</div>;

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-sans text-[#051e34]">
      {/* Firebase Styled Header */}
      <header className="bg-[#051e34] text-white py-4 px-6 shadow-xl border-b border-[#039BE5]">
        <div className='container mx-auto flex items-center justify-between'>
          <div className="flex items-center gap-3">
            <div className="bg-[#FFCA28] p-1.5 rounded">
               <Database className="text-[#051e34] w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-black uppercase tracking-tighter">ScentBase <span className="text-[#039BE5]">Console</span></h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Database Production Environment</p>
            </div>
          </div>
          <div className='flex gap-4'>
            <Link to='/' className="text-xs font-bold uppercase hover:text-[#FFCA28] flex items-center gap-1">Storefront <ExternalLink size={12}/></Link>
            <button onClick={handleLogout} className="bg-red-500/10 border border-red-500/50 text-red-500 px-3 py-1 text-[10px] font-black uppercase rounded hover:bg-red-500 hover:text-white transition-all flex items-center gap-2">
              <LogOut size={12}/> Terminate Session
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Notification */}
        {notification.show && (
          <div className={`fixed top-20 right-6 p-4 rounded border-l-4 z-50 shadow-2xl animate-bounce ${
            notification.type === 'success' ? 'bg-white border-green-500 text-green-600' : 'bg-white border-red-500 text-red-600'
          }`}>
            <span className="text-xs font-black uppercase tracking-widest">{notification.message}</span>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 bg-white p-4 shadow-sm border border-gray-200">
          <div className="relative flex-1 w-full">
            <Search className="absolute inset-y-0 left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Query database by name or category..."
              className="pl-10 pr-4 py-2 w-full bg-gray-50 border-none text-sm focus:ring-2 focus:ring-[#039BE5] outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={openAddForm}
            className="bg-[#039BE5] text-white px-6 py-2 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#0288d1] shadow-lg shadow-[#039BE5]/20 transition-all"
          >
            <Plus size={16} /> Deploy New Scent
          </button>
        </div>

        {/* Fancy Table */}
        <div className="bg-white shadow-2xl rounded-sm overflow-hidden border border-gray-200">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f4f7f9] border-b border-gray-200">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Visual</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Product Identity</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Classification</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Valuation</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPerfumes.map(perfume => (
                <tr key={perfume.id} className="hover:bg-[#039BE5]/5 transition-colors">
                  <td className="px-6 py-4">
                    <img src={perfume.image} alt="" className="h-10 w-10 object-cover rounded border border-gray-200" />
                  </td>
                  <td className="px-6 py-4 font-bold text-[#051e34] uppercase text-sm tracking-tight">{perfume.name}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black px-2 py-1 bg-gray-100 text-gray-500 uppercase tracking-widest">
                      {perfume.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-[#FFA000] font-bold">{perfume.price}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEditForm(perfume)} className="p-2 text-gray-400 hover:text-[#039BE5] transition-colors"><Edit size={16}/></button>
                      <button onClick={() => deletePerfume(perfume.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deployment Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-[#051e34]/80 backdrop-blur-md z-100 flex items-center justify-center p-4">
          <div className="bg-white shadow-2xl w-full max-w-xl border-t-8 border-[#FFCA28]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#f4f7f9]">
              <h2 className="text-xs font-black text-[#051e34] uppercase tracking-[0.3em]">
                {isEditing ? 'Modify Database Entry' : 'New Product Deployment'}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-black"><X size={20} /></button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); savePerfume(); }} className="p-8">
              <div className="grid grid-cols-1 gap-6 text-xs font-bold uppercase tracking-widest">
                <div className="flex gap-6 items-center mb-4">
                   <img src={currentPerfume.image} className="w-20 h-20 object-cover rounded border-2 border-[#FFCA28]" alt="preview" />
                   <div className="flex-1">
                      <label className="text-gray-400 block mb-2">Resource URI</label>
                      <input name="image" value={currentPerfume.image} onChange={handleInputChange} className="w-full bg-gray-50 p-2 border-b border-gray-200 outline-none focus:border-[#039BE5] text-[10px]" />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 block mb-2">Display Name</label>
                    <input name="name" value={currentPerfume.name} onChange={handleInputChange} className="w-full bg-gray-50 p-3 border-none outline-none focus:ring-1 focus:ring-[#039BE5]" required />
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-2">Price Point</label>
                    <input name="price" value={currentPerfume.price} onChange={handleInputChange} className="w-full bg-gray-50 p-3 border-none outline-none focus:ring-1 focus:ring-[#039BE5]" placeholder="$0.00" required />
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 block mb-2">Category Mapping</label>
                  <div className="flex gap-2 mb-2">
                    <button type="button" onClick={() => setIsCustomCategory(false)} className={`flex-1 py-2 text-[10px] ${!isCustomCategory ? 'bg-[#051e34] text-white' : 'bg-gray-100'}`}>Select Existing</button>
                    <button type="button" onClick={() => setIsCustomCategory(true)} className={`flex-1 py-2 text-[10px] ${isCustomCategory ? 'bg-[#051e34] text-white' : 'bg-gray-100'}`}>Manual Entry</button>
                  </div>
                  {!isCustomCategory ? (
                    <select name="category" value={currentPerfume.category} onChange={handleInputChange} className="w-full bg-gray-50 p-3 outline-none">
                      <option value="">Select...</option>
                      {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  ) : (
                    <input name="category" value={currentPerfume.category} onChange={handleInputChange} className="w-full bg-gray-50 p-3 outline-none" placeholder="New Category Name" />
                  )}
                </div>

                <div>
                  <label className="text-gray-400 block mb-2">System Description</label>
                  <textarea name="description" value={currentPerfume.description} onChange={handleInputChange} rows="2" className="w-full bg-gray-50 p-3 outline-none"></textarea>
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button type="button" onClick={closeForm} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest bg-gray-100 hover:bg-gray-200 transition-colors">Abort</button>
                <button type="submit" className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest bg-[#FFCA28] text-[#051e34] hover:bg-[#FFA000] transition-colors flex items-center justify-center gap-2">
                  <Check size={14}/> {isEditing ? 'Commit Changes' : 'Push to Production'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
