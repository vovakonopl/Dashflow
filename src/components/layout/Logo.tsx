import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

type TLogoProps = {
  className?: string;
  imageClassName?: string;
};

const Logo = ({ className, imageClassName }: TLogoProps) => {
  return (
    <div className={cn('h-8', className)}>
      <Image
        src="/logo.png"
        alt="Logo"
        className={cn('size-full object-contain', imageClassName)}
        height={64}
        width={300}
        priority
      />
    </div>
  );
};

export default Logo;
