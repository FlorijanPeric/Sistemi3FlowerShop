import React, { useState } from 'react'
import SupplierForm from '../components/SupplierForm'

export default function Suppliers(){
  const [suppliers, setSuppliers] = useState([
    { supplier_id:1, name:'GreenFlowers', rating:4.5 },
    { supplier_id:2, name:'BloomCo', rating:4.1 }
  ])
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  function handleAdd(){ setEditing(null); setShowForm(true) }
  function handleEdit(s){ setEditing(s); setShowForm(true) }
  function handleSave(s){
    if(s.supplier_id){ // update
      setSuppliers(prev => prev.map(p=> p.supplier_id===s.supplier_id ? s : p))
    } else {
      s.supplier_id = Math.max(0,...suppliers.map(x=>x.supplier_id))+1
      setSuppliers(prev=> [s, ...prev])
    }
    setShowForm(false)
  }
  function handleDelete(id){ if(!confirm('Delete supplier?')) return; setSuppliers(prev=> prev.filter(p=>p.supplier_id!==id)) }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h2 className="page-title">Suppliers</h2>
          <p className="page-intro">Manage supplier contacts and ratings.</p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleAdd}>Add Supplier</button>
        </div>
      </div>

      {showForm && <div className="mb-3"><SupplierForm supplier={editing} onSave={handleSave} onCancel={()=>setShowForm(false)} /></div>}

      <div className="card panel-card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead><tr><th>Name</th><th>Rating</th><th>Actions</th></tr></thead>
              <tbody>
                {suppliers.map(s=> (
                  <tr key={s.supplier_id}>
                    <td>{s.name}</td>
                    <td>{s.rating}</td>
                    <td>
                      <button className="btn btn-sm btn-secondary me-2" onClick={()=>handleEdit(s)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(s.supplier_id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
