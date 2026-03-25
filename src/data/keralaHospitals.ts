export interface HospitalBranch {
  id: string;
  name: string;
  branch: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
}

export const keralaHospitals: HospitalBranch[] = [
  // Aster Medcity / Aster MIMS
  { id: "aster-kochi", name: "Aster Medcity", branch: "Kochi (Cheranalloor)", address: "Cheranalloor, Kochi, Kerala 682027", city: "Kochi", latitude: 10.0159, longitude: 76.3419 },
  { id: "aster-mims-calicut", name: "Aster MIMS", branch: "Calicut (Mini Bypass)", address: "Mini Bypass Road, Govindapuram, Kozhikode 673016", city: "Kozhikode", latitude: 11.2719, longitude: 75.7804 },
  { id: "aster-mims-kannur", name: "Aster MIMS", branch: "Kannur", address: "Chala, Kannur, Kerala 670621", city: "Kannur", latitude: 11.8568, longitude: 75.3705 },
  { id: "aster-mims-kottakkal", name: "Aster MIMS", branch: "Kottakkal", address: "Kottakkal, Malappuram, Kerala 676503", city: "Kottakkal", latitude: 10.9988, longitude: 76.0096 },

  // KIMS (Kerala Institute of Medical Sciences)
  { id: "kims-trivandrum", name: "KIMS", branch: "Thiruvananthapuram", address: "PB No.1, Anayara PO, Thiruvananthapuram 695029", city: "Thiruvananthapuram", latitude: 8.4862, longitude: 76.9472 },
  { id: "kims-al-shifa-perinthalmanna", name: "KIMS Al Shifa", branch: "Perinthalmanna", address: "Oshiwara, Perinthalmanna, Malappuram 679322", city: "Perinthalmanna", latitude: 10.9734, longitude: 76.2285 },
  { id: "kims-health-kollam", name: "KIMS Health", branch: "Kollam", address: "Kollam, Kerala 691001", city: "Kollam", latitude: 8.8932, longitude: 76.6141 },

  // Amrita Hospital
  { id: "amrita-kochi", name: "Amrita Hospital", branch: "Kochi (AIMS Ponekkara)", address: "AIMS Ponekkara, Kochi, Kerala 682041", city: "Kochi", latitude: 10.0328, longitude: 76.2922 },
  { id: "amrita-thrissur", name: "Amrita Hospital", branch: "Thrissur", address: "Athani, Thrissur, Kerala", city: "Thrissur", latitude: 10.5276, longitude: 76.2144 },

  // Rajagiri Hospital
  { id: "rajagiri-aluva", name: "Rajagiri Hospital", branch: "Aluva (Chunangamvely)", address: "Chunangamvely, Aluva, Ernakulam 683112", city: "Aluva", latitude: 10.0839, longitude: 76.3534 },

  // Lakeshore Hospital
  { id: "lakeshore-kochi", name: "Lakeshore Hospital", branch: "Kochi (Maradu)", address: "NH 47 Bypass, Maradu, Kochi 682304", city: "Kochi", latitude: 9.9430, longitude: 76.3225 },

  // Lisie Hospital
  { id: "lisie-kochi", name: "Lisie Hospital", branch: "Kochi (Ernakulam)", address: "Lisie Junction, Ernakulam, Kochi 682018", city: "Kochi", latitude: 9.9945, longitude: 76.2900 },

  // Medical Trust Hospital
  { id: "medical-trust-kochi", name: "Medical Trust Hospital", branch: "Kochi (MG Road)", address: "MG Road, Kochi, Kerala 682016", city: "Kochi", latitude: 9.9752, longitude: 76.2828 },

  // Baby Memorial Hospital
  { id: "baby-memorial-calicut", name: "Baby Memorial Hospital", branch: "Calicut (Indira Gandhi Road)", address: "Indira Gandhi Road, Kozhikode 673004", city: "Kozhikode", latitude: 11.2520, longitude: 75.7739 },

  // Malabar Institute of Medical Sciences
  { id: "mims-calicut", name: "MIMS Hospital", branch: "Calicut (Govindapuram)", address: "Mini Bypass Road, Govindapuram, Kozhikode 673016", city: "Kozhikode", latitude: 11.2719, longitude: 75.7804 },

  // Meitra Hospital
  { id: "meitra-calicut", name: "Meitra Hospital", branch: "Calicut", address: "Kuttikattur, Kozhikode, Kerala 673017", city: "Kozhikode", latitude: 11.2855, longitude: 75.8254 },

  // EMS Memorial Hospital
  { id: "ems-perinthalmanna", name: "EMS Memorial Hospital", branch: "Perinthalmanna", address: "Perinthalmanna, Malappuram, Kerala 679322", city: "Perinthalmanna", latitude: 10.9727, longitude: 76.2270 },

  // PVS Memorial Hospital
  { id: "pvs-kochi", name: "PVS Memorial Hospital", branch: "Kochi (Kaloor)", address: "Kaloor, Ernakulam, Kochi 682017", city: "Kochi", latitude: 9.9942, longitude: 76.3050 },

  // Government Medical Colleges
  { id: "gmc-trivandrum", name: "Govt. Medical College", branch: "Thiruvananthapuram", address: "Medical College PO, Thiruvananthapuram 695011", city: "Thiruvananthapuram", latitude: 8.5211, longitude: 76.9103 },
  { id: "gmc-kozhikode", name: "Govt. Medical College", branch: "Kozhikode", address: "Medical College, Kozhikode 673008", city: "Kozhikode", latitude: 11.2569, longitude: 75.7832 },
  { id: "gmc-thrissur", name: "Govt. Medical College", branch: "Thrissur", address: "Mulamkunnathukavu, Thrissur 680596", city: "Thrissur", latitude: 10.5450, longitude: 76.2327 },
  { id: "gmc-kottayam", name: "Govt. Medical College", branch: "Kottayam", address: "Arpookara, Kottayam 686008", city: "Kottayam", latitude: 9.5724, longitude: 76.5319 },
  { id: "gmc-ernakulam", name: "Govt. Medical College", branch: "Ernakulam (Kalamassery)", address: "HMT Colony, Kalamassery, Ernakulam 683503", city: "Ernakulam", latitude: 10.0551, longitude: 76.3187 },
  { id: "gmc-alappuzha", name: "Govt. Medical College", branch: "Alappuzha (Vandanam)", address: "Vandanam, Alappuzha 688005", city: "Alappuzha", latitude: 9.4726, longitude: 76.3403 },
  { id: "gmc-idukki", name: "Govt. Medical College", branch: "Idukki", address: "Idukki, Kerala", city: "Idukki", latitude: 9.8504, longitude: 76.9754 },
  { id: "gmc-palakkad", name: "Govt. Medical College", branch: "Palakkad", address: "Palakkad, Kerala", city: "Palakkad", latitude: 10.7867, longitude: 76.6548 },
  { id: "gmc-manjeri", name: "Govt. Medical College", branch: "Manjeri (Malappuram)", address: "Manjeri, Malappuram, Kerala 676121", city: "Manjeri", latitude: 11.1203, longitude: 76.1176 },
  { id: "gmc-kasaragod", name: "Govt. Medical College", branch: "Kasaragod", address: "Ukkinadka, Kasaragod 671121", city: "Kasaragod", latitude: 12.4996, longitude: 74.9869 },

  // Jubilee Memorial Hospital
  { id: "jubilee-thrissur", name: "Jubilee Mission Medical College", branch: "Thrissur", address: "P.O. Thrissur, Kerala 680005", city: "Thrissur", latitude: 10.5194, longitude: 76.2097 },

  // SUT Hospital
  { id: "sut-trivandrum", name: "SUT Hospital", branch: "Thiruvananthapuram (Pattom)", address: "Pattom, Thiruvananthapuram, Kerala 695004", city: "Thiruvananthapuram", latitude: 8.5325, longitude: 76.9411 },
  { id: "sut-hospital-trivandrum-2", name: "SUT Hospital", branch: "Thiruvananthapuram (Medical College Jn)", address: "Medical College Jn, Thiruvananthapuram", city: "Thiruvananthapuram", latitude: 8.5228, longitude: 76.9130 },

  // Cosmopolitan Hospital
  { id: "cosmo-trivandrum", name: "Cosmopolitan Hospital", branch: "Thiruvananthapuram (Pattom)", address: "Pattom, Thiruvananthapuram 695004", city: "Thiruvananthapuram", latitude: 8.5307, longitude: 76.9387 },

  // SK Hospital
  { id: "sk-trivandrum", name: "SK Hospital", branch: "Thiruvananthapuram (Edapazhanji)", address: "Edapazhanji, Thiruvananthapuram 695010", city: "Thiruvananthapuram", latitude: 8.5130, longitude: 76.9390 },

  // Travancore Medical College
  { id: "tmc-kollam", name: "Travancore Medical College", branch: "Kollam (Umayanalloor)", address: "Umayanalloor, Kollam, Kerala 691571", city: "Kollam", latitude: 8.8565, longitude: 76.6260 },

  // Pushpagiri Medical College
  { id: "pushpagiri-tiruvalla", name: "Pushpagiri Medical College", branch: "Tiruvalla", address: "Tiruvalla, Pathanamthitta, Kerala 689101", city: "Tiruvalla", latitude: 9.3863, longitude: 76.5753 },

  // Believers Church Medical College
  { id: "believers-tiruvalla", name: "Believers Church Medical College", branch: "Tiruvalla", address: "St. Thomas Nagar, Tiruvalla, Kerala 689103", city: "Tiruvalla", latitude: 9.3826, longitude: 76.5786 },

  // Caritas Hospital
  { id: "caritas-kottayam", name: "Caritas Hospital", branch: "Kottayam (Thellakom)", address: "Thellakom, Kottayam, Kerala 686630", city: "Kottayam", latitude: 9.5847, longitude: 76.5203 },
];
