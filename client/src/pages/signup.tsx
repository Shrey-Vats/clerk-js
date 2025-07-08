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
import { Link } from "react-router-dom";
import axios from "axios";

function handleSocialSignup(provider: "google" | "github") {
  // Replace with actual OAuth signup logic
  window.location.href = `/auth/${provider}`;
}
const signupSchema = z.object({
  email: z.string().email({
    message: "Invalid Email",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupInput = z.infer<typeof signupSchema>

export function SignupPage() {
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSumbit = async (values: SignupInput) => {
    try {
      console.log(values);
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        values
      );

      if (!response.data.success) {
        console.log("error ", response.data.success);
      }

      console.log(response.data.message);
    } catch (error) {
      console.log("threr a error", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {/* Social Signup Buttons */}
        <div className="space-y-2 mb-6">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 justify-center"
            onClick={() => handleSocialSignup("google")}
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 justify-center"
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

        {/* Email & Password Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-4">
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
              Sign Up
            </Button>
          </form>
        </Form>

        {/* Already have account link */}
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