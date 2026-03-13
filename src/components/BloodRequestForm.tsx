import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertCircle, MapPin, Phone, User, Droplets, ChevronDown, ChevronUp, Calendar, Clock, LocateFixed } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyLevels = ["Critical", "Urgent", "Normal"];

interface Donor {
  id: string;
  full_name: string;
  phone: string;
  city: string;
  blood_group: string;
  state: string | null;
  last_donation_date: string | null;
  created_at: string;
  is_available: boolean;
}

const BloodRequestForm = () => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [urgency, setUrgency] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expandedDonor, setExpandedDonor] = useState<string | null>(null);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
        setDetectingLocation(false);
        toast.success("Location detected successfully!");
      },
      () => {
        setDetectingLocation(false);
        toast.error("Unable to detect location. Please enter coordinates manually.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = async () => {
    if (!selectedGroup) {
      toast.error("Please select a blood group");
      return;
    }

    setLoading(true);

    // 1. Insert the blood request into the database
    const { error: insertError } = await supabase.from("blood_requests").insert({
      blood_group: selectedGroup,
      urgency: urgency || "Normal",
      hospital_name: hospitalName || null,
      location: location || null,
      city: location || null,
      contact_number: contactNumber || null,
    });

    if (insertError) {
      setLoading(false);
      toast.error("Failed to submit request. Please try again.");
      console.error(insertError);
      return;
    }

    // 2. Search for matching donors
    const { data, error } = await supabase
      .from("donors")
      .select("id, full_name, phone, city, blood_group, state, last_donation_date, created_at, is_available")
      .eq("blood_group", selectedGroup)
      .eq("is_available", true);

    setLoading(false);
    setSearched(true);

    if (error) {
      toast.error("Request saved but donor search failed.");
      console.error(error);
      return;
    }

    setDonors((data as Donor[]) || []);
    if (data && data.length > 0) {
      toast.success(`Request submitted! Found ${data.length} donor(s) with ${selectedGroup}`);
    } else {
      toast.success("Request submitted! Matching donors will see it on their dashboard.");
    }
  };

  return (
    <section id="request-blood" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Request Blood
            </h2>
            <p className="text-muted-foreground text-lg">
              We'll find the nearest available donors for you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border p-8 shadow-sm"
          >
            {/* Blood Group Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-3">
                Required Blood Group
              </label>
              <div className="grid grid-cols-4 gap-3">
                {bloodGroups.map((group) => (
                  <button
                    key={group}
                    onClick={() => setSelectedGroup(group)}
                    className={`h-12 rounded-xl border-2 font-bold text-sm transition-all duration-200 ${
                      selectedGroup === group
                        ? "border-primary bg-primary text-primary-foreground shadow-md"
                        : "border-border text-foreground hover:border-primary/50 bg-background"
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-3">
                <AlertCircle className="w-4 h-4 inline mr-1" />
                Urgency Level
              </label>
              <div className="flex gap-3">
                {urgencyLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setUrgency(level)}
                    className={`flex-1 h-11 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                      urgency === level
                        ? level === "Critical"
                          ? "border-destructive bg-destructive text-destructive-foreground"
                          : "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:border-primary/50 bg-background"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Hospital Name */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-3">
                🏥 Hospital Name
              </label>
              <input
                type="text"
                placeholder="e.g. Apollo Hospital, AIIMS Delhi"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="w-full h-12 rounded-xl border-2 border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Location / Address */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-3">
                <MapPin className="w-4 h-4 inline mr-1" />
                Hospital Address / Area
              </label>
              <input
                type="text"
                placeholder="Full address or area for navigation"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-12 rounded-xl border-2 border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Contact */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-3">
                <Phone className="w-4 h-4 inline mr-1" />
                Contact Number
              </label>
              <input
                type="tel"
                placeholder="Your phone number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full h-12 rounded-xl border-2 border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <Button
              variant="hero"
              size="xl"
              className="w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Searching..." : "Submit Blood Request"}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Your contact info will only be shared with consenting donors.
            </p>
          </motion.div>

          {/* Donor Results */}
          {searched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10"
            >
              <h3 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
                {donors.length > 0
                  ? `Available Donors for ${selectedGroup}`
                  : "No Donors Found"}
              </h3>

              {donors.length > 0 ? (
                <div className="grid gap-4">
                  {donors.map((donor) => (
                    <div
                      key={donor.id}
                      className="bg-card rounded-xl border border-border overflow-hidden"
                    >
                      <div className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() =>
                              setExpandedDonor(
                                expandedDonor === donor.id ? null : donor.id
                              )
                            }
                            className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors"
                            title="View donor details"
                          >
                            {expandedDonor === donor.id ? (
                              <ChevronUp className="w-5 h-5 text-primary" />
                            ) : (
                              <User className="w-6 h-6 text-primary" />
                            )}
                          </button>
                          <div>
                            <p className="font-semibold text-foreground">
                              {donor.full_name}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {donor.city}{donor.state ? `, ${donor.state}` : ""}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="bg-primary/10 text-primary font-bold text-sm px-3 py-1 rounded-full">
                            {donor.blood_group}
                          </span>
                          <a
                            href={`tel:${donor.phone}`}
                            className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                          >
                            <Phone className="w-4 h-4" /> Call
                          </a>
                        </div>
                      </div>

                      {/* Expanded Donor Details */}
                      {expandedDonor === donor.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-border bg-muted/30 px-5 py-4"
                        >
                          <h4 className="text-sm font-semibold text-foreground mb-3">Donor Record</h4>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Droplets className="w-4 h-4 text-primary" />
                              <span>Blood Group: <strong className="text-foreground">{donor.blood_group}</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span>Last Donation: <strong className="text-foreground">
                                {donor.last_donation_date
                                  ? new Date(donor.last_donation_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                                  : "No record"}
                              </strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-4 h-4 text-primary" />
                              <span>Registered: <strong className="text-foreground">
                                {new Date(donor.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                              </strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span>Location: <strong className="text-foreground">{donor.city}{donor.state ? `, ${donor.state}` : ""}</strong></span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No donors with blood group {selectedGroup} are available right
                  now. Please try again later.
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BloodRequestForm;
