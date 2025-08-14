'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import SubmitButton from '@/app/(auth)/_components/SubmitButton';
import PasswordInput from '@/components/shared/PasswordInput';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUp } from '@/lib/actions/auth/signUp';
import { setUserAndStatus } from '@/lib/store/slices/user-slice';
import {
  signUpSchema,
  TSignUpData,
} from '@/lib/validation/auth/sign-up-schema';

const SignUpForm = () => {
  const [state, action, isPending] = useActionState(signUp, undefined);
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useForm<TSignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Set errors for specified fields if error occurred
  useEffect(() => {
    if (!state || state.isSuccess) return;

    const { errors } = state;
    for (const field in errors) {
      const error = errors[field as keyof typeof errors]?.errors[0];
      form.setError(field as keyof TSignUpData, {
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

  const onSubmit = (data: TSignUpData) => {
    // Transform the data into FormData object first
    const formData = new FormData();
    for (const key in data) {
      formData.set(key, data[key as keyof TSignUpData]);
    }

    startTransition(() => action(formData));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John" type="text" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Doe" type="text" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="JohnDoe@gmail.com"
                  type="email"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <SubmitButton type="submit" disabled={isPending}>
          Sign Up
        </SubmitButton>
      </form>
    </Form>
  );
};

export default SignUpForm;
