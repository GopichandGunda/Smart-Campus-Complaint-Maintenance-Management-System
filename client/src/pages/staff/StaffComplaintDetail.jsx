import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { complaintService } from '../../services/services';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';
import StatusBadge from '../../components/StatusBadge';
import PriorityBadge from '../../components/PriorityBadge';
import '../../styles/StaffComplaintDetail.css';

const StaffComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [comment, setComment] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showResolutionForm, setShowResolutionForm] = useState(false);

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const response = await complaintService.getComplaintById(id);
      if (response.data.success) {
        const comp = response.data.complaint;
        setComplaint(comp);
        setResolutionNotes(comp.resolutionNotes || '');
      }
    } catch (err) {
      setError('Failed to load complaint');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    setSubmitting(true);
    try {
      const response = await complaintService.updateComplaintStatus(id, newStatus);
      if (response.data.success) {
        setComplaint(response.data.complaint);
        setSuccess('Status updated successfully');
      }
    } catch (err) {
      setError('Failed to update status');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      await complaintService.addComment(id, comment);
      setComment('');
      fetchComplaint();
      setSuccess('Comment added successfully');
    } catch (err) {
      setError('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddResolutionNotes = async (e) => {
    e.preventDefault();
    if (!resolutionNotes.trim()) return;

    setSubmitting(true);
    try {
      await complaintService.addResolutionNotes(id, resolutionNotes);
      fetchComplaint();
      setSuccess('Resolution notes added');
      setShowResolutionForm(false);
    } catch (err) {
      setError('Failed to add resolution notes');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!complaint) return <Alert type="danger" message="Complaint not found" />;

  return (
    <div className="staff-complaint-detail">
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
            <h3>Complaint Details</h3>
            <p>{complaint.description}</p>
          </div>

          <div className="detail-card">
            <h3>Information</h3>
            <div className="info-grid">
              <div>
                <strong>Category:</strong>
                <p>{complaint.category}</p>
              </div>
              <div>
                <strong>Location:</strong>
                <p>{complaint.location}</p>
              </div>
              <div>
                <strong>Student:</strong>
                <p>{complaint.submittedBy.name}</p>
              </div>
              <div>
                <strong>Contact:</strong>
                <p>{complaint.submittedBy.phone}</p>
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
            <h3>Quick Actions</h3>

            <div className="actions-group">
              {complaint.status === 'Assigned' && (
                <button
                  onClick={() => handleStatusUpdate('In Progress')}
                  className="btn btn-primary btn-block"
                  disabled={submitting}
                >
                  {submitting ? 'Updating...' : 'Start Work'}
                </button>
              )}

              {complaint.status === 'In Progress' && (
                <>
                  <button
                    onClick={() => setShowResolutionForm(!showResolutionForm)}
                    className="btn btn-secondary btn-block"
                  >
                    Add Resolution Notes
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('Resolved')}
                    className="btn btn-success btn-block"
                    disabled={submitting}
                  >
                    {submitting ? 'Updating...' : 'Mark as Resolved'}
                  </button>
                </>
              )}

              {complaint.status === 'Resolved' && (
                <p className="text-success">✓ Complaint marked as resolved</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showResolutionForm && complaint.status === 'In Progress' && (
        <div className="detail-card">
          <h3>Add Resolution Notes</h3>
          <form onSubmit={handleAddResolutionNotes}>
            <textarea
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              placeholder="Describe the work done and how the complaint was resolved..."
              rows="4"
              required
            ></textarea>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save Notes'}
            </button>
          </form>
        </div>
      )}

      {complaint.resolutionNotes && (
        <div className="detail-card">
          <h3>Resolution Notes</h3>
          <p>{complaint.resolutionNotes}</p>
        </div>
      )}

      <div className="detail-comments">
        <div className="detail-card">
          <h3>Comments</h3>

          {complaint.comments.length === 0 ? (
            <p className="text-muted">No comments yet</p>
          ) : (
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
          )}

          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              rows="3"
            ></textarea>
            <button type="submit" className="btn btn-primary btn-sm" disabled={submitting}>
              {submitting ? 'Adding...' : 'Add Comment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffComplaintDetail;
