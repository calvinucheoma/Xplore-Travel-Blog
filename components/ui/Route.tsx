import clsx from 'clsx';
import Link from 'next/link';

interface RouteProps {
  route: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const Route: React.FC<RouteProps> = ({ route, label, isActive, onClick }) => {
  return (
    <Link
      href={route}
      onClick={onClick}
      className={clsx(isActive && 'text-primary')}
    >
      {label}
    </Link>
  );
};

export default Route;
