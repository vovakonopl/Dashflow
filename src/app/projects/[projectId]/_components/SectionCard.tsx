import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

type TSectionCard = {
  children: ReactNode;
  className?: string;
};

const SectionCard = ({ children, className }: TSectionCard) => {
  return (
    <section className={className}>
      <Card className="shadow-xs">{children}</Card>
    </section>
  );
};

export default SectionCard;
