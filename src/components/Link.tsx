import clsx from 'clsx';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'button';
}

export const Link: React.FC<LinkProps> = ({ 
  children, 
  className,
  variant = 'default',
  ...props 
}) => {
  return (
    <a
      className={clsx(
        'text-gray-600 hover:text-gray-900 transition-colors',
        variant === 'button' && 'bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
};