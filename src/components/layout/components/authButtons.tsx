import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router';

export default function AuthButtons() {
  return (
    <div className="flex space-x-4">
      <Link to="/auth/login" className={buttonVariants({ variant: 'outline' })}>
        Login
      </Link>
      <Link
        to="/auth/register"
        className={buttonVariants({ variant: 'default' })}
      >
        Register
      </Link>
    </div>
  );
}
