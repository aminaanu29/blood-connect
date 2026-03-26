import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Droplets, Users, MapPin, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { nssSlides } from "@/data/nssSlides";

const AUTO_PLAY_INTERVAL = 6000;

const NSSShowcase = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % nssSlides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + nssSlides.length) % nssSlides.length), []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const slide = nssSlides[current];

  const totalUnits = nssSlides.reduce((a, s) => a + s.unitsCollected, 0);
  const totalDonors = nssSlides.reduce((a, s) => a + s.donorCount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Stats Bar */}
      <section className="pt-24 pb-6">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
              NSS <span className="text-primary">Blood Donation</span> Camps
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Celebrating the selfless spirit of NSS volunteers across Kerala's colleges — one drop at a time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-10"
          >
            {[
              { icon: Droplets, label: "Units Collected", value: totalUnits },
              { icon: Users, label: "Total Donors", value: totalDonors },
              { icon: MapPin, label: "Camps Featured", value: nssSlides.length },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="font-display text-2xl md:text-3xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Slideshow */}
      <section
        className="pb-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg bg-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Image */}
                <div className="relative h-[300px] md:h-[420px]">
                  <img
                    src={slide.image}
                    alt={`Blood donation camp at ${slide.college}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Overlay info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-primary/90 text-primary-foreground text-xs font-bold px-2.5 py-0.5 rounded-full">
                          {slide.district}
                        </span>
                        <span className="text-white/70 text-xs">NSS Camp</span>
                      </div>
                      <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
                        {slide.college}
                      </h2>
                      <p className="text-white/80 text-sm md:text-base max-w-xl leading-relaxed">
                        {slide.description}
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Bottom details */}
                <div className="p-5 md:p-8">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-semibold">
                      <Droplets className="w-4 h-4" /> {slide.unitsCollected} units
                    </div>
                    <div className="flex items-center gap-1.5 bg-accent/10 text-accent px-3 py-1.5 rounded-full text-sm font-semibold">
                      <Users className="w-4 h-4" /> {slide.donorCount} donors
                    </div>
                  </div>
                  <p className="text-muted-foreground italic text-sm md:text-base">
                    "{slide.caption}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav arrows */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/3 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 border border-border shadow hover:bg-background transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/3 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 border border-border shadow hover:bg-background transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {nssSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 bg-primary/5 border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="w-10 h-10 text-primary fill-primary mx-auto mb-4" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Be the reason someone gets a second chance at life.
            </h2>
            <p className="text-muted-foreground mb-6">
              Join Hemolink — whether you donate blood or organize a camp, every contribution saves lives.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/donor-register">
                <Button variant="hope" size="lg" className="gap-2">
                  <Heart className="w-4 h-4" /> Become a Donor
                </Button>
              </Link>
              <Link to="/#request-blood">
                <Button variant="outline" size="lg" className="gap-2">
                  Request Blood <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NSSShowcase;
