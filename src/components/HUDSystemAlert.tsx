'use client';

import React, { useEffect, useState } from 'react';
import { useHUDStore } from '../store/useHUDStore';

export const HUDSystemAlert: React.FC = () => {
  const message = useHUDStore(state => state.systemMessage);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [message]);

  if (!message && !visible) return null;

  return (
    <div className={`hud-alert ${visible ? 'active' : ''}`} role="alert">
      <div className="alert-content">
        <span className="alert-prefix">[SYSTEM]</span>
        <span className="alert-text">{message}</span>
      </div>
      <div className="alert-scanline" />
    </div>
  );
};
