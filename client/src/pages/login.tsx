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
import { FcGoogle } from "react-icons/fc"; // Google icon (colored)
import { FaGithub } from "react-icons/fa"; // GitHub icon
import { Link } from "react-router-dom";
import axios from 'axios'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginInput = z.infer<typeof loginSchema>;


export function LoginPage() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleSocialLogin(provider: "google" | "github") {
    // Rdjdjdjdjdjdjdjdjdjdjdjdjdjdj
    window.location.href = `/auth/${provider}`;
  }
  
  const onSubmit = async (values: LoginInput) => {
    try {
      console.log("Login data:", values);
      const response = await axios.post(
        "http://localhost:5000/api/login",
        values
      );
      console.log(response)
      
    } catch (error) {
      console.log(
        "🚨 Request failed (network/server error):",
         error
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Login / Signup</h2>

        {/* Social Auth Buttons */}
        <div className="space-y-2 mb-6">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 justify-center"
            onClick={() => handleSocialLogin("google")}
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 justify-center"
            onClick={() => handleSocialLogin("github")}
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

        {/* Email/Password Form */}
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
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Login with Email
            </Button>
          </form>
        </Form>

        {/* Don't have account link */}
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
