import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/services';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';
import '../../styles/AdminUsers.css';

const AdminStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await adminService.getAllStaff();
      if (response.data.success) {
        setStaff(response.data.staff);
      }
    } catch (err) {
      setError('Failed to load staff');
    } finally {
      setLoading(false);
    }
  };

  const filteredStaff = staff.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="admin-users">
      <h1>Staff Management</h1>

      {error && <Alert type="danger" message={error} onClose={() => setError('')} />}

      <input
        type="text"
        placeholder="Search staff..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {filteredStaff.length === 0 ? (
        <div className="empty-state">
          <p>No staff found.</p>
        </div>
      ) : (
        <div className="users-table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Employee ID</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map(member => (
                <tr key={member._id}>
                  <td><strong>{member.name}</strong></td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>{member.employeeId || '—'}</td>
                  <td>{member.department || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminStaff;
