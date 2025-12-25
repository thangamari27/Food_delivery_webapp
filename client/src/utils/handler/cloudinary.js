const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const getCloudinaryUrl = ({
  publicId,
  resourceType = "image", 
  format = "webp",
  width,
  height,
  crop = "fill",
  quality = "auto",
}) => {
  const transformations = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);

  // crop is IMAGE only
  if (resourceType === "image") {
    transformations.push(`c_${crop}`);
  }

  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  return `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/${transformations.join(
    ","
  )}/${publicId}`;
};
