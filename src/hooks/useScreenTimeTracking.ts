
import { useEffect } from 'react';
import { startScreenTimeTracking, endScreenTimeTracking } from '@/utils/screenTimeTracker';

/**
 * Hook to automatically track screen time for a component
 * @param section The section name to track (e.g., 'meditation', 'journal', 'sleep')
 */
export const useScreenTimeTracking = (section: string) => {
  useEffect(() => {
    // Start tracking when component mounts
    const initTracking = async () => {
      await startScreenTimeTracking(section);
    };
    
    initTracking();
    
    // End tracking when component unmounts
    return () => {
      endScreenTimeTracking();
    };
  }, [section]);
};
