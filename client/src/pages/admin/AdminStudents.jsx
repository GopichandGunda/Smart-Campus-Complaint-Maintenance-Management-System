import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/services';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';
import '../../styles/AdminUsers.css';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await adminService.getAllStudents();
      if (response.data.success) {
        setStudents(response.data.students);
      }
    } catch (err) {
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="admin-users">
      <h1>Students Management</h1>

      {error && <Alert type="danger" message={error} onClose={() => setError('')} />}

      <input
        type="text"
        placeholder="Search students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {filteredStudents.length === 0 ? (
        <div className="empty-state">
          <p>No students found.</p>
        </div>
      ) : (
        <div className="users-table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Student ID</th>
                <th>College</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student._id}>
                  <td><strong>{student.name}</strong></td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.studentId || '—'}</td>
                  <td>{student.college || '—'}</td>
                  <td>{student.department || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
