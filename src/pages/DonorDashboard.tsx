import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Phone, Droplets, LogOut, User, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

interface DonorProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  blood_group: string;
  city: string;
  state: string | null;
  is_available: boolean;
  last_donation_date: string | null;
  created_at: string;
}

interface MatchingDonor {
  id: string;
  full_name: string;
  phone: string;
  city: string;
  blood_group: string;
}

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<DonorProfile | null>(null);
  const [matchingRequests, setMatchingRequests] = useState<MatchingDonor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/donor-login");
        return;
      }

      const { data: donor, error } = await supabase
        .from("donors")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error || !donor) {
        toast.error("Could not load your profile.");
        navigate("/donor-login");
        return;
      }

      setProfile(donor as DonorProfile);

      // Find other donors in the same city with same blood group (simulating "requests")
      const { data: nearby } = await supabase
        .from("donors")
        .select("id, full_name, phone, city, blood_group")
        .eq("blood_group", donor.blood_group)
        .eq("city", donor.city)
        .eq("is_available", true)
        .neq("id", donor.id)
        .limit(10);

      setMatchingRequests((nearby as MatchingDonor[]) || []);
      setLoading(false);
    };

    loadDashboard();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const toggleAvailability = async () => {
    if (!profile) return;
    const newStatus = !profile.is_available;
    const { error } = await supabase
      .from("donors")
      .update({ is_available: newStatus })
      .eq("id", profile.id);

    if (error) {
      toast.error("Failed to update availability");
      return;
    }

    setProfile({ ...profile, is_available: newStatus });
    toast.success(newStatus ? "You're now available to donate!" : "Availability turned off.");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Heart className="w-10 h-10 text-primary fill-primary" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const donationDate = profile.last_donation_date
    ? new Date(profile.last_donation_date).toLocaleDateString("en-IN", {
        day: "numeric", month: "long", year: "numeric",
      })
    : "Not recorded";

  const memberSince = new Date(profile.created_at).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="font-display text-xl font-bold text-foreground">HEMOLINK</span>
          </Link>
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome, {profile.full_name.split(" ")[0]}!
            </h1>
            <p className="text-muted-foreground">Your donor dashboard — track your donations and see nearby requests.</p>
          </div>

          {/* Profile Card */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm mb-8">
            <div className="flex items-start justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Your Profile
              </h2>
              <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full ${
                profile.is_available
                  ? "bg-accent/10 text-accent"
                  : "bg-destructive/10 text-destructive"
              }`}>
                {profile.is_available ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {profile.is_available ? "Available" : "Unavailable"}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Name:</span>
                  <span className="text-foreground font-medium">{profile.full_name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Droplets className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Blood Group:</span>
                  <span className="bg-primary/10 text-primary font-bold text-xs px-2.5 py-0.5 rounded-full">{profile.blood_group}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="text-foreground font-medium">{profile.phone}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-foreground font-medium">{profile.city}{profile.state ? `, ${profile.state}` : ""}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Last Donation:</span>
                  <span className="text-foreground font-medium">{donationDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Heart className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Member Since:</span>
                  <span className="text-foreground font-medium">{memberSince}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-border">
              <Button
                variant={profile.is_available ? "outline" : "hope"}
                size="default"
                onClick={toggleAvailability}
              >
                {profile.is_available ? "Mark as Unavailable" : "Mark as Available"}
              </Button>
            </div>
          </div>

          {/* Matching Donors / Requests */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-primary" />
              Donors Near You ({profile.blood_group})
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Other available {profile.blood_group} donors in {profile.city} — potential partners for blood drives.
            </p>

            {matchingRequests.length > 0 ? (
              <div className="space-y-3">
                {matchingRequests.map((donor) => (
                  <div
                    key={donor.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-border bg-background"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-coral-light flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{donor.full_name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {donor.city}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-primary/10 text-primary font-bold text-xs px-2.5 py-0.5 rounded-full">
                        {donor.blood_group}
                      </span>
                      <a
                        href={`tel:${donor.phone}`}
                        className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Droplets className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground">No other {profile.blood_group} donors found in {profile.city} yet.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonorDashboard;
