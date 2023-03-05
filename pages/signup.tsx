import React, { useEffect } from 'react';
import { SignupDetails } from '../constants/Types';
import { useForm } from 'react-hook-form';
import { useAuthenticatedUser, useSurrealSignup } from '../constants/Queries';
import { useRouter } from 'next/router';
import FormPage from '../components/layout/FormPage';
import Input from '../components/form/Input';
import Head from '../components/Head';

export default function Signup() {
    const router = useRouter();
    const { data: user } = useAuthenticatedUser();
    const { register, handleSubmit } = useForm<SignupDetails>();
    const { isLoading, mutate } = useSurrealSignup({
        onSuccess: () => router.push('/'),
        onFailure: () => alert('User already exists!'),
    });

    useEffect(() => {
        if (user) router.push('/');
    }, [user, router]);

    return (
        <>
            <Head
                title="Signin"
                description="Sign in to your account on this awesome blog to create new tickets and manage existing ones!"
            />
            <FormPage
                {...{
                    title: 'Signup',
                    onSubmit: handleSubmit((auth) => mutate(auth)),
                    isLoading,
                }}
            >
                <div className="mb-4 sm:mb-8">
                    <Input
                        {...register('name')}
                        type="text"
                        placeholder="Your name"
                    />
                </div>
                <div className="mb-4 sm:mb-8">
                    <Input
                        {...register('username')}
                        type="text"
                        placeholder="Username"
                    />
                </div>
                <div className="mb-4 sm:mb-8">
                    <Input
                        {...register('password')}
                        type="password"
                        placeholder="Password"
                    />
                </div>
            </FormPage>
        </>
    );
}
