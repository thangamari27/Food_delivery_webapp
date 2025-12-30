import VideoContainer from './VideoContainer';
import BehindScenseList from './BehindScenseList';
function BehindScenseContent({ videoContent, imageContent, deliveryProcess, styles }) {
  return (
    <div className={styles.content}>
        {/* behind the scense video container */}
        <VideoContainer videoContent={videoContent} imageContent={imageContent} styles={styles} />
        
        {/* behind the scense content list  */}
        <BehindScenseList deliveryProcess={deliveryProcess} styles={styles} />
    </div>
  )
}

export default BehindScenseContent