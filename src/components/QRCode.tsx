interface QRCodeProps {
  label: string;
  caption?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function QRCode({ label, size = 'md' }: QRCodeProps) {
  const dims = { sm: 'w-24 h-24', md: 'w-32 h-32', lg: 'w-40 h-40' };
  const labelSize = { sm: 'text-[10px]', md: 'text-xs', lg: 'text-sm' };

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div className={`${dims[size]} bg-white rounded-lg border-2 border-ink p-2 shadow-soft relative`}>
        <div className="qr-pattern w-full h-full rounded-sm" />
        <div className="absolute top-2 left-2 w-5 h-5 border-[3px] border-ink rounded-sm bg-white">
          <div className="w-2 h-2 bg-ink rounded-sm m-auto mt-1" />
        </div>
        <div className="absolute top-2 right-2 w-5 h-5 border-[3px] border-ink rounded-sm bg-white">
          <div className="w-2 h-2 bg-ink rounded-sm m-auto mt-1" />
        </div>
        <div className="absolute bottom-2 left-2 w-5 h-5 border-[3px] border-ink rounded-sm bg-white">
          <div className="w-2 h-2 bg-ink rounded-sm m-auto mt-1" />
        </div>
      </div>
      <div className="text-center">
        <p className={`${labelSize[size]} font-medium text-ink-soft`}>{label}</p>
      </div>
    </div>
  );
}
