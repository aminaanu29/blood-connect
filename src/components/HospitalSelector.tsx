import { useState, useMemo, useRef, useEffect } from "react";
import { Building2, MapPin, Search, ChevronDown, X } from "lucide-react";
import { keralaHospitals, HospitalBranch } from "@/data/keralaHospitals";

interface HospitalSelectorProps {
  onSelect: (hospital: HospitalBranch) => void;
  selectedHospital: HospitalBranch | null;
  onClear: () => void;
}

const HospitalSelector = ({ onSelect, selectedHospital, onClear }: HospitalSelectorProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return keralaHospitals;
    const q = query.toLowerCase();
    return keralaHospitals.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.branch.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.address.toLowerCase().includes(q)
    );
  }, [query]);

  // Group by hospital name
  const grouped = useMemo(() => {
    const map = new Map<string, HospitalBranch[]>();
    filtered.forEach((h) => {
      const list = map.get(h.name) || [];
      list.push(h);
      map.set(h.name, list);
    });
    return map;
  }, [filtered]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (selectedHospital) {
    return (
      <div className="flex items-center justify-between gap-3 w-full h-12 rounded-xl border-2 border-primary bg-primary/5 px-4">
        <div className="flex items-center gap-2 min-w-0">
          <Building2 className="w-4 h-4 text-primary shrink-0" />
          <span className="text-foreground font-medium truncate text-sm">
            {selectedHospital.name} — {selectedHospital.branch}
          </span>
        </div>
        <button onClick={onClear} className="text-muted-foreground hover:text-foreground shrink-0">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <div
        className="flex items-center gap-2 w-full h-12 rounded-xl border-2 border-border bg-background px-4 cursor-text focus-within:border-primary transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Search hospital name, city, or branch..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
        />
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full max-h-72 overflow-y-auto rounded-xl border border-border bg-popover shadow-lg">
          {grouped.size === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No hospitals found for "{query}"
            </div>
          ) : (
            Array.from(grouped.entries()).map(([name, branches]) => (
              <div key={name}>
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0">
                  {name} ({branches.length} {branches.length === 1 ? "branch" : "branches"})
                </div>
                {branches.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => {
                      onSelect(branch);
                      setQuery("");
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-accent/50 transition-colors flex items-start gap-3"
                  >
                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{branch.branch}</p>
                      <p className="text-xs text-muted-foreground">{branch.address}</p>
                    </div>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default HospitalSelector;
