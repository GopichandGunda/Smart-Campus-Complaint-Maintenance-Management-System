import React from 'react';

const DashboardCard = ({ title, value, icon, color = 'primary' }) => {
  return (
    <div className="dashboard-card" style={{ borderLeftColor: `var(--${color}-color)` }}>
      <div className="dashboard-card-header">
        <h4>{title}</h4>
        <div className={`dashboard-card-icon dashboard-card-icon-${color}`}>
          {icon}
        </div>
      </div>
      <p className="dashboard-card-value">{value}</p>
    </div>
  );
};

export default DashboardCard;
