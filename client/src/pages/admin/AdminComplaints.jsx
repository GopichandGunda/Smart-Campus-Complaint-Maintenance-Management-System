import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService, complaintService } from '../../services/services';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';
import StatusBadge from '../../components/StatusBadge';
import PriorityBadge from '../../components/PriorityBadge';
import '../../styles/AdminComplaints.css';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [complaints, search, filterStatus, filterPriority]);

  const fetchComplaints = async () => {
    try {
      const response = await complaintService.getComplaints();
      if (response.data.success) {
        setComplaints(response.data.complaints);
      }
    } catch (err) {
      setError('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...complaints];

    if (search) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.submittedBy.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterStatus) {
      filtered = filtered.filter(c => c.status === filterStatus);
    }

    if (filterPriority) {
      filtered = filtered.filter(c => c.priority === filterPriority);
    }

    setFilteredComplaints(filtered);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="admin-complaints">
      <h1>All Complaints</h1>

      {error && <Alert type="danger" message={error} onClose={() => setError('')} />}

      <div className="filters-section">
        <input
          type="text"
          placeholder="Search by title or student name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
          <option value="">All Statuses</option>
          <option value="Submitted">Submitted</option>
          <option value="Under Review">Under Review</option>
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="filter-select">
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="empty-state">
          <p>No complaints found.</p>
        </div>
      ) : (
        <div className="complaints-table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Student</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map(complaint => (
                <tr key={complaint._id}>
                  <td><strong>{complaint.title}</strong></td>
                  <td>{complaint.submittedBy.name}</td>
                  <td>{complaint.category}</td>
                  <td><PriorityBadge priority={complaint.priority} /></td>
                  <td><StatusBadge status={complaint.status} /></td>
                  <td>{complaint.assignedTo ? complaint.assignedTo.name : '—'}</td>
                  <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/admin/complaints/${complaint._id}`} className="btn btn-sm btn-primary">
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminComplaints;
