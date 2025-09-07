import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils/cn';

type TSectionCard = {
  children: ReactNode;
  className?: string;
  cardClassName?: string;
};

const SectionCard = ({ cardClassName, className, children }: TSectionCard) => {
  return (
    <section className={className}>
      <Card className={cn('shadow-xs', cardClassName)}>{children}</Card>
    </section>
  );
};

export default SectionCard;
