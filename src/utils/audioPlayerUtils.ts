
import { CustomUIModule } from 'react-h5-audio-player/lib/src/interfaces';

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

// Fix the typing issues by using proper CustomUIModule[] type
export const defaultControlsSection: CustomUIModule[] = ['MAIN_CONTROLS', 'VOLUME_CONTROLS'];
export const defaultProgressBarSection: CustomUIModule[] = ['PROGRESS_BAR', 'CURRENT_TIME', 'DURATION'];
