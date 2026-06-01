import React, { useState } from 'react'

export default function SupplierForm({ supplier, onSave, onCancel }){
  const [form, setForm] = useState(supplier || { name: '', rating: 4.0 })

  function submit(e){
    e.preventDefault()
    if(!form.name) return alert('Name required')
    onSave(form)
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{form.supplier_id ? 'Edit' : 'Add'} Supplier</h5>
        <form onSubmit={submit}>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input className="form-control" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
          </div>
          <div className="mb-2">
            <label className="form-label">Rating</label>
            <input className="form-range" type="range" min="1" max="5" step="0.1" value={form.rating} onChange={e=>setForm({...form, rating: parseFloat(e.target.value)})} />
            <div>{form.rating}</div>
          </div>
          <button className="btn btn-primary me-2" type="submit">Save</button>
          <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>
        </form>
      </div>
    </div>
  )
}
