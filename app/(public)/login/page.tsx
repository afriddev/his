'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { MdArrowBackIosNew } from 'react-icons/md';

import PageWrapper from '@/components/common/PageWrapper';
import AppSpinner from '@/components/common/AppSpinner';
import { useLogin } from '@/hooks/authHooks';
import { loginRequestDataType } from '@/types/authDataTypes';

function LoginIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { login: loginUser, isPending } = useLogin();
  const [loginStep, setLoginStep] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<loginRequestDataType & { agree: boolean }>();

  function onSubmit(data: loginRequestDataType) {
    loginUser(
      {
        emailId: data.emailId,
        password: data.password,
        otp: data.otp,
      },
      {
        onSettled(data) {
          console.log(data)
          if (data?.data === 'OTP_SENT') {
            setLoginStep(1);
          }
        },
      },
    );
  }

  function handleBackClick() {
    setLoginStep(0);
  }

  function handleGoogleSignInSuccess(response: any) {
    const googleAuthResponse: any = jwtDecode(response?.credential);

    onSubmit({
      email: googleAuthResponse?.email,
      firstName: googleAuthResponse?.name,
      googleSignUp: true,
      profileUrl: googleAuthResponse?.picture,
    } as any);
  }

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center  px-4 lg:px-0 h-full ">
        <div className="flex flex-col h-fit ">
          <div className=" flex  bg-background  items-center ">
            {<AppSpinner isPending={isPending} />}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto   p-10 space-y-4">
              <div className="text-center">
                <h2 className="text-3xl ">Login Into Your Account</h2>
                <p className="text-muted-foreground  mt-1">OpenHis health information exchanges</p>
              </div>
              {loginStep === 0 ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <Input
                      mandatory
                      label="Email Address"
                      errorMessage={errors.emailId?.message}
                      placeholder="Enter your email"
                      {...register('emailId', {
                        required: 'Please enter Email Address',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid Email Adress format',
                        },
                      })}
                    />
                  </div>
                  <div>
                    <div className="relative ">
                      <Input
                        label="Password"
                        mandatory
                        errorMessage={errors.password?.message}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="pr-10 w-full"
                        {...register('password', {
                          required: 'Please enter Password',
                          pattern: {
                            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/,
                            message: 'Password must be at least 8 characters, include an uppercase letter, a number, and a special character',
                          },
                        })}
                      />

                      <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-2 top-[43px] -translate-y-1/2 text-muted-foreground">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-full ">
                    <GoogleLogin
                      width={300}
                      onSuccess={handleGoogleSignInSuccess}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="py-4">
                  <Input
                    label="OTP"
                    errorMessage={errors.otp?.message}
                    placeholder="Enter OTP"
                    {...register('otp', {
                      required: 'Please enter OTP',
                    })}
                  />
                </div>
              )}

              <div className="w-full flex gap-4 items-center justify-center ">
                {loginStep === 1 && (
                  <Button onClick={handleBackClick} type="button" className="px-10 w-fit" variant={'outline'}>
                    <MdArrowBackIosNew className="w-5 h-5" /> Back
                  </Button>
                )}
                <Button type="submit" className="px-10 w-fit" variant={'constructive'}>
                  Login In
                </Button>
              </div>
              <p className="text-center  text-muted-foreground">
                Dont have an account?{' '}
                <a href="/register" className="text-primary underline font-medium">
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default LoginIn;
