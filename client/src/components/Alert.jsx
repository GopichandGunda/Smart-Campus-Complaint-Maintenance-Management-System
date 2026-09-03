import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const Alert = ({ type = 'info', message, onClose }) => {
  const icons = {
    success: <CheckCircle size={20} />,
    danger: <AlertCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />
  };

  return (
    <div className={`alert alert-${type}`}>
      {icons[type]}
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer' }}>
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;
