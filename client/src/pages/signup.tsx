import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner"; // ✅ using Sonner!

function handleSocialSignup(provider: "google" | "github") {
  window.location.href = `/auth/${provider}`;
}

const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupInput = z.infer<typeof signupSchema>;

export function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignupInput) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        values
      );

      if (!response.data.success) {
        toast.error(response.data.message || "Signup failed. Try again.");

        if (response.data.field === "email") {
          form.setError("email", {
            type: "server",
            message: response.data.message,
          });
        }

        return;
      }

      toast.success("Signup successful! OTP sent to your email.");
      navigate("/otp-sent");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {/* Social Buttons */}
        <div className="space-y-2 mb-6">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 justify-center shadow-sm hover:shadow-md transition-all"
            onClick={() => handleSocialSignup("google")}
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 justify-center shadow-sm hover:shadow-md transition-all"
            onClick={() => handleSocialSignup("github")}
          >
            <FaGithub size={20} />
            Continue with GitHub
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-border" />
          <span className="mx-2 text-sm text-muted-foreground">OR</span>
          <div className="flex-grow h-px bg-border" />
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      className="transition-all focus-visible:ring-2 ring-offset-2"
                    />
                  </FormControl>
                  <FormMessage />
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
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="transition-all focus-visible:ring-2 ring-offset-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </Form>

        {/* Link to Login */}
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
