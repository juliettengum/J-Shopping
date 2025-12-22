"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { ErrorContext } from "better-auth/react";

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: '/',
      rememberMe: data.rememberMe
    },
    {
      onSuccess: () => {
        toast.success('Logged in successfully')
      },
      onError: (ctx: ErrorContext) => {
        toast.error(ctx.error.message)
      },
    }
  )
  };

  const isPending = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="leading-5">Email address*</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email address"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="leading-5">Password*</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={isVisible ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    className="pr-9"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsVisible((prevState) => !prevState)}
                    className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
                  >
                    {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                    <span className="sr-only">
                      {isVisible ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between gap-y-2">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="size-6"
                  />
                </FormControl>
                <FormLabel className="text-muted-foreground font-normal cursor-pointer">
                  Remember Me
                </FormLabel>
              </FormItem>
            )}
          />

          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
        </div>

        <Button disabled={isPending} className="w-full" type="submit">
          {isPending ? (
            <>
              <Spinner />
              <span>Logging in...</span>
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
