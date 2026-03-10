import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const registerSchema = z
  .object({
    fullName: z.string().trim().min(1, "Full name is required").max(100),
    email: z.string().trim().email("Invalid email address"),
    phone: z
      .string()
      .trim()
      .min(10, "Phone number must be at least 10 digits")
      .max(15)
      .regex(/^[+\d\s()-]+$/, "Invalid phone number"),
    bloodGroup: z.string().min(1, "Blood group is required"),
    city: z.string().trim().min(1, "City is required").max(100),
    state: z.string().trim().min(1, "State is required").max(100),
    lastDonationDate: z.string().optional(),
    isAvailable: z.boolean(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
      .regex(/[0-9]/, "Must contain at least 1 number"),
    confirmPassword: z.string(),
    consent: z.literal(true, {
      errorMap: () => ({ message: "You must agree to be contacted" }),
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof registerSchema>;

const DonorRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    bloodGroup: "",
    city: "",
    state: "",
    lastDonationDate: "",
    isAvailable: true,
    password: "",
    confirmPassword: "",
    consent: false,
  });

  const set = (key: string, value: string | boolean) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = registerSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const key = err.path.join(".");
        if (!fieldErrors[key]) fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: window.location.origin + "/donor-login",
      },
    });

    if (authError) {
      setLoading(false);
      toast.error(authError.message);
      return;
    }

    // 2. Insert donor record
    const { error: insertError } = await supabase.from("donors").insert({
      full_name: form.fullName,
      email: form.email,
      phone: form.phone,
      blood_group: form.bloodGroup,
      city: form.city,
      state: form.state,
      last_donation_date: form.lastDonationDate || null,
      is_available: form.isAvailable,
      user_id: authData.user?.id ?? null,
    });

    setLoading(false);

    if (insertError) {
      toast.error("Registration failed. Please try again.");
      console.error(insertError);
      return;
    }

    toast.success(
      "Registration successful! Please check your email to verify your account."
    );
    navigate("/donor-login");
  };

  const inputClass =
    "w-full h-12 rounded-xl border-2 border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-background">
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

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto"
        >
          <div className="text-center mb-8">
            <Heart className="w-12 h-12 text-primary fill-primary mx-auto mb-4" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Become a Blood Donor
            </h1>
            <p className="text-muted-foreground">
              Register to be notified when someone nearby needs your blood type.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-5"
          >
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                className={inputClass}
              />
              {errors.fullName && (
                <p className="text-destructive text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className={inputClass}
              />
              {errors.email && (
                <p className="text-destructive text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputClass}
              />
              {errors.phone && (
                <p className="text-destructive text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Blood Group *
              </label>
              <div className="grid grid-cols-4 gap-2">
                {bloodGroups.map((group) => (
                  <button
                    key={group}
                    type="button"
                    onClick={() => set("bloodGroup", group)}
                    className={`h-10 rounded-lg border-2 font-bold text-xs transition-all duration-200 ${
                      form.bloodGroup === group
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:border-primary/50 bg-background"
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>
              {errors.bloodGroup && (
                <p className="text-destructive text-xs mt-1">
                  {errors.bloodGroup}
                </p>
              )}
            </div>

            {/* City & State */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  City *
                </label>
                <input
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  className={inputClass}
                />
                {errors.city && (
                  <p className="text-destructive text-xs mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  State *
                </label>
                <input
                  type="text"
                  placeholder="State"
                  value={form.state}
                  onChange={(e) => set("state", e.target.value)}
                  className={inputClass}
                />
                {errors.state && (
                  <p className="text-destructive text-xs mt-1">{errors.state}</p>
                )}
              </div>
            </div>

            {/* Last Donation Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Last Blood Donation Date{" "}
                <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                type="date"
                value={form.lastDonationDate}
                onChange={(e) => set("lastDonationDate", e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Availability Status *
              </label>
              <div className="flex gap-4">
                {[
                  { label: "Available to Donate", value: true },
                  { label: "Not Available Currently", value: false },
                ].map((opt) => (
                  <label
                    key={opt.label}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm ${
                      form.isAvailable === opt.value
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="availability"
                      checked={form.isAvailable === opt.value}
                      onChange={() => set("isAvailable", opt.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        form.isAvailable === opt.value
                          ? "border-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {form.isAvailable === opt.value && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Create Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 chars, 1 uppercase, 1 number"
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
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
              {errors.password && (
                <p className="text-destructive text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={(e) => set("confirmPassword", e.target.value)}
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-destructive text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Consent */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set("consent", e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-border accent-primary"
              />
              <span className="text-sm text-muted-foreground">
                I agree to be contacted when someone nearby requests my blood
                type. *
              </span>
            </label>
            {errors.consent && (
              <p className="text-destructive text-xs -mt-3">{errors.consent}</p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="hope"
              size="xl"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register as Donor"}
            </Button>

            {/* Footer link */}
            <p className="text-center text-sm text-muted-foreground">
              Already a donor?{" "}
              <Link
                to="/donor-login"
                className="text-primary font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default DonorRegister;
