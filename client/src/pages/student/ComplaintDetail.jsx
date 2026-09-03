import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { complaintService, feedbackService } from '../../services/services';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';
import StatusBadge from '../../components/StatusBadge';
import PriorityBadge from '../../components/PriorityBadge';
import '../../styles/ComplaintDetail.css';

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const response = await complaintService.getComplaintById(id);
      if (response.data.success) {
        setComplaint(response.data.complaint);
      }
    } catch (err) {
      setError('Failed to load complaint');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmittingComment(true);
    try {
      await complaintService.addComment(id, comment);
      setComment('');
      fetchComplaint();
      setSuccess('Comment added successfully');
    } catch (err) {
      setError('Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setSubmittingFeedback(true);
    try {
      await feedbackService.createFeedback({
        complaintId: id,
        rating: parseInt(rating),
        comment: feedback
      });
      setFeedback('');
      setRating(5);
      fetchComplaint();
      setSuccess('Feedback submitted successfully');
    } catch (err) {
      setError('Failed to submit feedback');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!complaint) return <Alert type="danger" message="Complaint not found" />;

  return (
    <div className="complaint-detail">
      <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm">
        ← Back
      </button>

      {error && <Alert type="danger" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

      <div className="complaint-detail-header">
        <div>
          <h1>{complaint.title}</h1>
          <p className="complaint-meta">
            Submitted by: {complaint.submittedBy.name} • {new Date(complaint.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="complaint-badges">
          <StatusBadge status={complaint.status} />
          <PriorityBadge priority={complaint.priority} />
        </div>
      </div>

      <div className="complaint-grid">
        <div className="complaint-main">
          <div className="complaint-card">
            <h3>Description</h3>
            <p>{complaint.description}</p>
          </div>

          <div className="complaint-card">
            <h3>Details</h3>
            <div className="complaint-info-grid">
              <div>
                <strong>Category:</strong>
                <p>{complaint.category}</p>
              </div>
              <div>
                <strong>Location:</strong>
                <p>{complaint.location}</p>
              </div>
              <div>
                <strong>Status:</strong>
                <p>{complaint.status}</p>
              </div>
              <div>
                <strong>Priority:</strong>
                <p>{complaint.priority}</p>
              </div>
            </div>
          </div>

          {complaint.assignedTo && (
            <div className="complaint-card">
              <h3>Assigned Staff</h3>
              <p><strong>Name:</strong> {complaint.assignedTo.name}</p>
              <p><strong>Email:</strong> {complaint.assignedTo.email}</p>
              <p><strong>Phone:</strong> {complaint.assignedTo.phone}</p>
            </div>
          )}

          {complaint.resolutionNotes && (
            <div className="complaint-card">
              <h3>Resolution Notes</h3>
              <p>{complaint.resolutionNotes}</p>
            </div>
          )}

          {complaint.image && (
            <div className="complaint-card">
              <h3>Attached Image</h3>
              <img src={complaint.image} alt="Complaint" style={{ maxWidth: '100%', borderRadius: '0.5rem' }} />
            </div>
          )}
        </div>

        <div className="complaint-sidebar">
          <div className="complaint-card">
            <h3>Timeline</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div>
                  <p><strong>Submitted</strong></p>
                  <small>{new Date(complaint.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
              {complaint.resolvedAt && (
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div>
                    <p><strong>Resolved</strong></p>
                    <small>{new Date(complaint.resolvedAt).toLocaleDateString()}</small>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="complaint-comments">
        <div className="complaint-card">
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
            <button type="submit" className="btn btn-primary btn-sm" disabled={submittingComment}>
              {submittingComment ? 'Adding...' : 'Add Comment'}
            </button>
          </form>
        </div>
      </div>

      {complaint.status === 'Resolved' && (
        <div className="complaint-feedback">
          <div className="complaint-card">
            <h3>Provide Feedback</h3>
            <form onSubmit={handleSubmitFeedback}>
              <div className="form-group">
                <label>Rating</label>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                  <option value="1">⭐ Poor</option>
                  <option value="2">⭐⭐ Fair</option>
                  <option value="3">⭐⭐⭐ Good</option>
                  <option value="4">⭐⭐⭐⭐ Very Good</option>
                  <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                </select>
              </div>
              <div className="form-group">
                <label>Comment</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your feedback..."
                  rows="3"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success" disabled={submittingFeedback}>
                {submittingFeedback ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintDetail;
