import { motion } from "framer-motion";
import { Search, UserPlus, Bell, HeartHandshake } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Register",
    description: "Sign up as a donor, receiver, or NSS group in under a minute.",
  },
  {
    icon: Search,
    title: "Search & Match",
    description: "Find nearby donors by blood group, distance, and availability.",
  },
  {
    icon: Bell,
    title: "Get Notified",
    description: "Matching donors receive instant alerts for urgent requests.",
  },
  {
    icon: HeartHandshake,
    title: "Save a Life",
    description: "Connect, donate, and track the request until fulfilled.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-warm">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Four simple steps from emergency to relief.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-coral-light flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center md:right-auto md:left-1/2 md:ml-6 md:-top-1">
                {index + 1}
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
