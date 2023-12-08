type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return <div className='max-w-[1200px] mx-auto md:px-10 px-4'>{children}</div>;
};
