
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export default function VerifyEmailPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing verification token.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/tokenverify?token=${token}`
        );
        if (res.data.success) {
          setStatus("success");
          setMessage("✅ Your email has been successfully verified.");
          navigate("/login")
        } else {
          throw new Error(res.data.message || "Verification failed.");
        }
      } catch (err: any) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Something went wrong.");
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-6 text-center space-y-4">
          {status === "loading" && (
            <>
              <Loader2 className="mx-auto animate-spin h-10 w-10 text-primary" />
              <p className="text-muted-foreground">{message}</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
              <h2 className="text-xl font-semibold text-green-700">
                Email Verified
              </h2>
              <p className="text-muted-foreground">{message}</p>
              <Button onClick={() => (window.location.href = "/login")}>
                Go to Login
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="mx-auto h-12 w-12 text-red-600" />
              <h2 className="text-xl font-semibold text-red-700">
                Verification Failed
              </h2>
              <p className="text-muted-foreground">{message}</p>
              <Button
                variant="secondary"
                onClick={() => (window.location.href = "/resend-verification")}
              >
                Resend Verification Email
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
