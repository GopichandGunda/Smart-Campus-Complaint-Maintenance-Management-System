import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { complaintService } from '../../services/services';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';
import StatusBadge from '../../components/StatusBadge';
import PriorityBadge from '../../components/PriorityBadge';
import '../../styles/ComplaintsList.css';

const StudentComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [complaints, search, filterStatus, filterCategory, filterPriority]);

  const fetchComplaints = async () => {
    try {
      const response = await complaintService.getMyComplaints();
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
        c.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterStatus) {
      filtered = filtered.filter(c => c.status === filterStatus);
    }

    if (filterCategory) {
      filtered = filtered.filter(c => c.category === filterCategory);
    }

    if (filterPriority) {
      filtered = filtered.filter(c => c.priority === filterPriority);
    }

    setFilteredComplaints(filtered);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="complaints-list">
      <div className="list-header">
        <h1>My Complaints</h1>
        <Link to="/student/complaints/new" className="btn btn-primary">
          + New Complaint
        </Link>
      </div>

      {error && <Alert type="danger" message={error} onClose={() => setError('')} />}

      <div className="filters-section">
        <input
          type="text"
          placeholder="Search by title or location..."
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

        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="filter-select">
          <option value="">All Categories</option>
          <option value="Electrical">Electrical</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Wi-Fi / Network">Wi-Fi / Network</option>
          <option value="Classroom">Classroom</option>
          <option value="Laboratory">Laboratory</option>
          <option value="Hostel">Hostel</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Furniture">Furniture</option>
          <option value="Security">Security</option>
          <option value="Other">Other</option>
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
          <Link to="/student/complaints/new" className="btn btn-primary">
            Create Your First Complaint
          </Link>
        </div>
      ) : (
        <div className="complaints-table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map(complaint => (
                <tr key={complaint._id}>
                  <td><strong>{complaint.title}</strong></td>
                  <td>{complaint.category}</td>
                  <td>{complaint.location}</td>
                  <td><PriorityBadge priority={complaint.priority} /></td>
                  <td><StatusBadge status={complaint.status} /></td>
                  <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/student/complaints/${complaint._id}`} className="btn btn-sm btn-primary">
                      View
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

export default StudentComplaints;
