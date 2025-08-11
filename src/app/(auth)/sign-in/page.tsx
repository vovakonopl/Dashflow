import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  AuthCard,
  AuthCardDescription,
  AuthCardTitle,
} from '@/app/(auth)/_components/auth-card';
import AuthLink from '@/app/(auth)/_components/AuthLink';
import SignInForm from '@/app/(auth)/_components/forms/SignInForm';
import SubmitButton from '@/app/(auth)/_components/SubmitButton';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import CenteredContent from '@/components/utils/CenteredContent';

export default function SignInPage() {
  return (
    <CenteredContent className="p-8">
      <AuthCard>
        <CardHeader>
          <AuthCardTitle>Sign In</AuthCardTitle>
          <AuthCardDescription>
            Welcome back! Sign in to your Productivity Dashboard.
          </AuthCardDescription>
        </CardHeader>

        <CardContent>
          <SignInForm />
        </CardContent>

        <CardFooter className="flex flex-col gap-10">
          <SubmitButton type="submit">Sign In</SubmitButton>
          <p className="text-muted-foreground">
            Don&apos;t have an account?{' '}
            <AuthLink href="/sign-up">Sign Up</AuthLink>
          </p>
        </CardFooter>
      </AuthCard>
    </CenteredContent>
  );
}
