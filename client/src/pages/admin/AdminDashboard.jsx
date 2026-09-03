import React, { useState, useEffect } from 'react';
import { BarChart3, Users, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { adminService, complaintService } from '../../services/services';
import DashboardCard from '../../components/DashboardCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    underReview: 0,
    assigned: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
    totalStudents: 0,
    totalStaff: 0
  });
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [recentFeedback, setRecentFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, complaintsRes, feedbackRes] = await Promise.all([
        adminService.getStatistics(),
        complaintService.getComplaints(),
        adminService.getRecentFeedback()
      ]);

      if (statsRes.data.success) {
        setStats(statsRes.data.statistics);
      }
      if (complaintsRes.data.success) {
        setRecentComplaints(complaintsRes.data.complaints.slice(0, 5));
      }
      if (feedbackRes.data.success) {
        setRecentFeedback(feedbackRes.data.feedback.slice(0, 5));
      }
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={fetchDashboardData} className="btn btn-secondary btn-sm">
          Refresh
        </button>
      </div>

      {error && <Alert type="danger" message={error} onClose={() => setError('')} />}

      <div className="dashboard-cards">
        <DashboardCard
          title="Total Complaints"
          value={stats.totalComplaints}
          icon={<TrendingUp size={24} />}
          color="primary"
        />
        <DashboardCard
          title="Pending"
          value={stats.pendingComplaints}
          icon={<AlertCircle size={24} />}
          color="warning"
        />
        <DashboardCard
          title="In Progress"
          value={stats.inProgress}
          icon="⚙️"
          color="warning"
        />
        <DashboardCard
          title="Resolved"
          value={stats.resolved}
          icon={<CheckCircle size={24} />}
          color="success"
        />
        <DashboardCard
          title="Total Students"
          value={stats.totalStudents}
          icon={<Users size={24} />}
          color="primary"
        />
        <DashboardCard
          title="Total Staff"
          value={stats.totalStaff}
          icon="👥"
          color="secondary"
        />
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h2>Recent Complaints</h2>
          {recentComplaints.length === 0 ? (
            <p className="text-muted">No complaints yet</p>
          ) : (
            <div className="complaints-table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Student</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentComplaints.map(complaint => (
                    <tr key={complaint._id}>
                      <td><strong>{complaint.title}</strong></td>
                      <td>{complaint.submittedBy.name}</td>
                      <td><span className={`badge badge-${complaint.priority.toLowerCase()}`}>{complaint.priority}</span></td>
                      <td><span className={`badge badge-${complaint.status.toLowerCase().replace(' ', '-')}`}>{complaint.status}</span></td>
                      <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <h2>Recent Feedback</h2>
          {recentFeedback.length === 0 ? (
            <p className="text-muted">No feedback yet</p>
          ) : (
            <div className="feedback-list">
              {recentFeedback.map(feedback => (
                <div key={feedback._id} className="feedback-item">
                  <div className="feedback-header">
                    <strong>{feedback.student.name}</strong>
                    <span className="rating">{'⭐'.repeat(feedback.rating)}</span>
                  </div>
                  <p>{feedback.complaint.title}</p>
                  <small>{feedback.comment || 'No comment'}</small>
                  <small className="date">{new Date(feedback.createdAt).toLocaleDateString()}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
