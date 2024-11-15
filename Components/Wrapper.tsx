import clsx from 'clsx';
import { ReactNode } from 'react';

const Wrapper: React.FC<{
  className?: string;
  children: ReactNode;
}> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        'px-4 py-2 md:px-8 md:py-4 lg:px-12 lg:py-4 xl:px-20 xl:py-8 2xl:px-24 2xl:py-10 max-w-[1920px] mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;
