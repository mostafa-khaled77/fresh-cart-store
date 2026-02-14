"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { LoginValues, schema } from "@/schema/Login.schema";

export default function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState<string|null>(null);
  const router = useRouter();

  const form = useForm<LoginValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: LoginValues) {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/",
        redirect: false,
      });
      if (res?.ok) {
        toast.success("Logged in successfully!");
        router.push("/");
      } else {
        setErrMessage(res?.error ?? null);
      }
    } catch (error) {
      toast.error("Network error, please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen -mt-30 w-full flex items-center justify-center bg-slate-50 px-4 py-12 lg:py-24">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-[450px] border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white/90 backdrop-blur-md z-10 overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600"></div>

        <CardHeader className="pt-10 pb-6 space-y-2 text-center">
          <CardTitle className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">
            Welcome <span className="text-yellow-500">Back !</span>
          </CardTitle>
          <CardDescription className="text-slate-500 font-medium italic text-base">
            Stay Fresh, Shop Smart.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 md:px-10">
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <FieldGroup className="space-y-0">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="space-y-1">
                    <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      Email Address
                    </FieldLabel>
                    <div className="relative group">
                      <Mail
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors z-10
                          ${fieldState.invalid ? "text-red-500" : "text-slate-400 group-focus-within:text-yellow-500"}`}
                      />
                      <Input
                        {...field}
                        type="email"
                        placeholder="example@gmail.com"
                        className={`pl-10 h-11 bg-white rounded-xl transition-all border-2
                          ${fieldState.invalid
                            ? "border-red-500 focus-visible:ring-red-500/20"
                            : "border-slate-200 focus-visible:ring-yellow-500/20 focus-visible:border-yellow-500"
                          }`}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError className="text-[13px] font-bold text-red-500" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="space-y-1">
                    <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      Password
                    </FieldLabel>
                    <div className="relative group">
                      <LockKeyhole
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors z-10
                          ${fieldState.invalid ? "text-red-500" : "text-slate-400 group-focus-within:text-yellow-500"}`}
                      />
                      <Input
                        {...field}
                        type={showPass ? "text" : "password"}
                        placeholder="••••••••"
                        className={`pl-10 pr-12 h-11 bg-white rounded-xl transition-all border-2
                          ${fieldState.invalid
                            ? "border-red-500 focus-visible:ring-red-500/20"
                            : "border-slate-200 focus-visible:ring-yellow-500/20 focus-visible:border-yellow-500"
                          }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors z-10
                          ${fieldState.invalid ? "text-red-500" : "text-slate-400 hover:text-slate-700"}`}
                      >
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError className="text-[13px] font-bold text-red-500" errors={[fieldState.error]}/>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        {errMessage && (
          <CardHeader className="py-3 mb-2 text-center">
          <CardDescription className="text-red-500 font-bold">{errMessage}</CardDescription>
        </CardHeader>
        )}


        <CardFooter className="flex flex-col gap-6 px-6 md:px-10 pb-10">
          <Button
            type="submit"
            form="login-form"
            disabled={isLoading}
            className={`w-full h-14 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all duration-300 shadow-lg bg-slate-900 text-white hover:bg-black active:scale-[0.97] 
              ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            ) : (
              "Login to Account"
            )}
          </Button>

          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-yellow-600 hover:text-yellow-700 font-bold underline decoration-2 underline-offset-4"
              >
                Sign Up Free
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}