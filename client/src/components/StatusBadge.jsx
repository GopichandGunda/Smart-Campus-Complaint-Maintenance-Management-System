import React from 'react';

const StatusBadge = ({ status }) => {
  const statusColors = {
    'Submitted': 'badge-primary',
    'Under Review': 'badge-warning',
    'Assigned': 'badge-info',
    'In Progress': 'badge-warning',
    'Resolved': 'badge-success',
    'Closed': 'badge-secondary',
    'Rejected': 'badge-danger'
  };

  return (
    <span className={`badge ${statusColors[status] || 'badge-primary'}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
