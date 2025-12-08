import { useTranslations } from 'next-intl';
import {
  AuthCard,
  AuthCardDescription,
  AuthCardTitle,
} from '@/app/(auth)/_components/auth-card';
import AuthLink from '@/app/(auth)/_components/AuthLink';
import SignInForm from '@/app/(auth)/_components/forms/SignInForm';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import CenteredContent from '@/components/utils/CenteredContent';

export default function SignInPage() {
  const t = useTranslations('auth.signIn');

  return (
    <CenteredContent className="p-8">
      <AuthCard>
        <CardHeader>
          <AuthCardTitle className="capitalize">{t('signIn')}</AuthCardTitle>
          <AuthCardDescription>{t('title')}</AuthCardDescription>
        </CardHeader>

        <CardContent>
          <SignInForm />
        </CardContent>

        <CardFooter className="flex flex-col gap-10">
          <p className="text-muted-foreground">
            {t.rich('footer', {
              link: (children) => (
                <AuthLink href="/sign-up" className="capitalize">
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
