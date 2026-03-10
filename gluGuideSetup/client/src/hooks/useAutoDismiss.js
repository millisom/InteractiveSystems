import { useEffect } from 'react';
import { NOTIFICATIONS } from '../constants/index.js';

/**
 * Custom hook to auto-dismiss messages after a specified duration
 * @param {string} message - The message to auto-dismiss
 * @param {function} clearMessage - Function to clear the message
 * @param {number} duration - Duration in milliseconds (optional, defaults based on message type)
 * @param {string} type - Type of message ('success' | 'error' | 'warning' | 'info')
 */
export const useAutoDismiss = (message, clearMessage, type = 'info', customDuration = null) => {
  useEffect(() => {
    if (message) {
      // Determine duration based on type or use custom duration
      let duration = customDuration;
      
      if (!duration) {
        switch (type) {
          case NOTIFICATIONS.TYPES.SUCCESS:
            duration = NOTIFICATIONS.DURATION.SHORT; // 3 seconds
            break;
          case NOTIFICATIONS.TYPES.ERROR:
            duration = NOTIFICATIONS.DURATION.MEDIUM; // 5 seconds
            break;
          case NOTIFICATIONS.TYPES.WARNING:
            duration = NOTIFICATIONS.DURATION.MEDIUM; // 5 seconds
            break;
          case NOTIFICATIONS.TYPES.INFO:
            duration = NOTIFICATIONS.DURATION.SHORT; // 3 seconds
            break;
          default:
            duration = NOTIFICATIONS.DURATION.SHORT;
        }
      }
      
      const timer = setTimeout(() => {
        clearMessage('');
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage, type, customDuration]);
};

export default useAutoDismiss;