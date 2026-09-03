import api from './api';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data)
};

export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getAllUsers: () => api.get('/users'),
  getUsersByRole: (role) => api.get(`/users/role/${role}`)
};

export const complaintService = {
  createComplaint: (data) => api.post('/complaints', data),
  getComplaints: (filters = {}) => api.get('/complaints', { params: filters }),
  getComplaintById: (id) => api.get(`/complaints/${id}`),
  getMyComplaints: (filters = {}) => api.get('/complaints/my/complaints', { params: filters }),
  getStaffComplaints: (filters = {}) => api.get('/complaints/staff/assigned', { params: filters }),
  updateComplaintStatus: (id, status) => api.put(`/complaints/${id}/status`, { status }),
  updateComplaintPriority: (id, priority) => api.put(`/complaints/${id}/priority`, { priority }),
  assignStaff: (id, staffId) => api.put(`/complaints/${id}/assign`, { staffId }),
  addComment: (id, text) => api.post(`/complaints/${id}/comments`, { text }),
  addResolutionNotes: (id, resolutionNotes) => api.put(`/complaints/${id}/resolution-notes`, { resolutionNotes }),
  deleteComplaint: (id) => api.delete(`/complaints/${id}`)
};

export const feedbackService = {
  createFeedback: (data) => api.post('/feedback', data),
  getFeedback: () => api.get('/feedback'),
  getComplaintFeedback: (complaintId) => api.get(`/feedback/${complaintId}`)
};

export const adminService = {
  getStatistics: () => api.get('/admin/statistics'),
  getAllStudents: () => api.get('/admin/students'),
  getAllStaff: () => api.get('/admin/staff'),
  getRecentFeedback: () => api.get('/admin/feedback/recent')
};
