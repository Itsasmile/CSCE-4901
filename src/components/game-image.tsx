interface GameImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function GameImage({ src, alt, className = "" }: GameImageProps) {
  return (
    <div className="relative w-full pt-[56.25%]">
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        onError={(e) => {
          e.currentTarget.src = "/placeholder.svg?height=400&width=600";
        }}
        className={`absolute inset-0 w-full h-full object-fill ${className}`}
      />
    </div>
  );
}
