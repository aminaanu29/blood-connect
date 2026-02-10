import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User, Droplets, MapPin, Calendar } from "lucide-react";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DonorSignup = () => {
  const [selectedGroup, setSelectedGroup] = useState("");

  return (
    <section id="become-a-donor" className="py-24 bg-warm">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Become a <span className="text-primary">Lifesaver</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Join thousands of donors who are ready to help at a moment's notice.
              Register once, and we'll notify you when someone nearby needs your
              blood type.
            </p>

            <div className="space-y-4">
              {[
                { icon: Droplets, text: "Get matched by blood group instantly" },
                { icon: MapPin, text: "Location-based requests — no spam" },
                { icon: Calendar, text: "We track your eligibility window" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-coral-light flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border p-8 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-primary" />
              <h3 className="font-display text-xl font-semibold text-foreground">
                Donor Registration
              </h3>
            </div>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Full name"
                className="w-full h-12 rounded-xl border-2 border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full h-12 rounded-xl border-2 border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full h-12 rounded-xl border-2 border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Blood Group
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {bloodGroups.map((group) => (
                    <button
                      key={group}
                      onClick={() => setSelectedGroup(group)}
                      className={`h-10 rounded-lg border-2 font-bold text-xs transition-all duration-200 ${
                        selectedGroup === group
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-foreground hover:border-primary/50 bg-background"
                      }`}
                    >
                      {group}
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="text"
                placeholder="City / Area"
                className="w-full h-12 rounded-xl border-2 border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />

              <Button variant="hope" size="xl" className="w-full">
                Register as Donor
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DonorSignup;
