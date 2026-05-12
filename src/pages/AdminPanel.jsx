import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Plus, Edit, Trash2, X, Check, Search, LogOut, ExternalLink, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

/* ─────────────────────────────────────────────
   AdminPanel — practical, polished, cohesive
   with the luxury brand without losing clarity.
───────────────────────────────────────────── */
const AdminPanel = () => {
  const [perfumes,          setPerfumes]          = useState([]);
  const [filteredPerfumes,  setFilteredPerfumes]  = useState([]);
  const [searchQuery,       setSearchQuery]       = useState('');
  const [loading,           setLoading]           = useState(true);
  const [,                  setError]             = useState(null);
  const [isFormOpen,        setIsFormOpen]        = useState(false);
  const [isEditing,         setIsEditing]         = useState(false);
  const [isCustomCategory,  setIsCustomCategory]  = useState(false);
  const [editingProductId,  setEditingProductId]  = useState(null);
  const [notification,      setNotification]      = useState({ show: false, message: '', type: '' });
  const [deleteConfirm,     setDeleteConfirm]     = useState(null); // id to confirm

  const [currentPerfume, setCurrentPerfume] = useState({
    name: '', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=300',
    category: '', description: '', details: '', price: '',
  });

  const navigate = useNavigate();
  const availableCategories = [...new Set(perfumes.map(p => p.category).filter(Boolean))];

  /* ── Data ── */
  const fetchPerfumes = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'perfumes'));
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setPerfumes(list);
      setFilteredPerfumes(list);
    } catch { setError('Sync failed.'); }
    finally   { setLoading(false); }
  };

  useEffect(() => { fetchPerfumes(); }, []);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    setFilteredPerfumes(
      perfumes.filter(p => p.name?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q))
    );
  }, [searchQuery, perfumes]);

  /* ── Notifications ── */
  const notify = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  /* ── Form helpers ── */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPerfume(prev => ({ ...prev, [name]: value }));
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

  const closeForm = () => { setIsFormOpen(false); setEditingProductId(null); setIsCustomCategory(false); };

  const savePerfume = async () => {
    try {
      if (isEditing) {
        await updateDoc(doc(db, 'perfumes', editingProductId), currentPerfume);
        notify('Product updated', 'success');
      } else {
        await addDoc(collection(db, 'perfumes'), currentPerfume);
        notify('Product added', 'success');
      }
      closeForm();
      fetchPerfumes();
    } catch { notify('Save failed', 'error'); }
  };

  const deletePerfume = async (id) => {
    try {
      await deleteDoc(doc(db, 'perfumes', id));
      notify('Product removed', 'success');
      setDeleteConfirm(null);
      fetchPerfumes();
    } catch { notify('Delete failed', 'error'); }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center flex-col gap-4">
        <div
          className="w-10 h-10 rounded-full border border-[#C9A84C]/30"
          style={{ animation: 'spin 1.5s linear infinite', borderTopColor: '#C9A84C' }}
        />
        <span className="font-body text-[10px] font-medium uppercase tracking-[0.4em] text-[#B8B0A4]">
          Loading
        </span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ─────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#F5F0E8]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── Header ── */}
      <header className="bg-[#0A1628] border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span
              className="font-display font-light tracking-[0.15em] text-[#F5F0E8] text-xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Fire<span style={{ color: '#C9A84C' }}>Scent</span>
            </span>
            <div className="h-4 w-px bg-white/10" />
            <span className="font-body text-[10px] font-medium uppercase tracking-[0.3em] text-[#B8B0A4]">
              Admin Console
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-1.5 font-body text-[10px] font-medium uppercase tracking-[0.25em] text-[#B8B0A4] hover:text-[#C9A84C] transition-colors duration-300"
            >
              Storefront <ExternalLink size={11} />
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 font-body text-[10px] font-medium uppercase tracking-[0.25em] text-[#B8B0A4]/60 hover:text-red-400 transition-colors duration-300"
            >
              <LogOut size={13} /> Sign out
            </button>
          </div>
        </div>
      </header>

      {/* ── Notification ── */}
      {notification.show && (
        <div
          className={`fixed top-20 right-6 z-50 flex items-center gap-3 px-5 py-4 shadow-xl border-l-2 ${
            notification.type === 'success'
              ? 'bg-white border-[#C9A84C] text-[#0A1628]'
              : 'bg-white border-red-400 text-red-600'
          }`}
          style={{ animation: 'slideInRight 0.4s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          {notification.type === 'success'
            ? <Check size={14} className="text-[#C9A84C]" />
            : <AlertCircle size={14} className="text-red-400" />
          }
          <span className="font-body text-[11px] font-medium uppercase tracking-[0.2em]">
            {notification.message}
          </span>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#060F1A]/60 backdrop-blur-sm">
          <div className="bg-white p-8 max-w-sm w-full mx-4 border-t-2 border-red-400">
            <h3 className="font-body font-medium text-[#0A1628] mb-2">Remove product?</h3>
            <p className="font-body font-light text-sm text-[#B8B0A4] mb-8">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-[#0A1628] border border-[#0A1628]/15 hover:border-[#0A1628]/30 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => deletePerfume(deleteConfirm)}
                className="flex-1 py-3 font-body text-[10px] font-medium uppercase tracking-[0.2em] bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="container mx-auto px-6 py-10">

        {/* Page title + action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <h1
              className="font-display font-light text-4xl text-[#0A1628] leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Products
            </h1>
            <p className="font-body text-[10px] font-medium uppercase tracking-[0.3em] text-[#B8B0A4] mt-2">
              {perfumes.length} items in collection
            </p>
          </div>
          <button
            onClick={openAddForm}
            className="flex items-center gap-2 bg-[#0A1628] text-[#F5F0E8] px-6 py-3 font-body text-[10px] font-medium uppercase tracking-[0.25em] hover:bg-[#C9A84C] hover:text-[#0A1628] transition-all duration-400"
          >
            <Plus size={14} /> Add Product
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B8B0A4]" />
          <input
            type="text"
            placeholder="Search by name or category…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-7 pr-4 py-3 bg-transparent border-b border-[#0A1628]/15 focus:border-[#C9A84C] outline-none font-body text-sm text-[#0A1628] placeholder-[#B8B0A4] transition-colors duration-300"
          />
        </div>

        {/* Table */}
        <div className="bg-white border border-[#0A1628]/5 overflow-hidden">

          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#0A1628]/5 bg-[#F5F0E8]">
            {[
              { label: 'Product',      col: 'col-span-5' },
              { label: 'Category',     col: 'col-span-2' },
              { label: 'Price',        col: 'col-span-2' },
              { label: 'Actions',      col: 'col-span-3 text-right' },
            ].map(({ label, col }) => (
              <div key={label} className={`${col} font-body text-[9px] font-medium uppercase tracking-[0.35em] text-[#B8B0A4]`}>
                {label}
              </div>
            ))}
          </div>

          {/* Rows */}
          {filteredPerfumes.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-body text-sm text-[#B8B0A4] uppercase tracking-widest">No products found</p>
            </div>
          ) : (
            filteredPerfumes.map((perfume, i) => (
              <div
                key={perfume.id}
                className={`grid grid-cols-12 gap-4 px-6 py-4 items-center group hover:bg-[#F5F0E8]/50 transition-colors duration-200 ${
                  i < filteredPerfumes.length - 1 ? 'border-b border-[#0A1628]/5' : ''
                }`}
              >
                {/* Product identity */}
                <div className="col-span-5 flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 overflow-hidden bg-[#F5F0E8]">
                    <img src={perfume.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-body font-medium text-sm text-[#0A1628] truncate">
                    {perfume.name}
                  </span>
                </div>

                {/* Category */}
                <div className="col-span-2">
                  <span className="font-body text-[9px] font-medium uppercase tracking-[0.25em] text-[#B8B0A4] bg-[#F5F0E8] px-2.5 py-1">
                    {perfume.category}
                  </span>
                </div>

                {/* Price */}
                <div className="col-span-2">
                  <span
                    className="font-display font-light text-lg text-[#C9A84C]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {perfume.price}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-3 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => openEditForm(perfume)}
                    className="flex items-center gap-1.5 text-[9px] font-body font-medium uppercase tracking-[0.2em] text-[#B8B0A4] hover:text-[#0A1628] px-3 py-2 transition-colors duration-200"
                  >
                    <Edit size={12} /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(perfume.id)}
                    className="flex items-center gap-1.5 text-[9px] font-body font-medium uppercase tracking-[0.2em] text-[#B8B0A4] hover:text-red-500 px-3 py-2 transition-colors duration-200"
                  >
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Form Modal ── */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#060F1A]/60 backdrop-blur-sm p-4">
          <div
            className="bg-white w-full max-w-lg border-t-2 border-[#C9A84C] shadow-2xl max-h-[90vh] overflow-y-auto"
            style={{ animation: 'scaleUp 0.4s cubic-bezier(0.22,1,0.36,1) both' }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#0A1628]/5">
              <h2
                className="font-display font-light text-2xl text-[#0A1628]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {isEditing ? 'Edit Product' : 'Add Product'}
              </h2>
              <button
                onClick={closeForm}
                className="text-[#B8B0A4] hover:text-[#0A1628] transition-colors duration-200"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={e => { e.preventDefault(); savePerfume(); }}
              className="px-8 py-8 space-y-6"
            >

              {/* Image preview + URL */}
              <div className="flex gap-5 items-start">
                <div className="w-20 h-20 shrink-0 overflow-hidden bg-[#F5F0E8]">
                  <img src={currentPerfume.image} alt="preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <label className="block font-body text-[9px] font-medium uppercase tracking-[0.3em] text-[#B8B0A4] mb-2">
                    Image URL
                  </label>
                  <input
                    name="image"
                    value={currentPerfume.image}
                    onChange={handleInputChange}
                    className="w-full font-body text-xs text-[#0A1628] bg-[#F5F0E8] px-4 py-3 outline-none focus:ring-1 focus:ring-[#C9A84C] transition-all"
                    placeholder="https://…"
                  />
                </div>
              </div>

              {/* Name + Price */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'name',  label: 'Name',  placeholder: 'Eau de…' },
                  { name: 'price', label: 'Price', placeholder: '$0.00' },
                ].map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="block font-body text-[9px] font-medium uppercase tracking-[0.3em] text-[#B8B0A4] mb-2">
                      {label}
                    </label>
                    <input
                      name={name}
                      value={currentPerfume[name]}
                      onChange={handleInputChange}
                      placeholder={placeholder}
                      required
                      className="w-full font-body text-sm text-[#0A1628] bg-[#F5F0E8] px-4 py-3 outline-none focus:ring-1 focus:ring-[#C9A84C] transition-all"
                    />
                  </div>
                ))}
              </div>

              {/* Category */}
              <div>
                <label className="block font-body text-[9px] font-medium uppercase tracking-[0.3em] text-[#B8B0A4] mb-2">
                  Category
                </label>
                <div className="flex gap-2 mb-3">
                  {['Select existing', 'New category'].map((opt, idx) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setIsCustomCategory(idx === 1)}
                      className={`flex-1 py-2 font-body text-[9px] font-medium uppercase tracking-[0.2em] transition-colors duration-200 ${
                        isCustomCategory === (idx === 1)
                          ? 'bg-[#0A1628] text-[#F5F0E8]'
                          : 'bg-[#F5F0E8] text-[#B8B0A4] hover:text-[#0A1628]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {!isCustomCategory ? (
                  <select
                    name="category"
                    value={currentPerfume.category}
                    onChange={handleInputChange}
                    className="w-full font-body text-sm text-[#0A1628] bg-[#F5F0E8] px-4 py-3 outline-none focus:ring-1 focus:ring-[#C9A84C]"
                  >
                    <option value="">Select…</option>
                    {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                ) : (
                  <input
                    name="category"
                    value={currentPerfume.category}
                    onChange={handleInputChange}
                    placeholder="Enter new category"
                    className="w-full font-body text-sm text-[#0A1628] bg-[#F5F0E8] px-4 py-3 outline-none focus:ring-1 focus:ring-[#C9A84C]"
                  />
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block font-body text-[9px] font-medium uppercase tracking-[0.3em] text-[#B8B0A4] mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={currentPerfume.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full font-body text-sm text-[#0A1628] bg-[#F5F0E8] px-4 py-3 outline-none focus:ring-1 focus:ring-[#C9A84C] resize-none transition-all"
                />
              </div>

              {/* Details */}
              <div>
                <label className="block font-body text-[9px] font-medium uppercase tracking-[0.3em] text-[#B8B0A4] mb-2">
                  Fragrance Notes <span className="normal-case tracking-normal text-[#B8B0A4]/60">(optional)</span>
                </label>
                <textarea
                  name="details"
                  value={currentPerfume.details}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full font-body text-sm text-[#0A1628] bg-[#F5F0E8] px-4 py-3 outline-none focus:ring-1 focus:ring-[#C9A84C] resize-none transition-all"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 py-4 font-body text-[10px] font-medium uppercase tracking-[0.25em] text-[#B8B0A4] border border-[#0A1628]/10 hover:border-[#0A1628]/25 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 font-body text-[10px] font-medium uppercase tracking-[0.25em] bg-[#C9A84C] text-[#0A1628] hover:bg-[#b8973e] transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Check size={13} />
                  {isEditing ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInRight { from { transform:translateX(60px); opacity:0; } to { transform:translateX(0); opacity:1; } }
        @keyframes scaleUp { from { transform:scale(0.96); opacity:0; } to { transform:scale(1); opacity:1; } }
      `}</style>
    </div>
  );
};

export default AdminPanel;
