"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import { Linkedin, Mail, X } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";

type SpotlightMember = {
  name: string;
  role: string;
  org: string;
  image: string;
  email?: string;
  linkedin?: string;
  bio?: string;
};

const HERO_PORTRAIT_SIZE = 80;

const heroRows: Array<{
  offset: string;
  faces: Array<{ image: string; delay: number }>;
}> = [
  {
    offset: "pr-2 lg:pr-4",
    faces: [
      { image: "/images/team/brian-fleischer.jpeg", delay: 0 },
      { image: "/images/team/esi-bon-berkoh.jpg", delay: 0.05 }
    ]
  },
  {
    offset: "pr-8 lg:pr-12",
    faces: [
      { image: "/ucc-team/getwell_ebiram_essuman.JPG", delay: 0.1 },
      { image: "/ucc-team/david_konadu_kombate.JPG", delay: 0.15 },
      { image: "/images/team/nana-ama-ocran.PNG", delay: 0.2 }
    ]
  },
  {
    offset: "pr-14 lg:pr-20",
    faces: [
      { image: "/images/team/afriyie-badu.jpg", delay: 0.25 },
      { image: "/images/team/prince-agyei.jpg", delay: 0.3 },
      { image: "/images/team/adwoa-danso-dodoo.jpg", delay: 0.35 },
      { image: "/ucc-team/queenster_aduse_opoku.JPG", delay: 0.4 }
    ]
  },
  {
    offset: "pr-20 lg:pr-28",
    faces: [
      { image: "/ucc-team/david_kojo_ofosu.JPG", delay: 0.45 },
      { image: "/images/team/gabrielle-nartey.JPG", delay: 0.5 },
      { image: "/ucc-team/wilfred_obeng.JPG", delay: 0.55 },
      { image: "/ucc-team/belinda_odoom.JPG", delay: 0.6 }
    ]
  },
  {
    offset: "pr-24 lg:pr-36",
    faces: [
      { image: "/ucc-team/hafiz_shaban.JPG", delay: 0.65 },
      { image: "/images/team/mighty-doffoe.jpg", delay: 0.7 },
      { image: "/images/team/dr-tuoyire.jpeg", delay: 0.75 },
      { image: "/images/team/kelvin-fiifi.jpeg", delay: 0.8 }
    ]
  },
  {
    offset: "pr-28 lg:pr-44",
    faces: [
      { image: "/ucc-team/martha_bawa.JPG", delay: 0.85 },
      { image: "/ucc-team/prince_nyarkoh.JPG", delay: 0.9 },
      { image: "/ucc-team/geraldine_cristal_apeadua_agyepong.JPG", delay: 0.95 }
    ]
  },
  {
    offset: "pr-32 lg:pr-52",
    faces: [
      { image: "/ucc-team/frederick_baffour.JPG", delay: 1.0 },
      { image: "/ucc-team/gloria_tawia_blay.JPG", delay: 1.05 }
    ]
  }
];

const executiveTeam: SpotlightMember[] = [
  {
    name: "Brian Amu Fleischer, MD",
    role: "Founder & President",
    org: "Yale University",
    image: "/images/team/brian-fleischer.jpeg",
    email: "brian.fleischer@akomapa.org",
    linkedin: "https://linkedin.com/in/brian-fleischer",
    bio: "Dr. Brian Fleischer is a visionary physician and global health leader dedicated to advancing equitable care for non-communicable diseases in underserved communities. A graduate of Yale School of Medicine and Stanford University, he founded the Akomapa Health Foundation to empower students and communities to drive sustainable solutions for hypertension and diabetes care across Ghana and beyond—building a movement of compassionate health leaders with akomapa, a “good heart.”"
  },
  {
    name: "Esi Bon Berkoh",
    role: "Co-Founder & Vice President",
    org: "University of Cape Coast",
    image: "/images/team/esi-bon-berkoh.jpg",
    email: "esi.berkoh@akomapa.org",
    linkedin: "https://linkedin.com/in/esi-berkoh",
    bio: "Esi Berkoh is a final-year medical student at the University of Cape Coast School of Medical Sciences. She holds a BSc in Biology from Mount Holyoke College and an MSc in Infection, Immunity & Human Disease from the University of Leeds. As Vice President and co-founder of Akomapa Health, she coordinates clinic operations, supports leadership, and organizes outreach programs to serve underserved communities while gaining hands-on experience and leadership training."
  },
  {
    name: "Bismark Amoh",
    role: "Co-Founder & Research Lead",
    org: "David Geffen School of Medicine at UCLA",
    image: "/images/team/placeholder.jpg",
    email: "bismark.amoh@akomapa.org",
    linkedin: "https://linkedin.com/in/bismark-amoh",
    bio: "Bismark Amoh leads Akomapa's research initiatives, bringing rigorous scientific methodology to evaluate and improve our healthcare programs. His work ensures that every intervention is evidence-based and continuously refined for maximum impact on community health outcomes."
  },
  {
    name: "Afriyie Badu, MD",
    role: "Co-Founder & Finance Lead",
    org: "University of Ghana",
    image: "/images/team/afriyie-badu.jpg",
    email: "afriyie.badu@akomapa.org",
    linkedin: "https://linkedin.com/in/afriyie-badu",
    bio: "Dr. Afriyie Badu oversees Akomapa's financial strategy and sustainability initiatives. With expertise in healthcare economics and resource management, he ensures that every dollar invested creates lasting value for the communities we serve.Dr. Nana Yaw Afriyie Badu is a medical doctor and a Co-founder and Chief Financial Officer (CFO) of Akomapa. In his role, he oversees the organization’s financial strategy and sustainability, ensuring that programs are effectively resourced to make a lasting community impact. He co-founded Akomapa out of a desire to transform the approach to non-communicable diseases by shifting the focus from treatment to prevention through early detection, education, and lifestyle interventions. Outside Akomapa, Dr. Badu is deeply passionate about orthopaedic surgery, sports medicine, and public health advocacy, and continues to champion initiatives that bridge healthcare access and community wellness."
  },
  {
    name: "Adwoa Danso-Dodoo",
    role: "Finance Associate Lead",
    org: "Yale University",
    image: "/images/team/adwoa-danso-dodoo.jpg",
    email: "adwoa.danso@akomapa.org",
    linkedin: "https://linkedin.com/in/adwoa-danso",
    bio: "Adwoa Danso-Dodoo brings financial acumen and operational excellence to Akomapa's finance team. Her meticulous approach to budgeting and resource allocation ensures transparency and accountability in all our financial operations.Adwoa Danso-Dodoo is a Business Analyst at McKinsey & Company and a graduate of Yale College and the Yale School of Management, where she studied Chemical Engineering and Technology Management, respectively. She serves as Associate Finance Lead at Akomapa Health Foundation, helping to manage the organization’s budget. In addition, she is helping develop the Akomapa Summer Immersion Program. Adwoa joined the team because she is passionate about Akomapa’s mission to bring care to more communities and to encourage students to lead with empathy and purpose."
  },
  {
    name: "David Ofosu",
    role: "Chapter Co-Director, Akomapa UCC",
    org: "University of Cape Coast",
    image: "/ucc-team/david_kojo_ofosu.JPG",
    email: "david.ofosu@akomapa.org",
    linkedin: "https://linkedin.com/in/david-ofosu",
    bio: "David Kojo Ofosu is a final year medical student at the University of Cape Coast School (UCC) of Medical Sciences. He currently serves as the Co-Director of the UCC Chapter Akomapa. In his role,  he oversees all aspects of the clinic’s operations, ensuring alignment with its mission and goals, he together with his team develop strategic plans to guide the clinic’s growth and impact. He coordinate and chair leadership team meetings, ensuring all roles collaborate effectively. He acts as the primary point of contact for external partners, and funding organizations.he address operational challenges and ensure compliance with relevant guidelines and regulations He also represent the clinic in public forums, presentations, and community events."
  },
  {
    name: "Hafiz Shaban",
    role: "Chapter Co-Director, Akomapa UCC",
    org: "University of Cape Coast",
    image: "/ucc-team/hafiz_shaban.JPG",
    email: "hafiz.shaban@akomapa.org",
    linkedin: "https://linkedin.com/in/hafiz-shaban",
    bio: "Hafiz Shaban is a final-year nursing student at the University of Cape Coast and Co-Director of the UCC chapter of Akomapa. Passionate about global health and community-based medicine, he joined the clinic to expand access to quality healthcare for underserved communities. Hafiz is committed to promoting equitable, community-centered healthcare and developing as a global health leader."
  },
  {
    name: "Sedem Dankwa",
    role: "Global Partnerships Lead",
    org: "Yale University",
    image: "/images/team/placeholder.jpg",
    email: "sedem.dankwa@akomapa.org",
    linkedin: "https://linkedin.com/in/sedem-dankwa",
    bio: "Sedem Dankwa builds strategic partnerships that amplify Akomapa's impact globally. Her work connects our mission with organizations, institutions, and individuals who share our commitment to equitable healthcare access."
  },
  {
    name: "Nana Ama Ocran",
    role: "Leadership Training Program Lead",
    org: "Yale University",
    image: "/images/team/nana-ama-ocran.PNG",
    email: "nana.ocran@akomapa.org",
    linkedin: "https://linkedin.com/in/nana-ocran",
    bio: "Nana Ama Ocran is a senior at Yale University studying History of Science, Medicine & Public Health, and French. She currently serves as the Leadership Training Program Lead for Akomapa Health Foundation, US. In her role, she designs and organizes opportunities for bidirectional learning that emphasize equity, collaboration, and community-rooted approaches to care. She joined Akomapa to support youth-driven health systems and strengthen cross-continental pathways for learning and leadership."
  },
  {
    name: "Wilfred Obeng",
    role: "Clinical Standards Lead",
    org: "University of Cape Coast",
    image: "/ucc-team/wilfred_obeng.JPG",
    email: "wilfred.obeng@akomapa.org",
    linkedin: "https://linkedin.com/in/wilfred-obeng",
    bio: "Wilfred Obeng is currently studying Medicine at the University of Cape Coast, Ghana. He serves as a Training and Standards lead with Akomapa UCC and as Clinical Standards Coordinator with Akomapa Global. He joined the project to learn about and contribute towards addressing the health problems of rural Ghanaian communities and helps with the development of training resources for volunteers and with the monitoring, evaluation, and improvement of the clinic's standards."
  },
  {
    name: "Gabrielle Nartey",
    role: "Lead Social Media Manager",
    org: "Akomapa Health Foundation",
    image: "/images/team/gabrielle-nartey.JPG",
    email: "gabrielle.nartey@akomapa.org",
    linkedin: "https://linkedin.com/in/gabrielle-nartey",
    bio: "Gabrielle Nartey is a sophomore at Yale University studying Neuroscience on the pre-medical track. She currently serves as Lead Social Media Manager for Akomapa, where she oversees marketing across all social media platforms and works to expand the clinic’s reach and visibility on an international scale. Gabrielle joined the clinic to help bridge the gap between healthcare and access—ensuring that individuals who need care most are aware of and empowered to seek Akomapa’s services."
  },
  {
    name: "Christabel Amma Buckman",
    role: "Development & Communications Lead",
    org: "David Geffen School of Medicine at UCLA",
    image: "/images/team/placeholder.jpg",
    email: "amma.buckman@akomapa.org",
    linkedin: "https://linkedin.com/in/amma-buckman",
    bio: "Amma Buckman leads development and communications efforts, crafting compelling narratives that showcase Akomapa's impact. Her strategic approach helps secure resources and partnerships that fuel our growth and expansion."
  },
  {
    name: "Dr. Patrick Ampofo",
    role: "UG Expansion Lead",
    org: "University of Ghana Medical School",
    image: "/images/team/patrick-ampofo.jpg",
    email: "patrick.ampofo@akomapa.org",
    linkedin: "https://linkedin.com/in/patrick-ampofo",
    bio: "Dr. Patrick Ampofo, an alumnus of UGMS and a first-year MPH student at Yale School of Public Health, currently serves as the UG expansion lead. He has a passion for bridging the gap in healthcare access disparities through evidence-based approaches and community-based interventions. In his current role, Dr. Ampofo is focused on helping establish the UG chapter of Akomapa by actively engaging key personnel and mobilizing medical students."
  },
  {
    name: "Prince Agyei Tuffour",
    role: "IT Services Lead",
    org: "Akomapa Health Foundation",
    image: "/images/team/prince-tuffour.jpg",
    email: "prince.tuffour@akomapa.org",
    linkedin: "https://linkedin.com/in/prince-tuffour",
    bio: "Prince Agyei Tuffour manages Akomapa's technology infrastructure, ensuring our digital systems support efficient operations and data management. His technical expertise enables scalable solutions for our growing organization."
  },
  {
    name: "Mighty Doffoe",
    role: "IT Services Associate Lead",
    org: "Akomapa Health Foundation",
    image: "/images/team/mighty-doffoe.jpg",
    email: "mighty.doffoe@akomapa.org",
    linkedin: "https://linkedin.com/in/mighty-doffoe",
    bio: "Mighty Doffoe is a final year Computer Science student at Bridgewater College. He currrently serves as the Assistant Head of IT for Akomapa. Mighty Doffoe supports Akomapa's IT operations, maintaining systems and developing tools that streamline our workflows. His contributions ensure that technology enhances rather than hinders our mission delivery."
  },
  {
    name: "Kelvin Fiifi",
    role: "Branding and Public Relations Lead",
    org: "Akomapa Health Foundation",
    image: "/images/team/kelvin-fiifi.jpeg",
    email: "kelvin.fiifi@akomapa.org",
    linkedin: "https://linkedin.com/in/kelvin-fiifi",
    bio: "Kelvin is a naturally creative mind who enjoys building ideas, designing brands, and exploring anything that blends art, tech, and problem solving. Calm but unpredictable in the best way, he connects with people easily, yet values trust deeply. Tall, caramel-toned, and openly expressive, he’s someone who loves good music, good food, and any space that lets him create freely. He's always learning, always experimenting, and always ready for the next project or opportunity that challenges him to grow."
  },
  {
    name: "Samuel Kumi",
    role: "Legal Affairs Lead",
    org: "Akomapa Health Foundation",
    image: "/images/team/placeholder.jpg",
    email: "samuel.kumi@akomapa.org",
    linkedin: "https://linkedin.com/in/samuel-kumi",
    bio: "Samuel Kwame Kumi, Esq. is a private legal practitioner and lecturer. Samuel has valuable experience in litigation and Alternative Dispute Resolution, notably acting as lawyer for medical professionals in medical matters. His interests span medical, IT, Intellectual Property and energy law, areas in which he has published. As Akomapa's Head of Legal, Samuel oversees corporate affairs, advises on risk, and ensures compliance. He sees Akomapa's strategic community-focused initiatives establishing it as a trailblazer in community health. "
  }
];

const advisoryBoard: SpotlightMember[] = [
  {
    name: "Dr. Derek Anamaale Tuoyire",
    role: "Head of Community Medicine",
    org: "University of Cape Coast",
    image: "/images/team/dr-tuoyire.jpeg"
  },
  {
    name: "Prof. Martins Ekor",
    role: "Provost, College of Health and Allied Sciences",
    org: "University of Cape Coast",
    image: "/images/team/prof-martin-ekor.jpg"
  },
  {
    name: "Prof. Samuel Kyei",
    role: "Professor of Optometry",
    org: "University of Cape Coast",
    image: "/images/team/prof-samuel-kyei.png"
  },
  {
    name: "Dr. Jeremy Schwartz",
    role: "Head, Chronic Care Access Lab",
    org: "Yale University",
    image: "/images/team/placeholder.jpg"
  },
  {
    name: "Dr. Adrian Mayo",
    role: "Assistant Clinical Professor",
    org: "David Geffen School of Medicine, UCLA",
    image: "/images/team/placeholder.jpg"
  },
  {
    name: "Dr. Elijah Paintsil",
    role: "Chief & Chair of Pediatrics",
    org: "Boston Medical Center",
    image: "/images/team/placeholder.jpg"
  }
];

const heroStats = [
  { value: "15+", label: "Executive Leads" },
  { value: "6", label: "Academic Partners" },
  { value: "100+", label: "Volunteers Inspired" }
];

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const primaryCtaClass =
  `${ctaBaseClass} bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#8DD4E6]`;

const secondaryCtaClass =
  `${ctaBaseClass} bg-[#eeba2b] hover:bg-[#eeba2b]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#F5C94D]`;

function BioModal({ 
  member, 
  isOpen, 
  onClose 
}: { 
  member: SpotlightMember | null; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  if (!member) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-[#1C1F1E] shadow-xl transition-all">
                <div className="relative">
                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 rounded-full bg-white/90 dark:bg-[#1C1F1E]/90 p-2 text-[#2F3332] dark:text-[#FCFAEF] hover:bg-[#0097b2]/10 focus:outline-none focus:ring-2 focus:ring-[#0097b2]"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Image */}
                  <div className="relative h-80 sm:h-96 md:h-[28rem] w-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-center"
                      quality={100}
                    />
                  </div>

                  {/* Content */}
                  <div className="px-6 sm:px-8 py-6 sm:py-8">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#0F4C5C]/60 dark:text-[#66C4DC] mb-2">
                      {member.org}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-[#0B2F3A] dark:text-[#FCFAEF] mb-2">
                      {member.name}
                    </h3>
                    <p className="text-base sm:text-lg text-[#0097b2] dark:text-[#66C4DC] mb-6">
                      {member.role}
                    </p>
                    
                    {member.bio && (
                      <div className="mb-6">
                        <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                          {member.bio}
                        </p>
                      </div>
                    )}

                    {/* Social links */}
                    {(member.email || member.linkedin) && (
                      <div className="pt-4 border-t border-[#E6E7E7] dark:border-[#2E3433]">
                        <p className="text-sm font-medium text-[#2F3332] dark:text-[#E6E7E7] mb-3">
                          Connect:
                        </p>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                          {member.email && (
                            <Link
                              href={`mailto:${member.email}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E6E7E7] dark:border-[#2E3433] text-[#0B2F3A] dark:text-[#FCFAEF] hover:bg-[#0097b2]/10 dark:hover:bg-[#0097b2]/20 transition-colors"
                            >
                              <Mail className="h-4 w-4" />
                              <span className="text-sm font-medium">Email</span>
                            </Link>
                          )}
                          {member.linkedin && (
                            <Link
                              href={member.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E6E7E7] dark:border-[#2E3433] text-[#0B2F3A] dark:text-[#FCFAEF] hover:bg-[#0097b2]/10 dark:hover:bg-[#0097b2]/20 transition-colors"
                            >
                              <Linkedin className="h-4 w-4" />
                              <span className="text-sm font-medium">LinkedIn</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function TeamCard({
  member,
  variant = "default",
  onClick,
  isClickable = false
}: {
  member: SpotlightMember;
  variant?: "default" | "compact";
  onClick?: () => void;
  isClickable?: boolean;
}) {
  const imageHeight = variant === "compact" ? "h-80 sm:h-96 md:h-[28rem] lg:h-[32rem]" : "h-80 sm:h-96 md:h-[28rem] lg:h-[32rem]";
  
  const handleClick = (e: React.MouseEvent) => {
    if (isClickable && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      onClick={handleClick}
      className={`group flex flex-col rounded-[28px] border border-[#E6E7E7]/80 dark:border-[#2E3433] bg-white/95 dark:bg-[#1C1F1E]/95 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden ${
        isClickable ? "cursor-pointer" : ""
      }`}
    >
      <div className={`relative w-full ${imageHeight} overflow-hidden`}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-center rounded-t-[28px]"
          quality={100}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-col gap-2 px-6 py-6">
        <p className="text-sm uppercase tracking-[0.3em] text-[#0F4C5C]/60 dark:text-[#66C4DC]">
          {member.org}
        </p>
        <h3 className="text-xl font-semibold text-[#0B2F3A] dark:text-[#FCFAEF]">
          {member.name}
        </h3>
        <p className="text-[#2F3332]/80 dark:text-[#E6E7E7]/80">{member.role}</p>
        {(member.email || member.linkedin) && (
          <div className="flex items-center gap-3 pt-2" onClick={handleLinkClick}>
            {member.email && (
              <Link
                href={`mailto:${member.email}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E7E7] dark:border-[#2E3433] text-[#0B2F3A] dark:text-[#FCFAEF] hover:bg-[#0097b2]/10 dark:hover:bg-[#0097b2]/20 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </Link>
            )}
            {member.linkedin && (
              <Link
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E7E7] dark:border-[#2E3433] text-[#0B2F3A] dark:text-[#FCFAEF] hover:bg-[#0097b2]/10 dark:hover:bg-[#0097b2]/20 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<SpotlightMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (member: SpotlightMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>

      <BioModal 
        member={selectedMember} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />

      <section className="relative overflow-hidden bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF] py-16 md:py-24">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCFAEF]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FCFAEF]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col gap-8 sm:gap-10 md:gap-12 lg:flex-row lg:items-center">
          <div className="max-w-3xl w-full">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[#FCFAEF]/80 mb-3 sm:mb-4">
              A team of young leaders for young people
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-4 sm:mb-6 text-[#FCFAEF]">
              We are a youth-powered team reimagining healthcare with heart, science, and shared purpose.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#FCFAEF]/80 mb-6 sm:mb-8">
              From Cape Coast to Yale and UCLA, Akomapa leaders blend academic rigor, community roots,
              and relentless hope to build a student-run model of care that is ethical, joyful, and
              unstoppable.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
                  <p className="text-2xl sm:text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/70 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Button asChild className={primaryCtaClass}>
                <Link href="/contact">Meet with Us</Link>
              </Button>
              <Button asChild className={secondaryCtaClass}>
                <Link href="/join">Join the Movement</Link>
              </Button>
            </div>
          </div>

          <div className="w-full max-w-full lg:w-[480px] flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7 self-center lg:self-start lg:ml-auto lg:pt-8 lg:translate-x-10 mt-8 lg:mt-0">
            {heroRows.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className={`flex items-center justify-end gap-2 sm:gap-3 md:gap-4 ${row.offset}`}
              >
                {row.faces.map((face, faceIndex) => (
                  <div
                    key={`${face.image}-${faceIndex}`}
                    className="flex items-center gap-2 sm:gap-3 md:gap-4"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: face.delay }}
                      className="relative rounded-full bg-white/10 backdrop-blur shrink-0 hero-portrait"
                      style={{
                        '--portrait-size': `${HERO_PORTRAIT_SIZE}px`,
                        width: `clamp(32px, ${HERO_PORTRAIT_SIZE * 0.6}px, var(--portrait-size))`,
                        height: `clamp(32px, ${HERO_PORTRAIT_SIZE * 0.6}px, var(--portrait-size))`
                      } as React.CSSProperties & { '--portrait-size': string }}
                    >
                      <Image
                        src={face.image}
                        alt=""
                        fill
                        className="rounded-full object-cover object-center"
                        quality={100}
                        minWidth={240}
                        minHeight={240}
                        sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 80px"
                      />
                    </motion.div>
                    {faceIndex !== row.faces.length - 1 && (
                      <span className="h-px w-6 sm:w-8 md:w-10 lg:w-14 border-t border-dotted border-white/30" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-8 sm:mb-12 text-center mx-auto space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] sm:tracking-[0.5em] text-[#0097b2]">Executive Team</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2F3A] dark:text-[#FCFAEF]">
              The builders behind the Akomapa model
            </h2>
            <p className="text-base sm:text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
              Each leader blends academic excellence, community credibility, and operational discipline to
              ensure every clinic day reflects empathy, rigor, and trust.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {executiveTeam.map((member) => (
              <TeamCard 
                key={member.name} 
                member={member} 
                isClickable={!!member.bio}
                onClick={() => handleCardClick(member)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-r from-[#0097b2] via-[#0F4C5C] to-[#031C3A] text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-8 sm:mb-12 text-center mx-auto space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] sm:tracking-[0.5em] text-[#F5C94D]">Advisory Board</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Global experts guiding our ethics, science, and scale
            </h2>
            <p className="text-base sm:text-lg text-white/80">
              Our advisors ensure Akomapa remains clinically sound, academically rigorous, and deeply
              community-rooted as we expand across regions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {advisoryBoard.map((member) => (
              <TeamCard key={member.name} member={member} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2F3A] dark:text-[#FCFAEF]">
            Join the hearts behind the mission
          </h2>
          <p className="text-base sm:text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80 max-w-3xl mx-auto">
            We are always looking for collaborators, mentors, and students who believe in ethical,
            student-powered healthcare. Your skills, story, or sponsorship could open the next door for
            patients we serve.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <Button asChild className={primaryCtaClass}>
              <Link href="/partner">Partner with Akomapa</Link>
            </Button>
            <Button asChild className={secondaryCtaClass}>
              <Link href="/join">Apply to Serve</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

