import { IKContext, IKImage } from "imagekitio-react";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
}

export default function Image({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  fill, 
  priority,
  sizes,
  style 
}: ImageProps) {
  return (
    <IKContext
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
    >
      <IKImage
        path={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? undefined : "lazy"}
        sizes={sizes}
        style={{
          ...style,
          ...(fill && {
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: 0,
          }),
        }}
      />
    </IKContext>
  );
}