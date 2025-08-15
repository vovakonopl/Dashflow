'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import SubmitButton from '@/app/(auth)/_components/SubmitButton';
import ErrorMessage from '@/components/shared/ErrorMessage';
import FormInput from '@/components/shared/FormInput';
import PasswordInput from '@/components/shared/PasswordInput';
import { Form, FormField } from '@/components/ui/form';
import { signIn } from '@/lib/actions/auth/signIn';
import { setUserAndStatus } from '@/lib/store/slices/user-slice';
import {
  signInSchema,
  TSignInData,
} from '@/lib/validation/auth/sign-in-schema';

const SignInForm = () => {
  const [state, action, isPending] = useActionState(signIn, undefined);
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useForm<TSignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Set errors for specified fields if error occurred
  useEffect(() => {
    if (!state || state.isSuccess) return;

    const { errors } = state;
    for (const field in errors) {
      const error = errors[field as keyof typeof errors]?.errors[0];
      form.setError(field as keyof TSignInData, {
        message: error,
      });
    }
  }, [form, state]);

  // Set user data to store and redirect to dashboard on success
  useEffect(() => {
    if (!state || !state.isSuccess) return;

    const { data } = state;
    dispatch(setUserAndStatus({ data, isLoading: false }));

    // Redirect user to dashboard
    router.replace('/dashboard');
  }, [dispatch, router, state]);

  const onSubmit = (data: TSignInData) => {
    const formData = new FormData();
    for (const key in data) {
      formData.set(key, data[key as keyof TSignInData]);
    }

    startTransition(() => action(formData));
  };

  const rootErrorMsg: string | undefined = form.formState.errors.root?.message;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <FormInput
              {...field}
              error={error?.message}
              label="Email"
              placeholder="JohnDoe@gmail.com"
              type="email"
            />
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <FormInput
              {...field}
              error={error?.message}
              label="Email"
              renderInput={() => <PasswordInput {...field} />}
            />
          )}
        />

        {rootErrorMsg && <ErrorMessage>{rootErrorMsg}</ErrorMessage>}

        <SubmitButton type="submit" disabled={isPending}>
          Sign In
        </SubmitButton>
      </form>
    </Form>
  );
};

export default SignInForm;
