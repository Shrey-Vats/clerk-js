
import { MailCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function OtpSentPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-6 text-center space-y-4">
          <MailCheck className="mx-auto h-12 w-12 text-primary" />
          <h2 className="text-xl font-bold text-foreground">OTP Sent</h2>
          <p className="text-muted-foreground">
            We’ve sent a verification code to{" "}
            <span className="font-medium text-foreground">email</span>. Please
            check your inbox and verify your email.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
