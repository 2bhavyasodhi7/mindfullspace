
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

export const defaultControlsSection = ['MAIN_CONTROLS', 'VOLUME_CONTROLS'];
export const defaultProgressBarSection = ['PROGRESS_BAR', 'CURRENT_TIME', 'DURATION'];
