
import { MailCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate} from "react-router-dom";

export default function OtpSentPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-xl transition-all duration-300 ease-in-out">
        <CardContent className="p-6 text-center space-y-6">
          <MailCheck className="mx-auto h-12 w-12 text-primary" />
          <h2 className="text-xl font-bold text-foreground">OTP Sent</h2>
          <p className="text-muted-foreground">
            We’ve sent a verification code to{" "}
            <span className="font-medium text-foreground">
              Email
            </span>
            . Please check your inbox and verify your email.
          </p>

          <Button onClick={() => navigate("/login")} className="mt-4 w-full">
            Go to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
