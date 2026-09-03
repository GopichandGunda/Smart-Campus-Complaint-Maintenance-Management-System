import React from 'react';

const PriorityBadge = ({ priority }) => {
  const priorityColors = {
    'Low': 'badge-primary',
    'Medium': 'badge-warning',
    'High': 'badge-danger',
    'Critical': 'badge-danger'
  };

  return (
    <span className={`badge ${priorityColors[priority] || 'badge-primary'}`}>
      {priority}
    </span>
  );
};

export default PriorityBadge;
