import Image from "@/components/common/Image";

const HeroBowl = ({ image, position, size, gradient, borderColor, sizeClass }) => {
  
  return (
    <div className={`absolute ${position} ${sizeClass[size]} rounded-full bg-white shadow-2xl overflow-hidden border-8 ${borderColor} transform hover:scale-105 transition-transform duration-300`}>
      <div className={`w-full h-full ${gradient} flex items-center justify-center`}>
        <Image 
          src={image.src}
          srcFallback={image.srcFallback}
          alt={image.alt}
          width={image.width}
          height={image.height}
          imageStyle={image.imageStyle}
        />
      </div>
    </div>
  );
};

export default HeroBowl;