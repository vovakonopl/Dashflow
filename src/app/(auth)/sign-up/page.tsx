import {
  AuthCard,
  AuthCardDescription,
  AuthCardTitle,
} from '@/app/(auth)/_components/auth-card';
import AuthLink from '@/app/(auth)/_components/AuthLink';
import SignUpForm from '@/app/(auth)/_components/forms/SignUpForm';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import CenteredContent from '@/components/utils/CenteredContent';

export default function SignUpPage() {
  return (
    <CenteredContent className="p-8">
      <AuthCard>
        <CardHeader>
          <AuthCardTitle>Sign Up</AuthCardTitle>
          <AuthCardDescription>
            Create a new account for Dashflow.
          </AuthCardDescription>
        </CardHeader>

        <CardContent>
          <SignUpForm />
        </CardContent>

        <CardFooter className="flex flex-col gap-10">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <AuthLink href="/sign-in">Sign In</AuthLink>
          </p>
        </CardFooter>
      </AuthCard>
    </CenteredContent>
  );
}
