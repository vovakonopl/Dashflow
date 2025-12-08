import { ReactNode } from 'react';

type TSectionTitleProps = {
  children: ReactNode;
};

const SectionTitle = ({ children }: TSectionTitleProps) => {
  return <h2 className="text-lg font-semibold capitalize">{children}</h2>;
};

export default SectionTitle;
