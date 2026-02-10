import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertCircle, MapPin, Phone } from "lucide-react";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyLevels = ["Critical", "Urgent", "Normal"];

const BloodRequestForm = () => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [urgency, setUrgency] = useState("");

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

            {/* Location */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-3">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location
              </label>
              <input
                type="text"
                placeholder="Enter hospital or area name"
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
                className="w-full h-12 rounded-xl border-2 border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <Button variant="hero" size="xl" className="w-full">
              Submit Blood Request
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Your contact info will only be shared with consenting donors.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BloodRequestForm;
