/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from '@/components/ui/use-toast';
import { loginAPI, registerAPI } from '@/services/authApis';
import { loginRequestDataType, registerRequestDataType } from '@/types/authDataTypes';
import { useMutation } from '@tanstack/react-query';

export function useLogin() {
  const { toast } = useToast();
  const {
    data,
    isPending,
    mutate: login,
  } = useMutation({
    mutationFn: (data: loginRequestDataType) => loginAPI(data),
    onSuccess(data) {
      if (data?.data === 'Success') {
        toast({
          title: 'Login Successful',
          description: 'You have successfully logged in.',
          variant: 'constructive',
        });
      }
    },
    onError(error: any) {
      console.log('Login error:', error);
      toast({
        title: 'Login Failed',
        description: 'An error occurred during login.',
        variant: 'destructive',
      });
    },
  });

  return { data, isPending, login };
}

export function useRegister() {
  const { toast } = useToast();
  const {
    data,
    isPending,
    mutate: register,
  } = useMutation({
    mutationFn: (data: registerRequestDataType) => registerAPI(data),
    onSuccess(data) {
      if (data?.data === 'Success') {
        toast({
          title: 'Registration Successful',
          description: 'You have successfully registered.',
          variant: 'constructive',
        });
      }
    },
    onError(error: any) {
      console.log('Registration error:', error);
      toast({
        title: 'Registration Failed',
        description: 'An error occurred during registration.',
        variant: 'destructive',
      });
    },
  });

  return { data, isPending, register };
}
