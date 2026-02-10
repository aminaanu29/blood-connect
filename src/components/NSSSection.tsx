import { motion } from "framer-motion";
import { GraduationCap, Users, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NSSSection = () => {
  return (
    <section id="nss-groups" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-coral-light rounded-full px-4 py-2 mb-6">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                For Colleges & Universities
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              NSS College Network
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Empower your college's NSS unit to coordinate blood drives and respond
              to emergencies as a team.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Team Registration",
                description:
                  "Register your entire NSS unit. Add verified student donors, track availability, and manage your team from one dashboard.",
              },
              {
                icon: Shield,
                title: "Verified & Trusted",
                description:
                  "Admin-verified college accounts ensure trust. Receivers can confidently request blood from verified NSS groups nearby.",
              },
              {
                icon: GraduationCap,
                title: "Campus Drives",
                description:
                  "Organize blood donation camps, track participation, and build your college's lifesaving legacy.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border p-8 hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-coral-light flex items-center justify-center mb-5">
                  <card.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="hero-outline" size="lg">
              Register Your NSS Unit
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NSSSection;
