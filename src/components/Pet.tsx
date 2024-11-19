import React, { useEffect, useState } from 'react';

interface Embed3DModelProps {
  src: string; // URL of the embedded 3D object
}

const Embed3DModel: React.FC<Embed3DModelProps> = ({ src }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure rendering happens only on the client side
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Avoid SSR-related mismatches

  return (
    <div className="w-full h-full">
      <iframe
        src={src}
        frameBorder="0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
        className="w-full h-full rounded-lg"
      ></iframe>
    </div>
  );
};

export default Embed3DModel;
