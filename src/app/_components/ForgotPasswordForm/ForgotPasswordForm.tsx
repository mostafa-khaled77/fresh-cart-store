"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2, Mail, Hash, LockKeyhole } from "lucide-react";

import { 
  EmailValues, emailSchema, 
  CodeValues, codeSchema, 
  NewPasswordValues, newPasswordSchema 
} from "../../../schema/ResetPassword.schema"; 

import { forgetPassword, verifyResetCode, resetPassword } from "../../_actions/forgetPass.actions"; 

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState<string | null>(null);
  const [currentStep, setCurrentStep] = React.useState<"email" | "code" | "newPassword">("email");
  const [userEmail, setUserEmail] = React.useState<string>("");
  const router = useRouter();
  
  /* Schema */ 
  const emailForm = useForm<EmailValues>({
    defaultValues: { email: "" },
    resolver: zodResolver(emailSchema),
  });

  const codeForm = useForm<CodeValues>({
    defaultValues: { code: "" },
    resolver: zodResolver(codeSchema),
  });

  const newPasswordForm = useForm<NewPasswordValues>({
    defaultValues: { newPassword: "", confirmNewPassword: "" },
    resolver: zodResolver(newPasswordSchema),
  });


  async function handleSendCode(values: EmailValues) {
    setIsLoading(true);
    setErrMessage(null);
    const res = await forgetPassword(values.email);
    console.log(res)
    if (res.statusMsg === "success") {
      toast.success("Reset code sent to your email!");
      setUserEmail(values.email);
      setCurrentStep("code");
    } else {
      setErrMessage(res.message || "Failed to send code.");
    }
    setIsLoading(false);
  }

  async function handleVerifyCode(values: CodeValues) {
    setIsLoading(true);
    setErrMessage(null);
    const res = await verifyResetCode(values.code);
    console.log(res)
    if (res.status === "Success" || res.status === "success") {
      toast.success("Code verified!");
      setCurrentStep("newPassword");
    } else {
      setErrMessage(res.message || "Invalid code.");
    }
    setIsLoading(false);
  }

  async function handleResetPassword(values: NewPasswordValues) {
    setIsLoading(true);
    setErrMessage(null);
    const res = await resetPassword(userEmail, values.newPassword);
    console.log(res)
    if (res.token) {
      toast.success("Password updated successfully!");
      router.push("/login");
    } else {
      setErrMessage(res.message || "Failed to update password.");
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen -mt-30 w-full flex items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-[450px] shadow-xl bg-white/90 backdrop-blur-md overflow-hidden border-none">
        <div className="h-1.5 w-full bg-gradient-to-r from-yellow-400 to-yellow-600"></div>

        <CardHeader className="text-center space-y-2 pt-8">
          <CardTitle className="text-2xl font-bold uppercase tracking-tight">
            {currentStep === "email" && "Forgot Password?"}
            {currentStep === "code" && "Verify Code"}
            {currentStep === "newPassword" && "New Password"}
          </CardTitle>
          <CardDescription>
            {currentStep === "email" && "We'll send a 6-digit code to your email."}
            {currentStep === "code" && "Please check your inbox."}
            {currentStep === "newPassword" && "Enter your new secure password."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {errMessage && (
            <div className="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-md text-center">
              {errMessage}
            </div>
          )}

          {/* STEP 1: EMAIL */}
          {currentStep === "email" && (
            <form id="email-form" onSubmit={emailForm.handleSubmit(handleSendCode)} className="space-y-4">
              <Controller
                name="email"
                control={emailForm.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="text-xs font-bold uppercase text-slate-500">Email</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input {...field} type="email" placeholder="name@email.com" className="pl-10 h-11" />
                    </div>
                    {fieldState.error && <FieldError className="text-red-500 text-[13px]" errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </form>
          )}

          {/* STEP 2: CODE */}
          {currentStep === "code" && (
            <form id="code-form" onSubmit={codeForm.handleSubmit(handleVerifyCode)} className="space-y-4">
              <Controller
                name="code"
                control={codeForm.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="text-xs font-bold uppercase text-slate-500">Code</FieldLabel>
                    <div className="relative">
                      <Hash className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input {...field} maxLength={6} placeholder="123456" className="pl-10 h-11" />
                    </div>
                    {fieldState.error && <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </form>
          )}

          {/* STEP 3: NEW PASSWORD */}
          {currentStep === "newPassword" && (
            <form id="pass-form" onSubmit={newPasswordForm.handleSubmit(handleResetPassword)} className="space-y-4">
              <Controller
                name="newPassword"
                control={newPasswordForm.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="text-xs font-bold uppercase text-slate-500">New Password</FieldLabel>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input {...field} type={showPass ? "text" : "password"} className="pl-10 pr-10 h-11" />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3">
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {fieldState.error && <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="confirmNewPassword"
                control={newPasswordForm.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="text-xs font-bold uppercase text-slate-500">Confirm</FieldLabel>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input {...field} type={showPass ? "text" : "password"} className="pl-10 h-11" />
                    </div>
                    {fieldState.error && <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </form>
          )}

          <Button
            type="submit"
            form={currentStep === "email" ? "email-form" : currentStep === "code" ? "code-form" : "pass-form"}
            disabled={isLoading}
            className="w-full h-12 bg-slate-900 hover:bg-black text-white rounded-lg transition-all"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Continue"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}