import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp } from 'lucide-react';
import { complaintService } from '../../services/services';
import DashboardCard from '../../components/DashboardCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';
import '../../styles/StudentDashboard.css';

const StudentDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await complaintService.getMyComplaints();
      if (response.data.success) {
        const complaints = response.data.complaints;
        setComplaints(complaints.slice(0, 5));

        const stats = {
          total: complaints.length,
          pending: complaints.filter(c => c.status === 'Submitted').length,
          inProgress: complaints.filter(c => ['Assigned', 'In Progress'].includes(c.status)).length,
          resolved: complaints.filter(c => c.status === 'Resolved').length,
          closed: complaints.filter(c => c.status === 'Closed').length
        };
        setStats(stats);
      }
    } catch (err) {
      setError('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <Link to="/student/complaints/new" className="btn btn-primary">
          <Plus size={20} /> New Complaint
        </Link>
      </div>

      {error && <Alert type="danger" message={error} onClose={() => setError('')} />}

      <div className="dashboard-cards">
        <DashboardCard
          title="Total Complaints"
          value={stats.total}
          icon={<TrendingUp size={24} />}
          color="primary"
        />
        <DashboardCard
          title="Pending"
          value={stats.pending}
          icon="📋"
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
          icon="✓"
          color="success"
        />
      </div>

      <div className="dashboard-section">
        <h2>Recent Complaints</h2>
        {complaints.length === 0 ? (
          <div className="empty-state">
            <p>No complaints yet. Create your first complaint!</p>
            <Link to="/student/complaints/new" className="btn btn-primary">
              Create Complaint
            </Link>
          </div>
        ) : (
          <div className="complaints-table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map(complaint => (
                  <tr key={complaint._id}>
                    <td>{complaint.title}</td>
                    <td>{complaint.category}</td>
                    <td><span className={`badge badge-${complaint.status.toLowerCase().replace(' ', '-')}`}>{complaint.status}</span></td>
                    <td><span className={`badge badge-${complaint.priority.toLowerCase()}`}>{complaint.priority}</span></td>
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

      <div className="dashboard-section">
        <Link to="/student/complaints" className="btn btn-outline">
          View All Complaints
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
