import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { complaintService, userService } from '../../services/services';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';
import StatusBadge from '../../components/StatusBadge';
import PriorityBadge from '../../components/PriorityBadge';
import '../../styles/AdminComplaintDetail.css';

const AdminComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    status: '',
    priority: '',
    staffId: ''
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [complaintRes, staffRes] = await Promise.all([
        complaintService.getComplaintById(id),
        userService.getUsersByRole('staff')
      ]);

      if (complaintRes.data.success) {
        const comp = complaintRes.data.complaint;
        setComplaint(comp);
        setFormData({
          status: comp.status,
          priority: comp.priority,
          staffId: comp.assignedTo?._id || ''
        });
      }

      if (staffRes.data.success) {
        setStaffList(staffRes.data.users);
      }
    } catch (err) {
      setError('Failed to load complaint');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setFormData(prev => ({ ...prev, status: newStatus }));
    
    try {
      const response = await complaintService.updateComplaintStatus(id, newStatus);
      if (response.data.success) {
        setComplaint(response.data.complaint);
        setSuccess('Status updated successfully');
      }
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const handlePriorityChange = async (e) => {
    const newPriority = e.target.value;
    setFormData(prev => ({ ...prev, priority: newPriority }));

    try {
      const response = await complaintService.updateComplaintPriority(id, newPriority);
      if (response.data.success) {
        setComplaint(response.data.complaint);
        setSuccess('Priority updated successfully');
      }
    } catch (err) {
      setError('Failed to update priority');
    }
  };

  const handleAssignStaff = async (e) => {
    const staffId = e.target.value;
    setFormData(prev => ({ ...prev, staffId }));

    if (!staffId) return;

    try {
      const response = await complaintService.assignStaff(id, staffId);
      if (response.data.success) {
        setComplaint(response.data.complaint);
        setSuccess('Staff assigned successfully');
      }
    } catch (err) {
      setError('Failed to assign staff');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!complaint) return <Alert type="danger" message="Complaint not found" />;

  return (
    <div className="admin-complaint-detail">
      <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm">
        ← Back
      </button>

      {error && <Alert type="danger" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

      <div className="detail-header">
        <h1>{complaint.title}</h1>
        <div className="badges">
          <StatusBadge status={complaint.status} />
          <PriorityBadge priority={complaint.priority} />
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-main">
          <div className="detail-card">
            <h3>Description</h3>
            <p>{complaint.description}</p>
          </div>

          <div className="detail-card">
            <h3>Details</h3>
            <div className="details-grid">
              <div>
                <strong>Category:</strong>
                <p>{complaint.category}</p>
              </div>
              <div>
                <strong>Location:</strong>
                <p>{complaint.location}</p>
              </div>
              <div>
                <strong>Submitted By:</strong>
                <p>{complaint.submittedBy.name}</p>
              </div>
              <div>
                <strong>Date:</strong>
                <p>{new Date(complaint.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {complaint.image && (
            <div className="detail-card">
              <h3>Complaint Image</h3>
              <img src={complaint.image} alt="Complaint" style={{ maxWidth: '100%', borderRadius: '0.5rem' }} />
            </div>
          )}
        </div>

        <div className="detail-sidebar">
          <div className="detail-card">
            <h3>Manage Complaint</h3>

            <div className="form-group">
              <label>Status</label>
              <select value={formData.status} onChange={handleStatusChange}>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select value={formData.priority} onChange={handlePriorityChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="form-group">
              <label>Assign to Staff</label>
              <select value={formData.staffId} onChange={handleAssignStaff}>
                <option value="">Select Staff Member</option>
                {staffList.map(staff => (
                  <option key={staff._id} value={staff._id}>
                    {staff.name} ({staff.department})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {complaint.assignedTo && (
            <div className="detail-card">
              <h3>Assigned To</h3>
              <p><strong>{complaint.assignedTo.name}</strong></p>
              <p>{complaint.assignedTo.email}</p>
              <p>{complaint.assignedTo.phone}</p>
            </div>
          )}
        </div>
      </div>

      {complaint.comments.length > 0 && (
        <div className="detail-card">
          <h3>Comments</h3>
          <div className="comments-list">
            {complaint.comments.map(c => (
              <div key={c._id} className="comment">
                <div className="comment-header">
                  <strong>{c.user.name}</strong>
                  <small>{new Date(c.createdAt).toLocaleDateString()}</small>
                </div>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminComplaintDetail;
