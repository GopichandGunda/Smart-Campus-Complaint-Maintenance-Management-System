import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { complaintService } from '../../services/services';
import DashboardCard from '../../components/DashboardCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';
import '../../styles/StaffDashboard.css';

const StaffDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    assigned: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await complaintService.getStaffComplaints();
      if (response.data.success) {
        const comps = response.data.complaints;
        setComplaints(comps.slice(0, 5));

        const stats = {
          assigned: comps.length,
          pending: comps.filter(c => c.status === 'Assigned').length,
          inProgress: comps.filter(c => c.status === 'In Progress').length,
          resolved: comps.filter(c => c.status === 'Resolved').length
        };
        setStats(stats);
      }
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="staff-dashboard">
      <div className="dashboard-header">
        <h1>Staff Dashboard</h1>
        <button onClick={fetchData} className="btn btn-secondary btn-sm">
          Refresh
        </button>
      </div>

      {error && <Alert type="danger" message={error} onClose={() => setError('')} />}

      <div className="dashboard-cards">
        <DashboardCard
          title="Assigned Complaints"
          value={stats.assigned}
          icon={<AlertCircle size={24} />}
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
          icon={<CheckCircle size={24} />}
          color="success"
        />
      </div>

      <div className="dashboard-section">
        <h2>My Assigned Complaints</h2>
        {complaints.length === 0 ? (
          <div className="empty-state">
            <p>No complaints assigned yet.</p>
          </div>
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
                {complaints.map(complaint => (
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
    </div>
  );
};

export default StaffDashboard;
