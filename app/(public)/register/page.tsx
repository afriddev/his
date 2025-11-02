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
import { useRegister } from '@/hooks/authHooks';
import { registerRequestDataType } from '@/types/authDataTypes';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser, isPending } = useRegister();
  const [signUpStep, setSignUpStep] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<registerRequestDataType & { agree: boolean }>();

  function onSubmit(data: registerRequestDataType) {
    registerUser({
      emailId: data.emailId,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      otp: data.otp,
    });
  }

  function handleBackClick() {
    setSignUpStep(0);
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
                <h2 className="text-3xl ">Create Your Account</h2>
                <p className="text-muted-foreground  mt-1">OpenHis health information exchanges</p>
              </div>
              {signUpStep === 0 ? (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full">
                      <Input
                        mandatory
                        label="First name"
                        errorMessage={errors?.firstName?.message}
                        placeholder="First name"
                        {...register('firstName', {
                          required: 'Please enter First Name',
                        })}
                      />
                    </div>
                    <div className="w-full">
                      <Input label="Last name" errorMessage={errors.lastName?.message} placeholder="Last name" {...register('lastName', { required: false })} />
                    </div>
                  </div>
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
                  <div className="flex  gap-1 flex-col h-20 pt-4">
                    <label className="flex items-start gap-2 text-muted-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('agree', {
                          required: 'You must accept FreeGrow’s Terms of Use and Privacy Policy to continue.',
                          validate: (v) => v === true || 'You must accept FreeGrow’s Terms of Use and Privacy Policy to continue.',
                        })}
                        className="mt-1 cursor-pointer accent-primary"
                      />
                      <span className="text-sm leading-relaxed">
                        I have read and agree to OpenHIS{' '}
                        <a href="/terms" target="_blank" className="text-primary hover:underline font-medium">
                          Terms of Use
                        </a>{' '}
                        and{' '}
                        <a href="/privacy-policy" target="_blank" className="text-primary hover:underline font-medium">
                          Privacy Policy
                        </a>
                        .
                      </span>
                    </label>

                    <p className="  text-destructive">{<label className="">{errors?.agree?.message}</label>}</p>
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
                {signUpStep === 1 && (
                  <Button onClick={handleBackClick} type="button" className="px-10 w-fit" variant={'outline'}>
                    <MdArrowBackIosNew className="w-5 h-5" /> Back
                  </Button>
                )}
                <Button disabled={watch('agree') !== true} type="submit" className="px-10 w-fit" variant={'constructive'}>
                  Create account
                </Button>
              </div>
              <p className="text-center  text-muted-foreground">
                Already have an account?{' '}
                <a href="/login" className="text-primary underline font-medium">
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default SignUp;
