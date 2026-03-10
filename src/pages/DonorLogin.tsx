import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

const DonorLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Welcome back! 🎉");
    navigate("/");
  };

  const inputClass =
    "w-full h-12 rounded-xl border-2 border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="font-display text-xl font-bold text-foreground">
              HEMOLINK
            </span>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Heart className="w-12 h-12 text-primary fill-primary mx-auto mb-4" />
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Donor Login
            </h1>
            <p className="text-muted-foreground">
              Sign in to view and respond to blood requests.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="hope"
              size="xl"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Not a donor yet?{" "}
              <Link
                to="/donor-register"
                className="text-primary font-medium hover:underline"
              >
                Register now
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default DonorLogin;
