type ContainerProps = {
  children: React.ReactNode;
  main?: boolean;
  maxWidth?: string;
};

export function Container({
  children,
  main = true,
  maxWidth = 'max-w-[1200px]',
}: ContainerProps) {
  return (
    <div className={`${maxWidth} mx-auto md:px-10 px-4 ${main && 'pb-10'}`}>
      {children}
    </div>
  );
}
