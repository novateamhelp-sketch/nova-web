interface ServiceAreaMapProps {
  mapEmbedUrl?: string;
  title: string;
}

export const ServiceAreaMap = ({ mapEmbedUrl, title }: ServiceAreaMapProps) => {
  if (!mapEmbedUrl?.trim()) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <iframe
        title={`${title} service area map`}
        src={mapEmbedUrl}
        className="aspect-[16/10] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
};
