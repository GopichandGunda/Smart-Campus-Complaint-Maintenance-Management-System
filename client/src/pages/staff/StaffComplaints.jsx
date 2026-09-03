import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { complaintService } from '../../services/services';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';
import StatusBadge from '../../components/StatusBadge';
import PriorityBadge from '../../components/PriorityBadge';
import '../../styles/StaffComplaints.css';

const StaffComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [complaints, search, filterStatus]);

  const fetchComplaints = async () => {
    try {
      const response = await complaintService.getStaffComplaints();
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

    setFilteredComplaints(filtered);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="staff-complaints">
      <h1>My Assigned Complaints</h1>

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
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="empty-state">
          <p>No assigned complaints found.</p>
        </div>
      ) : (
        <div className="complaints-table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Student</th>
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
                  <td>{complaint.submittedBy.name}</td>
                  <td>{complaint.location}</td>
                  <td><PriorityBadge priority={complaint.priority} /></td>
                  <td><StatusBadge status={complaint.status} /></td>
                  <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/staff/complaints/${complaint._id}`} className="btn btn-sm btn-primary">
                      Work
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

export default StaffComplaints;
