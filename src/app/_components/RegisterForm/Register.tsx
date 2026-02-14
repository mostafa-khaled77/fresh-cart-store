"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, User, Mail, Phone, LockKeyhole } from "lucide-react";
import RegisterUser from "@/apis/AuthApi/register.api";
import { RegisterValues, schema } from "@/schema/Register.schema";



export default function RegisterForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const router = useRouter();

  const form = useForm<RegisterValues>({
    defaultValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: RegisterValues) {
    try {
      setIsLoading(true);
      const data = await RegisterUser(values);
      if (data.message === "success") {
        toast.success("Account created! Welcome aboard.");
        router.push("/login");
      } else {
        if (data.message.includes("Exists")) {
          form.setError("email", { message: "Account Already Exists" });
        } else {
          toast.error(data.message || "Registration failed");
        }
      }
    } catch (error) {
      toast.error("Network error, please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen -mt-20 w-full flex items-center justify-center bg-slate-50 px-4 py-10 lg:py-20">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-[550px] border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white/90 backdrop-blur-md z-10">
        <div className="h-1.5 w-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600"></div>
        
        <CardHeader className="pt-8 pb-6 text-center">
          <CardTitle className="text-3xl font-black text-slate-900 tracking-tight uppercase">
            Sign <span className="text-yellow-500 text-4xl">Up</span>
          </CardTitle>
          <CardDescription className="text-slate-500 font-medium italic">
            Quality & Style at your fingertips.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 md:px-10">
          <form id="register-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="space-y-1">
                    <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</FieldLabel>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-yellow-500" />
                      <Input {...field} placeholder="John Doe" className="pl-10 h-11 bg-white border-slate-200 rounded-xl focus:ring-yellow-500/20 transition-all" />
                    </div>
                    {fieldState.invalid && <FieldError className="text-[10px] font-bold" errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="space-y-1">
                    <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Phone</FieldLabel>
                    <div className="relative group">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-yellow-500" />
                      <Input {...field} type="tel" placeholder="01xxxxxxxxx" className="pl-10 h-11 bg-white border-slate-200 rounded-xl focus:ring-yellow-500/20 transition-all" />
                    </div>
                    {fieldState.invalid && <FieldError className="text-[10px] font-bold" errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-1">
                  <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</FieldLabel>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-yellow-500" />
                    <Input {...field} type="email" placeholder="example@gmail.com" className="pl-10 h-11 bg-white border-slate-200 rounded-xl focus:ring-yellow-500/20 transition-all" />
                  </div>
                  {fieldState.invalid && <FieldError className="text-[10px] font-bold" errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="space-y-1">
                    <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Password</FieldLabel>
                    <div className="relative group">
                      <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-yellow-500" />
                      <Input {...field} type={showPass ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10 h-11 bg-white border-slate-200 rounded-xl transition-all" />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {fieldState.invalid && <FieldError className="text-[10px] font-bold" errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="space-y-1">
                    <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Confirm</FieldLabel>
                    <div className="relative group">
                      <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-yellow-500" />
                      <Input {...field} type={showPass ? "text" : "password"} placeholder="••••••••" className="pl-10 h-11 bg-white border-slate-200 rounded-xl transition-all" />
                    </div>
                    {fieldState.invalid && <FieldError className="text-[10px] font-bold" errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-6 px-6 md:px-10 pb-10 pt-4">
          <Button
            type="submit"
            form="register-form"
            disabled={isLoading}
            className={`w-full h-14 rounded-xl text-lg font-black uppercase tracking-widest transition-all duration-300 shadow-lg bg-slate-900 text-white hover:bg-black active:scale-[0.97] 
              ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : "Sign Up Now"}
          </Button>

          <p className="text-sm font-medium text-slate-500 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-600 hover:text-yellow-700 font-bold underline decoration-2 underline-offset-4">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}