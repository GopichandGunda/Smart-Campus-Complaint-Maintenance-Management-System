import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintService } from '../../services/services';
import Alert from '../../components/Alert';
import '../../styles/CreateComplaint.css';

const CreateComplaint = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electrical',
    location: '',
    priority: 'Medium',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title || !formData.description || !formData.location) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await complaintService.createComplaint(formData);
      if (response.data.success) {
        setSuccess('Complaint submitted successfully!');
        setTimeout(() => {
          navigate('/student/complaints');
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-complaint">
      <div className="create-complaint-card">
        <h1>Submit New Complaint</h1>
        <p>Describe the issue you're facing on campus</p>

        {error && <Alert type="danger" message={error} onClose={() => setError('')} />}
        {success && <Alert type="success" message={success} />}

        <form onSubmit={handleSubmit} className="complaint-form">
          <div className="form-group">
            <label htmlFor="title">Complaint Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief title of the complaint"
              required
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} required>
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
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Building, Room, or Area"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue in detail..."
              rows="5"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="image">Attach Image (Optional)</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.image && (
              <div className="image-preview">
                <img src={formData.image} alt="Preview" />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateComplaint;
