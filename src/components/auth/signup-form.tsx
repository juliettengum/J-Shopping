'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Spinner } from '../ui/spinner'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { ErrorContext } from 'better-auth/react'
import { useRouter } from 'next/navigation'

// Zod validation schema
const signupSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the privacy policy & terms',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export const SignupForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const router = useRouter();
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  const onSubmit = async (data: SignupFormValues) => {
    await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      callbackURL: '/',  
    },
    {
      onSuccess: () => {
        router.push('/');
        toast.success('Account created successfully')
      },
      onError: (ctx: ErrorContext) => {
        toast.error(ctx.error.message)
      },
    }
  )
  }

  const isPending = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {/* name */}
          <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='leading-5'>Name*</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Enter your name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='leading-5'>Email address*</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='Enter your email address'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='leading-5'>Password*</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder='••••••••••••••••'
                    className='pr-9'
                    {...field}
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    onClick={() => setIsPasswordVisible(prevState => !prevState)}
                    className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
                  >
                    {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    <span className='sr-only'>
                      {isPasswordVisible ? 'Hide password' : 'Show password'}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='leading-5'>Confirm Password*</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    placeholder='••••••••••••••••'
                    className='pr-9'
                    {...field}
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    onClick={() =>
                      setIsConfirmPasswordVisible(prevState => !prevState)
                    }
                    className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
                  >
                    {isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    <span className='sr-only'>
                      {isConfirmPasswordVisible ? 'Hide password' : 'Show password'}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Privacy policy */}
        <FormField
          control={form.control}
          name='acceptTerms'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center gap-3 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className='size-6 mt-0.5'
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel className='font-normal cursor-pointer'>
                  <span className='text-muted-foreground'>I agree to</span>{' '}
                  <a href='#' className='hover:underline'>
                    privacy policy & terms
                  </a>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button disabled={isPending} className='w-full' type='submit'>
          {isPending ? (
            <>
              <Spinner />
              <span>Creating account...</span>
            </>
          ) : (
            "Sign up"
          )}
        </Button>
      </form>
    </Form>
  )
}

