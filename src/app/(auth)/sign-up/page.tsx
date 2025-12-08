import { useTranslations } from 'next-intl';
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
  const t = useTranslations('auth.signUp');

  return (
    <CenteredContent className="p-8">
      <AuthCard>
        <CardHeader>
          <AuthCardTitle>{t('signUp')}</AuthCardTitle>
          <AuthCardDescription>{t('title')}</AuthCardDescription>
        </CardHeader>

        <CardContent>
          <SignUpForm />
        </CardContent>

        <CardFooter className="flex flex-col gap-10">
          <p className="text-muted-foreground">
            {t.rich('footer', {
              link: (children) => (
                <AuthLink href="/sign-in" className="capitalize">
                  {children}
                </AuthLink>
              ),
            })}
          </p>
        </CardFooter>
      </AuthCard>
    </CenteredContent>
  );
}
