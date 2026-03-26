import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-primary fill-primary" />
              <span className="font-display text-lg font-bold text-background">
                HEMOLINK
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bridging patients, donors, and college groups into one reliable
              network. Because when blood is needed, time is life.
            </p>
          </div>

          {[
            {
              title: "Platform",
              links: ["Request Blood", "Become a Donor", "How It Works"],
            },
            {
              title: "Resources",
              links: ["Eligibility Guide", "Blood Facts", "FAQs", "Contact Us"],
            },
            {
              title: "Legal",
              links: ["Privacy Policy", "Terms of Service", "Data Protection"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-background text-sm mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-background transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-muted-foreground/20 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 HEMOLINK. Built with compassion. Every drop counts.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
