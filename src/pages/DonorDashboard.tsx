import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Phone, Droplets, LogOut, User, Calendar, CheckCircle, XCircle, AlertCircle, Clock, Navigation, Building2 } from "lucide-react";
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

interface BloodRequest {
  id: string;
  blood_group: string;
  urgency: string;
  location: string | null;
  city: string | null;
  hospital_name: string | null;
  contact_number: string | null;
  latitude: number | null;
  longitude: number | null;
  status: string;
  created_at: string;
}

const getTimeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<DonorProfile | null>(null);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [acceptedRequests, setAcceptedRequests] = useState<Set<string>>(new Set());

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

      // Fetch active blood requests matching donor's blood group
      const { data: requests } = await supabase
        .from("blood_requests")
        .select("*")
        .eq("blood_group", donor.blood_group)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(20);

      setBloodRequests((requests as BloodRequest[]) || []);
      setLoading(false);
    };

    loadDashboard();

    // Realtime subscription for new blood requests
    const channel = supabase
      .channel("blood-requests-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "blood_requests" },
        (payload) => {
          const newRequest = payload.new as BloodRequest;
          setProfile((current) => {
            if (current && newRequest.blood_group === current.blood_group && newRequest.status === "active") {
              setBloodRequests((prev) => [newRequest, ...prev]);
              toast.info(`New ${newRequest.blood_group} blood request!`);
            }
            return current;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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

          {/* Matching Blood Requests */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-primary" />
              Blood Requests for {profile.blood_group}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Active requests matching your blood group — reach out if you can help.
            </p>

            {bloodRequests.length > 0 ? (
              <div className="space-y-3">
                {bloodRequests.map((req) => {
                  const timeAgo = getTimeAgo(req.created_at);
                  const isAccepted = acceptedRequests.has(req.id);

                  // Prefer lat/lng for accurate navigation, fall back to text-based search
                  const googleMapsUrl = req.latitude && req.longitude
                    ? `https://www.google.com/maps/search/?api=1&query=${req.latitude},${req.longitude}`
                    : req.location
                    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        (req.hospital_name ? req.hospital_name + ", " : "") + req.location
                      )}`
                    : req.hospital_name
                    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(req.hospital_name)}`
                    : null;

                  return (
                    <div
                      key={req.id}
                      className="rounded-xl border border-border bg-background overflow-hidden"
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary font-bold text-xs px-2.5 py-0.5 rounded-full">
                              {req.blood_group}
                            </span>
                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                              req.urgency === "Critical"
                                ? "bg-destructive/10 text-destructive"
                                : req.urgency === "Urgent"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-muted text-muted-foreground"
                            }`}>
                              <AlertCircle className="w-3 h-3 inline mr-1" />
                              {req.urgency}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {timeAgo}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            {req.hospital_name && (
                              <p className="text-sm text-foreground flex items-center gap-1 font-medium">
                                <Building2 className="w-3.5 h-3.5 text-muted-foreground" /> {req.hospital_name}
                              </p>
                            )}
                            {req.location && (
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" /> {req.location}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {req.contact_number && (
                              <a
                                href={`tel:${req.contact_number}`}
                                className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
                              >
                                <Phone className="w-3.5 h-3.5" /> Call
                              </a>
                            )}
                            {!isAccepted && (
                              <Button
                                size="sm"
                                variant="hope"
                                className="text-xs gap-1"
                                onClick={() => {
                                  setAcceptedRequests((prev) => new Set(prev).add(req.id));
                                  toast.success("Thank you for helping save a life ❤️");
                                }}
                              >
                                <CheckCircle className="w-3.5 h-3.5" /> Confirm Donation
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Location details shown after accepting */}
                      <AnimatePresence>
                        {isAccepted && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-border bg-primary/5 px-4 py-5"
                          >
                            <div className="text-center mb-4">
                              <p className="text-base font-semibold text-foreground">
                                Thank you for helping save a life ❤️
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Here is the hospital location for your donation.
                              </p>
                            </div>
                            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
                              <Navigation className="w-4 h-4 text-primary" /> Hospital Details
                            </h4>
                            <div className="space-y-2 text-sm">
                              {req.hospital_name && (
                                <div className="flex items-center gap-2 text-foreground">
                                  <Building2 className="w-4 h-4 text-primary" />
                                  <span className="font-medium">{req.hospital_name}</span>
                                </div>
                              )}
                              {req.location && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <MapPin className="w-4 h-4 text-primary" />
                                  <span>{req.location}</span>
                                </div>
                              )}
                              {req.contact_number && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Phone className="w-4 h-4 text-primary" />
                                  <a href={`tel:${req.contact_number}`} className="text-primary hover:underline font-medium">
                                    {req.contact_number}
                                  </a>
                                </div>
                              )}
                              {googleMapsUrl && (
                                <a
                                  href={googleMapsUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-3 inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                                >
                                  <Navigation className="w-4 h-4" />
                                  Open in Google Maps
                                </a>
                              )}
                              {!req.hospital_name && !req.location && (
                                <p className="text-muted-foreground italic">No location details were provided for this request.</p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10">
                <Droplets className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground">No active requests for {profile.blood_group} right now. Check back later!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonorDashboard;
