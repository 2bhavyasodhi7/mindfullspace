
import { AudioPlayerProps } from 'react-h5-audio-player';

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

// Use the correct type for CustomUI modules
export const defaultControlsSection: NonNullable<AudioPlayerProps['customControlsSection']> = ['MAIN_CONTROLS', 'VOLUME_CONTROLS'];
export const defaultProgressBarSection: NonNullable<AudioPlayerProps['customProgressBarSection']> = ['PROGRESS_BAR', 'CURRENT_TIME', 'DURATION'];
