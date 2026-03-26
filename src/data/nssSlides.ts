import camp1 from "@/assets/nss/camp1.jpg";
import camp2 from "@/assets/nss/camp2.jpg";
import camp3 from "@/assets/nss/camp3.jpg";
import camp4 from "@/assets/nss/camp4.jpg";
import camp5 from "@/assets/nss/camp5.jpg";
import camp6 from "@/assets/nss/camp6.jpg";

export interface NSSSlide {
  id: number;
  college: string;
  district: string;
  description: string;
  unitsCollected: number;
  donorCount: number;
  caption: string;
  image: string;
}

export const nssSlides: NSSSlide[] = [
  {
    id: 1,
    college: "Government Engineering College, Thrissur",
    district: "Thrissur",
    description:
      "Over 120 students rolled up their sleeves in a single day, turning the college auditorium into a lifeline for the district's blood banks.",
    unitsCollected: 98,
    donorCount: 120,
    caption: "When young hearts beat for a cause, miracles happen.",
    image: camp1,
  },
  {
    id: 2,
    college: "St. Teresa's College, Ernakulam",
    district: "Ernakulam",
    description:
      "An all-women blood donation drive that shattered stereotypes and collected enough units to support three hospitals for a week.",
    unitsCollected: 76,
    donorCount: 95,
    caption: "Strength isn't just physical — it flows through every drop of kindness.",
    image: camp2,
  },
  {
    id: 3,
    college: "NIT Calicut",
    district: "Kozhikode",
    description:
      "NSS volunteers partnered with the District Blood Bank for a mega camp, drawing participation from neighboring colleges as well.",
    unitsCollected: 152,
    donorCount: 180,
    caption: "Innovation starts in the lab. Compassion starts in the heart.",
    image: camp3,
  },
  {
    id: 4,
    college: "Mar Ivanios College, Nalanchira",
    district: "Thiruvananthapuram",
    description:
      "First-time donors outnumbered veterans in this camp, proving that courage is contagious when the cause is right.",
    unitsCollected: 64,
    donorCount: 85,
    caption: "Every first-time donor carries the bravery of a hundred hearts.",
    image: camp4,
  },
  {
    id: 5,
    college: "Malabar Christian College",
    district: "Kozhikode",
    description:
      "A three-day mega camp that brought together students, faculty, and local residents — united by the simple act of giving.",
    unitsCollected: 210,
    donorCount: 260,
    caption: "A campus without borders, a cause without limits.",
    image: camp5,
  },
  {
    id: 6,
    college: "College of Engineering, Trivandrum (CET)",
    district: "Thiruvananthapuram",
    description:
      "CET's NSS unit organized their annual blood drive in memory of a beloved alumnus, creating a legacy of life-saving generosity.",
    unitsCollected: 130,
    donorCount: 155,
    caption: "Some legacies are written in blood — the kind that saves lives.",
    image: camp6,
  },
];
