import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Status = "loading" | "success" | "error";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("Verifying your email...");
  const [isRetrying, setIsRetrying] = useState(false);

  // ✅ Get token from URL once when ready
  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setStatus("error");
      setMessage("Invalid or missing verification token.");
    }
  }, [searchParams]);

  // ✅ Trigger email verification when token is available
  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      setStatus("loading");
      setMessage("Verifying your email...");

      try {
        const res = await axios.get(
          `http://localhost:5000/api/tokenverify?token=${token}`
        );

        if (res.data.success) {
          setStatus("success");
          setMessage("Your email has been successfully verified.");
          setTimeout(() => {
            navigate("/login")
          }, 2000);
        } else {
          throw new Error(res.data.message || "Verification failed.");
        }
      } catch (err: any) {
        setStatus("error");
        setMessage(
          err.response?.data?.message || err.message || "Something went wrong."
        );
      } finally {
        setIsRetrying(false);
      }
    };

    verifyEmail();
  }, [token]);

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
              <Button onClick={() => navigate("/login")}>Go to Login</Button>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="mx-auto h-12 w-12 text-red-600" />
              <h2 className="text-xl font-semibold text-red-700">
                Verification Failed
              </h2>
              <p className="text-muted-foreground">{message}</p>
              {token && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsRetrying(true);
                    setStatus("loading");
                    setMessage("Retrying verification...");
                  }}
                  disabled={isRetrying}
                >
                  {isRetrying ? "Retrying..." : "Retry Verification"}
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => navigate("/resend-verification")}
                className="mt-2"
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
