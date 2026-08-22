import { Link, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { loginSchema, type LoginFormData } from '../schemas/authSchema';

import { useLogin } from '../hooks/useLogin';

import { toast } from '@/components/ui/toast';
// import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  // const { isAuthenticated } = useAuth();
  const { login, isLoading, error } = useLogin();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data.email, data.password);

      toast.add({
        title: 'Login successful',
        description: response.message || 'You have successfully logged in.',
        type: 'success',
      });

      navigate('/');
    } catch {
      toast.add({
        title: 'Login failed',
        description: error || 'An error occurred during login.',
        type: 'error',
      });
    }
  };

  return (
    <Card className="w-full border-0 shadow-none sm:max-w-md sm:border sm:shadow-sm">
      <CardHeader className="space-y-1 px-1 sm:px-6">
        <CardTitle className="text-2xl sm:text-3xl">Welcome back</CardTitle>

        <CardDescription className="text-sm sm:text-base">
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-1 sm:px-6">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-5">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                {...form.register('email')}
              />

              {form.formState.errors.email && (
                <FieldError>{form.formState.errors.email.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  autoComplete="current-password"
                  className="pr-10"
                  {...form.register('password')}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {form.formState.errors.password && (
                <FieldError>
                  {form.formState.errors.password.message}
                </FieldError>
              )}
            </Field>

            <Button type="submit" className="mt-1 w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </FieldGroup>
        </form>

        {error && (
          <p className="mt-3 text-center text-sm text-destructive">{error}</p>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            to="/auth/register"
            className="font-medium text-foreground hover:underline"
          >
            Create one
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
