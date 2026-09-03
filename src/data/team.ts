import type {
  HubLeader,
  HubLeaderReference,
  PersonProfile,
  TeamMember,
} from "@/lib/types";

/**
 * Canonical organization-wide team directory.
 *
 * Community hub rosters remain route-specific because a person can hold a
 * different chapter role from their organization-wide title. The public team
 * page must consume the categorized exports below rather than defining a
 * second roster.
 */
const canonicalPeople: PersonProfile[] = [
  {
    id: "executive-brian-fleischer",
    slug: "brian-fleischer",
    featuredInTeamHero: true,
    name: "Brian Amu Fleischer, MD",
    affiliation: "Yale University",
    image: "/images/team/brian-fleischer.jpeg",
    socialLinks: {
      email: "brian.fleischer@yale.edu",
      linkedin: "https://www.linkedin.com/in/brian-fleischer-md-37011010b/",
    },
    bio: "Dr. Brian Fleischer is a physician and global health leader dedicated to advancing equitable care for non-communicable diseases in underserved communities. A graduate of Yale School of Medicine and Stanford University, he founded Akomapa Health Foundation to help students and communities build sustainable approaches to hypertension, diabetes, and mental health care across Ghana and beyond—building a movement of compassionate health leaders with akomapa, a “good heart”.",
  },
  {
    id: "executive-esi-berkoh",
    slug: "esi-berkoh",
    featuredInTeamHero: true,
    name: "Esi Bon Berkoh",
    affiliation: "Medical Doctor, University of Cape Coast",
    image: "/images/team/esi-bon-berkoh.jpg",
    socialLinks: {
      email: "esibberkoh@gmail.com",
      linkedin: "https://linkedin.com/in/esiberkoh",
    },
    bio: "Esi Bon Berkoh studied medicine at the University of Cape Coast School of Medical Sciences after earning a BSc in Biology from Mount Holyoke College and an MSc in Infection, Immunity & Human Disease from the University of Leeds. As Vice President and co-founder of Akomapa Health, she coordinates clinic operations, supports organizational leadership, and helps organize community engagement programs.",
  },
  {
    id: "executive-afriyie-badu",
    featuredInTeamHero: true,
    name: "Afriyie Badu, MD",
    affiliation: "Primary Care Physician, University of Ghana",
    image: "/images/team/afriyie-badu.jpg",
    socialLinks: {
      email: "nanabadu59@gmail.com",
      linkedin: "https://linkedin.com/in/afriyie-badu",
    },
    bio: "Dr. Nana Yaw Afriyie Badu is a medical doctor and a Co-founder of Akomapa. In his role, he oversees the organization’s financial strategy and sustainability, ensuring that programs are effectively resourced to make a lasting community impact. He co-founded Akomapa out of a desire to transform the approach to non-communicable diseases by shifting the focus from treatment to prevention through early detection, education, and lifestyle interventions. Outside Akomapa, Dr. Badu is deeply passionate about orthopaedic surgery, sports medicine, and public health advocacy, and continues to champion initiatives that bridge healthcare access and community wellness.",
  },
  {
    id: "executive-prince-tuffour",
    featuredInTeamHero: true,
    name: "Prince Agyei Tuffour",
    affiliation: "Software Engineer, dynaConnections Corporation",
    image: "/images/team/prince-tuffour.jpg",
    socialLinks: {
      email: "prince.agyei.tuffour@gmail.com",
      linkedin: "https://linkedin.com/in/prince-agyei-tuffour",
    },
    bio: "Prince Agyei Tuffour leads Akomapa’s technology strategy and infrastructure. He develops and maintains digital systems that support secure operations, responsible data management, and the organization’s continued growth.",
  },
  {
    id: "executive-adwoa-danso-dodoo",
    featuredInTeamHero: true,
    name: "Adwoa Danso-Dodoo",
    affiliation: "Business Analyst, McKinsey & Company",
    image: "/images/team/adwoa-danso-dodoo.jpg",
    socialLinks: {
      email: "adansododoo@gmail.com",
      linkedin: "https://www.linkedin.com/in/adwoadanso-dodoo/",
    },
    bio: "Adwoa Danso-Dodoo is a Business Analyst at McKinsey & Company and a graduate of Yale College and the Yale School of Management, where she studied Chemical Engineering and Technology Management, respectively. She serves as the Chief Financial Officer at Akomapa Health Foundation, helping to manage the organization’s budget. In addition, she is helping develop the Akomapa Summer Immersion Program. Adwoa joined the team because she is passionate about Akomapa’s mission to bring care to more communities and to encourage students to lead with empathy and purpose.",
  },
  {
    id: "executive-hafiz-shaban",
    name: "Hafiz Shaban",
    affiliation: "Nursing Student, University of Cape Coast",
    image: "/ucc-team/hafiz_shaban.JPG",
    socialLinks: { email: "hafiz.shaban@stu.ucc.edu.gh" },
    bio: "Hafiz Shaban is a nursing student at the University of Cape Coast and Co-Director of Akomapa’s UCC chapter. Passionate about global health and community-based medicine, he helps lead local healthcare initiatives and student programs that expand access to community-centered care.",
  },
  {
    id: "executive-sedem-dankwa",
    name: "Sedem Dankwa",
    affiliation: "Doctor-in-Training, Yale University",
    image: "/images/team/placeholder.jpg",
    socialLinks: {
      email: "sedem.dankwa@yale.edu",
      linkedin: "https://www.linkedin.com/in/sedem-dankwa-b651401b7/",
    },
    bio: "Sedem Dankwa builds strategic partnerships that extend Akomapa’s impact. She connects the foundation with institutions, organizations, and collaborators who share its commitment to equitable healthcare access.",
  },
  {
    id: "executive-nana-ama-ocran",
    featuredInTeamHero: true,
    name: "Nana Ama Ocran",
    affiliation: "History of Science, Medicine & Public Health, Yale University",
    image: "/images/team/nana-ama-ocran.jpeg",
    socialLinks: {
      email: "naamaocran@gmail.com",
      linkedin: "https://www.linkedin.com/in/nana-ama-nhyira-ocran-16957626b/",
    },
    bio: "Nana Ama Ocran graduated with a BA in History of Science, Medicine & Public Health, and French from Yale University. She currently serves as the Leadership Training Program Lead for Akomapa Health Foundation, US. In her role, she designs and organizes opportunities for bidirectional learning that emphasize equity, collaboration, and community-rooted approaches to care. She joined Akomapa to support youth-driven health systems and strengthen cross-continental pathways for learning and leadership.",
  },
  {
    id: "executive-wilfred-obeng",
    featuredInTeamHero: true,
    name: "Wilfred Obeng",
    affiliation: "Medical Student, University of Cape Coast",
    image: "/ucc-team/wilfred_obeng.JPG",
    socialLinks: { email: "wilfred.obeng7@gmail.com" },
    bio: "Wilfred Obeng is currently studying Medicine at the University of Cape Coast, Ghana. He serves as a Training and Standards lead with Akomapa UCC and as Clinical Standards Coordinator with Akomapa Global. He joined the project to learn about and contribute towards addressing the health problems of rural Ghanaian communities and helps with the development of training resources for volunteers and with the monitoring, evaluation, and improvement of the clinic's standards.",
  },
  {
    id: "executive-gabrielle-nartey",
    featuredInTeamHero: true,
    name: "Gabrielle Nartey",
    affiliation: "Akomapa Health Foundation",
    image: "/images/team/gabrielle-nartey.JPG",
    socialLinks: {
      email: "info@akomapa.org",
      linkedin: "https://www.linkedin.com/in/gabrielle-nartey-a2456128b/",
    },
    bio: "Gabrielle Nartey is a sophomore at Yale University studying Neuroscience on the pre-medical track. She currently serves as Lead Social Media Manager for Akomapa, where she oversees marketing across all social media platforms and works to expand the clinic’s reach and visibility on an international scale. Gabrielle joined the clinic to help bridge the gap between healthcare and access—ensuring that individuals who need care most are aware of and empowered to seek Akomapa’s services.",
  },
  {
    id: "executive-patrick-ampofo",
    featuredInTeamHero: true,
    slug: "patrick-ampofo",
    name: "Dr. Patrick Ampofo",
    affiliation: "Yale School of Public Health",
    image: "/images/team/patrick-ampofo.jpg",
    socialLinks: { linkedin: "https://linkedin.com/in/patrick-ampofo" },
    bio: "Dr. Patrick Ampofo, an alumnus of UGMS and a first-year MPH student at Yale School of Public Health, currently serves as the UG expansion lead. He has a passion for bridging the gap in healthcare access disparities through evidence-based approaches and community-based interventions. In his current role, Dr. Ampofo is focused on helping establish the UG chapter of Akomapa by actively engaging key personnel and mobilizing medical students.",
  },
  {
    id: "executive-kelvin-ocran",
    featuredInTeamHero: true,
    name: "Kelvin Fiifi Ocran",
    affiliation: "Akomapa Health Foundation",
    image: "/images/team/kelvin-fiifi.jpeg",
    socialLinks: {
      email: "kelvinocran17@gmail.com",
      linkedin: "https://linkedin.com/in/kelvin-ocran",
    },
    bio: "Kelvin is a naturally creative mind who enjoys building ideas, designing brands, and exploring anything that blends art, tech, and problem solving. Calm but unpredictable in the best way, he connects with people easily, yet values trust deeply. Tall, caramel-toned, and openly expressive, he’s someone who loves good music, good food, and any space that lets him create freely. He is always learning, always experimenting, and always ready for the next project or opportunity that challenges him to grow.",
  },
  {
    id: "executive-samuel-kumi",
    featuredInTeamHero: true,
    name: "Samuel Kumi",
    affiliation: "Private Legal Practitioner and Lecturer",
    image: "/images/team/samuel-kumi.JPG",
    socialLinks: {
      email: "samuelkumik@gmail.com",
      linkedin: "https://www.linkedin.com/in/samuel-k-kumi-41627a161/",
    },
    bio: "Samuel Kwame Kumi, Esq. is a private legal practitioner and lecturer. Samuel has valuable experience in litigation and Alternative Dispute Resolution, notably acting as lawyer for medical professionals in medical matters. His interests span medical, IT, Intellectual Property and energy law, areas in which he has published. As Akomapa's Head of Legal, Samuel oversees corporate affairs, advises on risk, and ensures compliance. He sees Akomapa's strategic community-focused initiatives establishing it as a trailblazer in community health. ",
  },
  {
    id: "executive-jeanelle-forson",
    featuredInTeamHero: true,
    name: "Jeanelle Forson",
    affiliation: "Akomapa Health Foundation",
    image: "/images/team/jeanelle-forson.jpg",
    socialLinks: {
      email: "jeanelledonkoh@gmail.com",
      linkedin: "https://www.linkedin.com/in/jeanelle-forson-rn-bn-b5680a162",
    },
    bio: "Jeanelle Forson leads planning and participant experience for Akomapa’s immersion program, coordinating the program’s learning activities and operational details.",
  },
  {
    id: "executive-bernard-mensah",
    featuredInTeamHero: true,
    name: "Bernard Mensah",
    affiliation: "Akomapa Health Foundation",
    image: "/images/team/bernard-mensah.jpg",
    bio: "Bernard Mensah leads Akomapa’s research work, coordinating evidence generation and evaluation that help the foundation understand and strengthen its community health programs.",
  },
  {
    id: "executive-divina-afenyo",
    name: "Divina Selase Afenyo",
    affiliation: "University of Ghana",
    image: "/images/team/divina-selase-afenyo.jpg",
    bio: "Divina Selase Afenyo is a student nurse, health advocate, and emerging leader passionate about patient-centred care, health promotion, and disease prevention. She is also passionate about health communication, media, student advocacy, women’s leadership, and mentorship. Through Akomapa, she is committed to empowering communities with knowledge, promoting preventive health, and advancing accessible, people-centred healthcare.",
    socialLinks: {
      email: "divinaafenyo1@gmail.com",
      linkedin: "https://www.linkedin.com/in/divina-afenyo-DSA233507358951",
    },
  },
  {
    id: "executive-jade-kissi",
    featuredInTeamHero: true,
    name: "Jade Kissi",
    affiliation: "Akomapa Health Foundation",
    image: "/images/team/jade-kissi.jpg",
    bio: "Jade Kissi, MPH, RN, is a Registered Nurse, Lean and Pediatric Nurse Practitioner in training at Yale School of Nursing. Dedicated to serving under-resourced populations; her background combines bedside clinical care with health policy research, advocacy for under resourced communities, and quality improvement. She leverages expertise in clinical operations and healthcare management to advance health equity and build sustainable, high-quality care systems for underserved groups.",
    socialLinks: {
      email: "kakrakissi@gmail.com",
      linkedin: "https://www.linkedin.com/in/jadekissi/",
    },
  },
  {
    id: "member-erinda-aidoo",
    featuredInTeamHero: true,
    name: "Erinda Aidoo",
    affiliation: "University of Illinois Chicago College of Medicine",
    image: "/ug-team/erinda-aidoo.PNG",
    socialLinks: {
      email: "erindaaid0038@gmail.com",
      linkedin: "https://www.linkedin.com/in/erinda-aidoo-8149871b6",
    },
    bio: "Erinda Aidoo is a medical student at the University of Illinois Chicago College of Medicine pursuing a concentration in Global Health. She is passionate about translational research, precision medicine, and advancing equitable healthcare through scientific innovation. Through the Akomapa Foundation, she hopes to deepen her understanding of global health systems, contribute to impactful research, and explore strategies that improve healthcare delivery in underserved communities.",
  },
  {
    id: "member-sylvester-bempong",
    featuredInTeamHero: true,
    name: "Sylvester Bempong",
    affiliation: "University of Cape Coast",
    image: "/images/team/sylvester-bempong.jpeg",
    socialLinks: {
      email: "sylvesterobese6665@gmail.com",
      linkedin: "https://www.linkedin.com/in/sylvester-bempong/",
    },
    bio: "Sylvester Bempong is a Software Engineer at Akomapa Health Foundation and a Research Fellow at Normatech Ghana Limited. He is passionate about artificial intelligence, software engineering, and applying technology to improve healthcare and agriculture. He is currently pursuing a Bachelor’s degree in Agricultural Engineering at the University of Cape Coast.",
  },
  {
    id: "member-mighty-doffoe",
    featuredInTeamHero: true,
    name: "Mighty Doffoe",
    affiliation: "Akomapa Health Foundation",
    image: "/images/team/mighty-doffoe.jpg",
    socialLinks: {
      email: "doffoemighty@gmail.com",
      linkedin: "https://linkedin.com/in/mighty-doffoe",
    },
    bio: "Mighty Doffoe graduated with a BSc in Computer Science at Bridgewater College. He currrently serves as a Software Engineer for Akomapa. In his role, he makes contributions to software related issues at Akomapa, and helps with the development of the Akomapa website. He joined the team to help make quailty healthcare more accessible to communities.",
  },
  {
    id: "member-david-ofosu",
    name: "David Ofosu",
    affiliation: "Medical Student, University of Cape Coast",
    image: "/ucc-team/david_kojo_ofosu.JPG",
    bio: "David Kojo Ofosu graduated with a medical degree at the University of Cape Coast School (UCC) of Medical Sciences. He currently serves as the Co-Director of the UCC Chapter Akomapa. In his role, he oversees all aspects of the clinic’s operations, ensuring alignment with its mission and goals, he together with his team develop strategic plans to guide the clinic’s growth and impact. He coordinate and chair leadership team meetings, ensuring all roles collaborate effectively. He acts as the primary point of contact for external partners, and funding organizations.he address operational challenges and ensure compliance with relevant guidelines and regulations He also represent the clinic in public forums, presentations, and community events.",
  },
  {
    id: "member-getwell-essuman",
    name: "Getwell Essuman",
    affiliation: "Medical Laboratory Science Student, University of Cape Coast",
    image: "/ucc-team/getwell_ebiram_essuman.JPG",
    bio: "Getwell Essuman co-leads volunteer recruitment for Akomapa’s UCC Community Hub, helping students find clear ways to contribute to community health programs.",
  },
  {
    id: "member-david-konadu-kombate",
    name: "David Konadu Kombate",
    affiliation: "Medical Laboratory Science Student, University of Cape Coast",
    image: "/ucc-team/david_konadu_kombate.JPG",
    bio: "David Konadu Kombate co-leads volunteer recruitment for Akomapa’s UCC Community Hub, supporting outreach and coordination for students who serve through the hub.",
  },
  {
    id: "member-belinda-odoom",
    name: "Belinda Odoom",
    affiliation: "Nursing Student, University of Cape Coast",
    image: "/ucc-team/belinda_odoom.JPG",
    bio: "Belinda Odoom coordinates training and standards for Akomapa’s UCC Community Hub, helping volunteers prepare for consistent, responsible community health service.",
  },
  {
    id: "member-geraldine-agyapong",
    name: "Geraldine-Cristal Apeadua Agyapong",
    affiliation: "Medical Student, University of Cape Coast",
    image: "/ucc-team/geraldine_cristal_apeadua_agyepong.JPG",
    bio: "Geraldine-Cristal Apeadua Agyapong supports financial administration for Akomapa’s UCC Community Hub, helping the team manage resources with care and accountability.",
  },
  {
    id: "member-frederick-baffour",
    name: "Frederick Baffour",
    affiliation: "Optometry Student, University of Cape Coast",
    image: "/ucc-team/frederick_baffour.JPG",
    bio: "Frederick Baffour supports financial administration for Akomapa’s UCC Community Hub, helping maintain clear records and responsible stewardship of program resources.",
  },
  {
    id: "member-gloria-tawiah-blay",
    name: "Gloria Tawiah Blay",
    affiliation: "Pharmacy Student, University of Cape Coast",
    image: "/ucc-team/gloria_tawia_blay.JPG",
    bio: "Gloria Tawiah Blay serves as a community engagement liaison for Akomapa’s UCC Community Hub, helping the student team listen to and coordinate with community partners.",
  },
  {
    id: "member-prince-nyarko",
    name: "Prince Nyarko",
    affiliation: "Optometry Student, University of Cape Coast",
    image: "/ucc-team/prince_nyarkoh.JPG",
    bio: "Prince Nyarko serves as a community engagement liaison for Akomapa’s UCC Community Hub, strengthening communication between the student team and the communities it serves.",
  },
  {
    id: "member-queenstar-opoku",
    name: "Queenstar Aduse Opoku",
    affiliation: "Pharmacy Student, University of Cape Coast",
    image: "/ucc-team/queenster_aduse_opoku.JPG",
    bio: "Queenstar Aduse Opoku manages supplies and logistics for Akomapa’s UCC Community Hub, coordinating the materials and practical details needed for hub activities.",
  },
  {
    id: "member-martha-bawa",
    name: "Martha Bawa",
    affiliation: "Nursing Student, University of Cape Coast",
    image: "/ucc-team/martha_bawa.JPG",
    bio: "Martha Bawa manages supplies and logistics for Akomapa’s UCC Community Hub, helping ensure that teams have the resources needed to carry out community health activities.",
  },

  {
    id: "28",
    featuredInTeamHero: true,
    slug: "derek-tuoyire",
    name: "Prof. Derek Anamaale Tuoyire",
    affiliation: "University of Cape Coast",
    image: "/images/team/dr-tuoyire.jpeg",
    bio: "Prof. Derek Anamaale Tuoyire guides Akomapa’s community health work through his expertise in community medicine, population health, and community-based research at the University of Cape Coast.",
  },
  {
    id: "29",
    featuredInTeamHero: true,
    slug: "martins-ekor",
    name: "Prof. Martins Ekor",
    affiliation: "University of Cape Coast",
    image: "/images/team/prof-martin-ekor.jpg",
    bio: "Prof. Martins Ekor provides strategic guidance to Akomapa from his leadership role in the College of Health and Allied Sciences at the University of Cape Coast.",
  },
  {
    id: "30",
    featuredInTeamHero: true,
    name: "Emily Sheldon",
    affiliation: "African Health Innovation Center",
    image: "/images/team/emily-sheldon.png",
    bio: "Emily Sheldon advises Akomapa on public health innovation and organizational leadership, drawing on her work as Co-Founder of the African Health Innovation Center.",
  },
  {
    id: "31",
    featuredInTeamHero: true,
    slug: "jeremy-schwartz",
    name: "Dr. Jeremy Schwartz",
    affiliation: "Yale University",
    image: "/images/team/jeremy-schwartz.jpeg",
    bio: "Dr. Jeremy Schwartz advises Akomapa on chronic care access, health systems, and implementation science through his work at Yale University.",
  },
  {
    id: "32",
    name: "Dr. Adrian Mayo",
    affiliation: "David Geffen School of Medicine at UCLA",
    image: "/images/team/placeholder.jpg",
    bio: "Dr. Adrian Mayo supports Akomapa with expertise in clinical education, ethical leadership, and interprofessional collaboration at the David Geffen School of Medicine at UCLA.",
  },
  {
    id: "33",
    featuredInTeamHero: true,
    name: "Dr. Elijah Paintsil",
    affiliation: "Boston Medical Center",
    image: "/images/team/elijah-paintsil.avif",
    bio: "Dr. Elijah Paintsil provides pediatric and healthcare leadership expertise to Akomapa through his work as Chief and Chair of Pediatrics at Boston Medical Center.",
  },
  {
    id: "34",
    slug: "alfred-yawson",
    name: "Prof. Alfred Yawson",
    affiliation: "University of Ghana",
    image: "/images/team/prof-alfred-yawson.png",
    bio: "Prof. Alfred Yawson advises Akomapa on public health, health professions education, and health systems leadership through his work at the University of Ghana.",
  },
  {
    id: "35",
    name: "Freda Yawson",
    affiliation: "Innovate Ghana and Innovate Labs",
    image: "/images/team/freda-yawson.jpg",
    bio: "Freda Yawson advises Akomapa on innovation, entrepreneurship, and organizational growth through her leadership of Innovate Ghana and Innovate Labs.",
  },

  {
    id: "37",
    slug: "stacy-uchendu",
    name: "Stacy Uchendu",
    affiliation: "Neighborhood Health Project, Yale University",
    image: "/images/team/placeholder.jpg",
    bio: "Stacy Uchendu co-directs the Neighborhood Health Project, facilitating community partnerships and sustainable care delivery at the Akomapa–NHP Yale hub.",
  },
  {
    id: "kelvin-akoto-boateng",
    name: "Kelvin Akoto Boateng",
    affiliation: "Pharmacy Student",
    image: "/ug-team/kelvin-akoto-boateng.jpg",
    bio: "A results-driven Pharmacy candidate combining rigorous pharmaceutical training with extensive leadership experience across musical settings, student associations, community organizing, and youth empowerment.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/kelvin-boateng-5b75492b5",
    },
  },
  {
    id: "nana-ekow-moses",
    name: "Nana-Ekow Moses",
    affiliation: "General Nursing Student",
    image: "/ug-team/nana-ekow-moses.jpg",
    bio: "Nana-Ekow Moses is a general nursing student at the University of Ghana with a strong interest in healthcare leadership, community health, and patient-centered care. He serves as the Follow-Up Lead at the Akomapa UG Clinic, supporting patient continuity of care and follow-up after clinical encounters. He is also passionate about student leadership, health advocacy, and initiatives that improve access to quality healthcare within communities.",
    socialLinks: {
      email: "ekowmoses29@gmail.com",
      linkedin: "https://www.linkedin.com/in/nana-ekow-moses-405a9b291",
    },
  },
  {
    id: "rachael-akusika-adu",
    name: "Rachael Akusika Adu",
    affiliation: "Final Year BSc Physiotherapy Student",
    image: "/ug-team/rachael-akusika-adu.jpg",
    bio: "Rachael Akusika Adu is a final-year BSc Physiotherapy student at the University of Ghana and serves as a Follow-up Lead at the Akomapa UG Clinic, supporting continuity of care after clinical encounters.",
    socialLinks: {
      email: "rachaeladu19@gmail.com",
      linkedin: "https://www.linkedin.com/in/rachael-adu",
    },
  },
  {
    id: "jil-owusu-ansah",
    name: "Jil Owusu-Ansah",
    affiliation: "University of Ghana",
    image: "/placeholder.png",
    bio: "Jil Owusu-Ansah is a student at the University of Ghana and serves as a Follow-up Lead at the Akomapa UG Clinic, supporting continuity of care after clinical encounters.",
    socialLinks: {
      email: "jiloan.16@gmail.com",
    },
  },
  {
    id: "esther-bray",
    name: "Esther Bray",
    affiliation: "University of Ghana",
    image: "/placeholder.png",
    bio: "Driven by excellence, purpose, and meaningful impact, Esther is passionate about human life most especially pediatrics, personal growth, and becoming someone whose work makes a difference, while staying grounded in faith and the values that shape me.",
    socialLinks: {
      email: "estherbray896@gmail.com",
    },
  },
  {
    id: "maxwell-abiam-danso",
    name: "Maxwell Abiam Danso",
    affiliation: "University of Ghana",
    image: "/placeholder.png",
    bio: "Maxwell Abiam Danso is a student at the University of Ghana and serves as a Volunteer Recruitment Lead at the Akomapa UG Clinic, supporting continuity of care after clinical encounters.",
    socialLinks: {
      email: "dansoabiammaxwell@gmail.com",
      linkedin: "https://www.linkedin.com/in/maxwellabiam",
    },
  },
  {
    id: "joseph-at-bron",
    name: "Joseph A.T. Broni",
    affiliation: "University of Ghana",
    image: "/placeholder.png",
    bio: "Joseph Amoatey Tettey Broni, a University of Ghana Pharmacy candidate, combines clinical internships (patient care, drug safety) with leadership in student pharma and non-pharma associations. Skilled in brand strategy, media, and public speaking, he is fluent in multiple languages. His advocacy focuses on global health policy, pharmaceutical access, and international diplomacy, aiming to bridge public health and governance.",
    socialLinks: {
      email: "bronijoey@gmail.com",
      linkedin: "https://www.linkedin.com/in/josephbroni",
    },
  },
  {
    id: "akua-bowaa-essah",
    name: "Akua Bowaa Essah",
    affiliation: "University of Ghana",
    image: "/placeholder.png",
    bio: "Akua Bowaa Essah is a very big advocate for mental health, especially amongst the youth. My life's mission is to eradicate the stigma surrounding those with mental illnesses and reconstruct the perceptions people have about mental illness. I also love anything healthcare related, no matter how grimey it gets.",
    socialLinks: {
      email: "bowsie4u@gmail.com",
      linkedin: "https://www.linkedin.com/in/akua-bowaa-essah-989239332",
    },
  },
  {
    id: "edugie-osunde",
    name: "Edugie Osunde",
    affiliation: "University of Ghana",
    image: "/placeholder.png",
    bio: "Edugie, currently a medical student at the University of Ghana with a BSc in Biomedical Engineering, is strongly passionate about patient-centered care and serving the underserved. She serves as the financial officer of the Akomapa UG clinic.",
    socialLinks: {
      email: "edugie99@gmail.com",
      linkedin: "https://www.linkedin.com/in/edugie",
    },
  },
  {
    id: "denzel-nketia-achiampong",
    name: "Denzel Nketia-Achiampong",
    affiliation: "University of Ghana",
    image: "/placeholder.png",
    bio: "Denzel Nketia-Achiampong is a medical student at the University of Ghana and serves as Research Co-Lead at the Akomapa UG Clinic. He focuses on survey validation, research data infrastructure and quality control across student-led community health initiatives.",
    socialLinks: {
      email: "dnketia-achiampong@st.ug.edu.gh",
      linkedin: "https://www.linkedin.com/in/denzel-nketia-achiampong-b42a9424a",
    },
  },
  {
    id: "austin-afutu",
    name: "Austin Afutu",
    affiliation: "University of Ghana",
    image: "/placeholder.png",
    bio: "Austin Afutu is a Doctor of Pharmacy candidate at the University of Ghana and Training & Standards Coordinator at the Akomapa Student-Run Free Clinic, where he helps develop volunteer training, clinical protocols, and counselling standards. He also serves as Vice President of the University of Ghana Pharmacy Students' Association. Austin is passionate about AI-driven digital health solutions for African healthcare, and is committed to strengthening community-based NCD screening and care.",
    socialLinks: {
      email: "afutuaustin@gmail.com",
      linkedin: "https://www.linkedin.com/in/austin-afutu-0b6298300",
    },
  },
  {
    id: "nneoma-orji-okoro",
    name: "Nneoma Orji-Okoro",
    affiliation: "University of Ghana",
    image: "/placeholder.png",
    bio: "Nneoma is a medical student at the University of Ghana Medical School with a strong interest in community health and service. She is passionate about health education, preventive care, and improving access to healthcare. Through Akomapa UG Clinic, she hopes to contribute to meaningful community outreach, promote healthier communities, and develop her skills in leadership, teamwork, advocacy, and patient-centred care.",
    socialLinks: {
      email: "nneorjiokoro@gmail.com",
    },
  },
  {
    id: "georgina-garbrah",
    name: "Georgina Garbrah",
    affiliation: "University of Ghana",
    image: "/placeholder.png",
    bio: "Georgina is an undergraduate student at the University of Ghana with a strong academic focus on Dietetics. She is committed to advancing community health through evidence based nutritional guidance and effective liaison between the clinic and the communities it serves .",
    socialLinks: {
      email: "gabrahg@gmail.com",
    },
  },
  {
    id: "bernard-kartey-larbi",
    name: "Bernard Kartey Larbi",
    affiliation: "Kwame Nkrumah University of Science and Technology",
    image: "/placeholder.png",
    bio: "Bernard Kartey Larbi believes that great decisions begin with great questions. As a final-year Management student at KNUST and a Research Lead & Finance Assistant, Bernard is passionate about uncovering insights, understanding complex challenges, and translating knowledge into practical action that supports organizational growth and innovation.",
    socialLinks: {
      email: "bklarbi@st.knust.edu.gh",
    },
  },
  {
    id: "darren-markwei",
    name: "Darren Markwei",
    affiliation: "Yale University",
    image: "/placeholder.png",
    bio: "Darren Markwei is a private equity investor and a graduate of Yale University , where he earned a double bachelor's in Economics and History. He leads Corporate Partnership and Collaboration efforts at Akomapa Health, building the relationships and alliances that advance the organization's mission. ",
    socialLinks: {
      email: "darren.dynawd@gmail.com",
    },
  },
];

export interface PersonPlacement {
  personId: string;
  title: string;
}

export interface DepartmentDefinition {
  id: string;
  name: string;
}

export interface DepartmentMembership extends PersonPlacement {
  departmentId: string;
}

export interface TeamDepartment extends DepartmentDefinition {
  members: TeamMember[];
}

export interface TeamDirectoryConfig {
  people: readonly PersonProfile[];
  departments: readonly DepartmentDefinition[];
  executiveLeadership: readonly PersonPlacement[];
  departmentMemberships: readonly DepartmentMembership[];
  advisoryBoard: readonly PersonPlacement[];
}

export interface ResolvedTeamDirectory {
  people: readonly PersonProfile[];
  executiveLeadership: readonly TeamMember[];
  departments: readonly TeamDepartment[];
  advisoryBoard: readonly TeamMember[];
  heroPeople: readonly PersonProfile[];
}

export const departmentCatalog = [
  { id: "education", name: "Education" },
  { id: "research", name: "Research" },
  { id: "technology", name: "Technology" },
  {
    id: "onboarding-training-standards",
    name: "Onboarding, Training and Standards",
  },
  { id: "partnerships", name: "Partnerships" },
  { id: "finance", name: "Finance" },
  { id: "legal", name: "Legal" },
  { id: "internal-affairs", name: "Internal Affairs" },
] as const satisfies readonly DepartmentDefinition[];

export const executiveLeadershipConfig = [
  { personId: "executive-brian-fleischer", title: "Founder & President" },
  {
    personId: "executive-esi-berkoh",
    title: "Vice President & Co-Founder",
  },
  {
    personId: "executive-afriyie-badu",
    title: "Chief Operations Officer & Co-Founder",
  },
] as const satisfies readonly PersonPlacement[];

export const departmentMemberships = [
  {
    departmentId: "education",
    personId: "executive-nana-ama-ocran",
    title: "Education Programming Lead",
  },
  {
    departmentId: "education",
    personId: "executive-jeanelle-forson",
    title: "Immersion Program Lead",
  },
  {
    departmentId: "research",
    personId: "executive-bernard-mensah",
    title: "Research Lead",
  },
  {
    departmentId: "research",
    personId: "member-erinda-aidoo",
    title: "Research Team Member",
  },
  {
    departmentId: "technology",
    personId: "executive-prince-tuffour",
    title: "Chief Technology Officer",
  },
  {
    departmentId: "technology",
    personId: "member-sylvester-bempong",
    title: "Software Engineer",
  },
  {
    departmentId: "technology",
    personId: "member-mighty-doffoe",
    title: "Software Engineer",
  },
  {
    departmentId: "onboarding-training-standards",
    personId: "executive-wilfred-obeng",
    title: "Clinical Standards Lead",
  },
  {
    departmentId: "partnerships",
    personId: "executive-sedem-dankwa",
    title: "Global Partnerships Lead",
  },
  {
    departmentId: "partnerships",
    personId: "executive-patrick-ampofo",
    title: "UG Expansion Lead",
  },
  {
    departmentId: "partnerships",
    personId: "executive-gabrielle-nartey",
    title: "Lead Social Media Manager",
  },
  {
    departmentId: "partnerships",
    personId: "executive-kelvin-ocran",
    title: "Branding and Public Relations Lead",
  },
  {
    departmentId: "partnerships",
    personId: "darren-markwei",
    title: "Corporate Partnership Lead",
  },
  {
    departmentId: "finance",
    personId: "executive-adwoa-danso-dodoo",
    title: "Chief Finance Officer",
  },
  {
    departmentId: "finance",
    personId: "bernard-kartey-larbi",
    title: "Research & Financial Officer",
  },
  {
    departmentId: "legal",
    personId: "executive-samuel-kumi",
    title: "Legal Affairs Lead",
  },
  {
    departmentId: "internal-affairs",
    personId: "executive-jade-kissi",
    title: "Head of Internal Affairs",
  },
] as const satisfies readonly DepartmentMembership[];

export const advisoryBoardConfig = [
  { personId: "28", title: "Head of Community Medicine" },
  { personId: "29", title: "Provost, College of Health and Allied Sciences" },
  { personId: "30", title: "Co-Founder" },
  { personId: "31", title: "Associate Professor of Medicine" },
  { personId: "32", title: "Assistant Clinical Professor" },
  { personId: "33", title: "Chief & Chair of Pediatrics" },
  { personId: "34", title: "Provost, College of Health Sciences" },
  { personId: "35", title: "Founder" },
] as const satisfies readonly PersonPlacement[];

function createPeopleMap(profiles: readonly PersonProfile[]) {
  const profileMap = new Map<string, PersonProfile>();
  const slugs = new Set<string>();

  for (const profile of profiles) {
    if (!profile.id.trim()) {
      throw new Error("Canonical person IDs must not be empty.");
    }
    if (profileMap.has(profile.id)) {
      throw new Error(`Duplicate canonical person ID: ${profile.id}`);
    }
    if (profile.slug) {
      if (slugs.has(profile.slug)) {
        throw new Error(`Duplicate canonical person slug: ${profile.slug}`);
      }
      slugs.add(profile.slug);
    }
    profileMap.set(profile.id, profile);
  }

  return profileMap;
}

function resolveTeamMember(
  placement: PersonPlacement,
  roleCategory: TeamMember["roleCategory"],
  profileMap: ReadonlyMap<string, PersonProfile>,
): TeamMember {
  const profile = profileMap.get(placement.personId);
  if (!profile) {
    throw new Error(`Unknown canonical person reference: ${placement.personId}`);
  }
  if (!profile.image) {
    throw new Error(`Team directory person ${placement.personId} has no portrait.`);
  }

  return { ...profile, image: profile.image, title: placement.title, roleCategory };
}

export function buildTeamDirectory(
  config: TeamDirectoryConfig,
): ResolvedTeamDirectory {
  const profileMap = createPeopleMap(config.people);
  const departmentsById = new Map<string, DepartmentDefinition>();
  for (const department of config.departments) {
    if (departmentsById.has(department.id)) {
      throw new Error(`Duplicate department ID: ${department.id}`);
    }
    departmentsById.set(department.id, department);
  }

  const pagePlacements = new Set<string>();
  const claimPagePlacement = (personId: string, section: string) => {
    if (pagePlacements.has(personId)) {
      throw new Error(`Duplicate Our Team placement for ${personId} in ${section}.`);
    }
    pagePlacements.add(personId);
  };

  const executiveLeadership = config.executiveLeadership.map((placement) => {
    claimPagePlacement(placement.personId, "Executive Leadership");
    return resolveTeamMember(placement, "executive", profileMap);
  });

  const membershipsByDepartment = new Map<string, DepartmentMembership[]>();
  const primaryDepartments = new Map<string, string>();
  for (const membership of config.departmentMemberships) {
    if (!departmentsById.has(membership.departmentId)) {
      throw new Error(`Unknown department reference: ${membership.departmentId}`);
    }
    const existingDepartment = primaryDepartments.get(membership.personId);
    if (existingDepartment) {
      throw new Error(
        `Person ${membership.personId} has multiple primary departments: ${existingDepartment}, ${membership.departmentId}.`,
      );
    }
    primaryDepartments.set(membership.personId, membership.departmentId);
    claimPagePlacement(membership.personId, membership.departmentId);
    const memberships = membershipsByDepartment.get(membership.departmentId) ?? [];
    memberships.push(membership);
    membershipsByDepartment.set(membership.departmentId, memberships);
  }

  const departments = config.departments
    .map((department) => ({
      ...department,
      members: (membershipsByDepartment.get(department.id) ?? []).map(
        (membership) => resolveTeamMember(membership, "member", profileMap),
      ),
    }))
    .filter((department) => department.members.length > 0);

  const advisoryBoard = config.advisoryBoard.map((placement) => {
    claimPagePlacement(placement.personId, "Advisory Board");
    return resolveTeamMember(placement, "advisor", profileMap);
  });

  const heroPeople = config.people.filter(({ id, image, featuredInTeamHero }) => {
    if (!featuredInTeamHero) return false;
    if (!pagePlacements.has(id)) {
      throw new Error(`Hub-only person ${id} cannot be featured in the team hero.`);
    }
    if (!image || /(?:^|\/)placeholder(?:\.[a-z0-9]+)?$/i.test(image)) {
      throw new Error(`Team hero person ${id} must have a non-placeholder portrait.`);
    }
    return true;
  });

  return {
    people: config.people,
    executiveLeadership,
    departments,
    advisoryBoard,
    heroPeople,
  };
}

const teamDirectory = buildTeamDirectory({
  people: canonicalPeople,
  departments: departmentCatalog,
  executiveLeadership: executiveLeadershipConfig,
  departmentMemberships,
  advisoryBoard: advisoryBoardConfig,
});

export const people = teamDirectory.people;
export const executiveLeadership = teamDirectory.executiveLeadership;
export const teamDepartments = teamDirectory.departments;
export const advisoryBoardMembers = teamDirectory.advisoryBoard;
export const teamHeroPeople = teamDirectory.heroPeople;

export function getPersonById(id: string): PersonProfile | undefined {
  return people.find((person) => person.id === id);
}

export function getPersonBySlug(slug: string): PersonProfile | undefined {
  return people.find((person) => person.slug === slug);
}

/** @deprecated Prefer canonical profile lookup unless a contextual title is needed. */
export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  const person = getPersonBySlug(slug);
  if (!person?.image) return undefined;

  const placedMember = [
    ...executiveLeadership,
    ...teamDepartments.flatMap(({ members }) => members),
    ...advisoryBoardMembers,
  ].find(({ id }) => id === person.id);
  if (placedMember) return placedMember;

  if (person.id === "37") {
    return {
      ...person,
      image: person.image,
      title: "Co-Director, Neighborhood Health Project",
      roleCategory: "member",
    };
  }

  return undefined;
}

export function resolveHubLeadership(
  references: readonly HubLeaderReference[],
  profiles: readonly PersonProfile[] = people,
): HubLeader[] {
  const profileMap = createPeopleMap(profiles);
  const resolvedIds = new Set<string>();

  return references.map((reference) => {
    if (resolvedIds.has(reference.personId)) {
      throw new Error(`Duplicate hub leadership placement: ${reference.personId}`);
    }
    resolvedIds.add(reference.personId);
    const profile = profileMap.get(reference.personId);
    if (!profile) {
      throw new Error(`Unknown hub person reference: ${reference.personId}`);
    }

    return {
      id: profile.id,
      name: profile.name,
      role: reference.role,
      affiliation: profile.affiliation,
      image: profile.image,
      featured: reference.featured,
      bio: profile.bio,
      contact: profile.socialLinks && {
        email: profile.socialLinks.email,
        linkedin: profile.socialLinks.linkedin,
      },
    };
  });
}
