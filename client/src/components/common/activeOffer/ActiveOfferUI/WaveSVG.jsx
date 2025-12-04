export const WaveSVG = () => (
  <svg 
    className="absolute top-0 left-0 w-full h-10 pointer-events-none" 
    viewBox="0 0 1440 48" 
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M0,24 Q360,0 720,24 T1440,24 L1440,0 L0,0 Z" 
      fill="white" 
      opacity="0.3"
    >
      <animate
        attributeName="d"
        dur="3s"
        repeatCount="indefinite"
        values="
          M0,24 Q360,0 720,24 T1440,24 L1440,0 L0,0 Z;
          M0,24 Q360,48 720,24 T1440,24 L1440,0 L0,0 Z;
          M0,24 Q360,0 720,24 T1440,24 L1440,0 L0,0 Z
        "
      />
    </path>
    <path 
      d="M0,32 Q360,16 720,32 T1440,32 L1440,0 L0,0 Z" 
      fill="white" 
      opacity="0.2"
    >
      <animate
        attributeName="d"
        dur="4s"
        repeatCount="indefinite"
        values="
          M0,32 Q360,16 720,32 T1440,32 L1440,0 L0,0 Z;
          M0,32 Q360,48 720,32 T1440,32 L1440,0 L0,0 Z;
          M0,32 Q360,16 720,32 T1440,32 L1440,0 L0,0 Z
        "
      />
    </path>
  </svg>
);