
import { CustomUIModules } from 'react-h5-audio-player';

export const audioPlayerStyles = {
  background: 'transparent',
  boxShadow: 'none',
  width: '100%',
  '& .rhap_progress-bar': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  '& .rhap_progress-indicator': {
    backgroundColor: '#fff',
  },
  '& .rhap_controls-section': {
    backgroundColor: 'transparent',
  },
  '& .rhap_main-controls-button': {
    color: '#fff',
  },
  '& .rhap_time': {
    color: '#fff',
  },
  '& .rhap_progress-filled': {
    backgroundColor: '#fff',
  },
};

// Update the type to use CustomUIModules instead of CustomUIModule[]
export const defaultControlsSection: CustomUIModules = ['MAIN_CONTROLS', 'VOLUME_CONTROLS'];
export const defaultProgressBarSection: CustomUIModules = ['PROGRESS_BAR', 'CURRENT_TIME', 'DURATION'];
