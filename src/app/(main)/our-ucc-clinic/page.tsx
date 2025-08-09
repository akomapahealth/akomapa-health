"use client";

import { motion } from "framer-motion";
import { 
  MapPin, 
  Clock, 
  Heart, 
  Shield, 
  Calendar,
  Building,
  Stethoscope,
  GraduationCap,
  BookOpen,
  Navigation,
  Users,
  ArrowRight
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "@/components/common/Image";
import InteractiveMap from "@/components/common/InteractiveMap";
import PhotoCarousel from "@/components/common/PhotoCarousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const clinicPrograms = [
  {
    icon: Stethoscope,
    title: "Chronic Disease Screening",
    description: "Free blood pressure and glucose checks with personalized education.",
    color: "#007A73"
  },
  {
    icon: Shield,
    title: "Medication Counseling",
    description: "Safe, evidence-based prescribing and guidance by pharmacists and clinicians.",
    color: "#C37B1E"
  },
  {
    icon: Heart,
    title: "Nutrition & Lifestyle Coaching",
    description: "Community health workers provide culturally tailored nutrition and wellness advice.",
    color: "#007A73"
  },
  {
    icon: Navigation,
    title: "Referral & Navigation Services",
    description: "We help patients access district hospitals, enroll in NHIS, and schedule follow-up care.",
    color: "#C37B1E"
  },
  {
    icon: BookOpen,
    title: "Community Education & School Outreach",
    description: "We are developing health education workshops for schools and families.",
    color: "#007A73"
  },
  {
    icon: GraduationCap,
    title: "Global Health Leadership Program",
    description: "Ongoing mentorship from UCC, Yale, and UCLA faculty to train students in research, ethics, and implementation.",
    color: "#C37B1E"
  }
];

const trainingAreas = [
  "Foundational clinical skills",
  "Leadership and communication",
  "Quality improvement",
  "Ethical patient care",
  "Community engagement",
  "Implementation science and research design"
];

// const clinicZones = [
//   {
//     name: "Zone A: Abeadze Dominase",
//     description: "Primary clinic location serving the Abeadze Dominase community",
//     color: "#007A73"
//   },
//   {
//     name: "Zone B: Abura",
//     description: "Secondary clinic location serving the Abura community",
//     color: "#C37B1E"
//   }
// ];

// Sample clinic photos for carousel
const clinicPhotos = [
  {
    src: "/highlights/Akomapa-40.jpg",
    alt: "Training session with students",
    caption: "Students participating in clinical training sessions"
  },
  {
    src: "/highlights/Akomapa-39.jpg",
    alt: "Community outreach event",
    caption: "Community health education and outreach programs"
  },
  {
    src: "/highlights/Akomapa-19.jpg",
    alt: "Clinic day activities",
    caption: "Patient care and screening during clinic days"
  },
  {
    src: "/gallery/gallery-pic-10.JPG",
    alt: "Student volunteers at work",
    caption: "Student volunteers providing healthcare services"
  },
  {
    src: "/highlights/Akomapa-61.jpg",
    alt: "Faculty mentorship",
    caption: "Faculty mentors guiding student healthcare leaders"
  }
];

// Clinic locations for interactive map
const clinicLocations = [
  {
    name: "Abeadze Dominase",
    description: "Primary clinic location serving the Abeadze Dominase community in Cape Coast",
    coordinates: "5.1319° N, 1.2798° W",
    lat: 5.1319,
    lng: -1.2798,
    address: "Abeadze Dominase, Cape Coast, Ghana"
  },
  {
    name: "Abura",
    description: "Secondary clinic location serving the Abura community in Cape Coast",
    coordinates: "5.1053° N, 1.2469° W",
    lat: 5.1053,
    lng: -1.2469,
    address: "Abura, Cape Coast, Ghana"
  }
];

// Zone locations for the clinic zones map
const zoneLocations = [
  {
    name: "Zone A: Abeadze Dominase",
    description: "Primary clinic location serving the Abeadze Dominase community",
    coordinates: "5.1319° N, 1.2798° W",
    lat: 5.1319,
    lng: -1.2798,
    address: "Abeadze Dominase, Cape Coast, Ghana"
  },
  {
    name: "Zone B: Abura",
    description: "Secondary clinic location serving the Abura community",
    coordinates: "5.1053° N, 1.2469° W",
    lat: 5.1053,
    lng: -1.2469,
    address: "Abura, Cape Coast, Ghana"
  }
];

export default function UCCClinicPage() {

  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/hero-image.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 bg-[#007A73]/10 dark:bg-[#63B0AC]/10 rounded-full mb-6"
            >
              <Building size={20} className="text-[#007A73] dark:text-[#63B0AC] mr-2" />
              <span className="text-[#007A73] dark:text-[#63B0AC] font-medium">University of Cape Coast</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-6"
            >
              Akomapa at the University of Cape Coast
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#2F3332] dark:text-[#E6E7E7] mb-8"
            >
              Empathy. Equity. Excellence.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 text-left"
            >
              <p className="text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80 mb-4">
                Welcome to the UCC Clinic. The Akomapa Student-Run Free Clinic at the University of Cape Coast is the first in a growing network of student-led primary care clinics across Africa.
              </p>
              <p className="text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                Grounded in the values of empathy, equity, and ethical leadership, Akomapa at UCC aims to close critical gaps in screening, counseling, and chronic disease management for underserved communities in Cape Coast and beyond.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-[#C37B1E]/10 dark:bg-[#F3C677]/10 rounded-full mb-6">
                <Heart size={20} className="text-[#C37B1E] dark:text-[#F3C677] mr-2" />
                <span className="text-[#C37B1E] dark:text-[#F3C677] font-medium">Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                🩺 Our Mission
              </h2>
              <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                To strengthen access to high-quality, compassionate care for chronic conditions like hypertension and diabetes, while training the next generation of healthcare leaders through service, research, and community partnership.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                📍 Clinic Days & Locations
              </h3>
              <div className="space-y-6">
                <div className="bg-white dark:bg-[#2F3332] rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-[#007A73] dark:text-[#63B0AC] mr-3" />
                    <h4 className="font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">Every Other Saturday</h4>
                  </div>
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-[#C37B1E] dark:text-[#F3C677] mr-2" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">8:00 AM – 12:00 Noon</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-[#C37B1E] dark:text-[#F3C677] mr-2" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">Abeadze Dominase & Abura (Cape Coast Area)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#007A73]/10 dark:bg-[#007A73]/20 rounded-lg p-4 text-center">
                    <div className="text-sm text-[#007A73] dark:text-[#63B0AC] font-medium mb-1">Pre-Pilot Clinics</div>
                    <div className="text-lg font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">July 12th & 19th, 2025</div>
                  </div>
                  <div className="bg-[#C37B1E]/10 dark:bg-[#C37B1E]/20 rounded-lg p-4 text-center">
                    <div className="text-sm text-[#C37B1E] dark:text-[#F3C677] font-medium mb-1">Official Pilot Launch</div>
                    <div className="text-lg font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">October 2025</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <InteractiveMap
                title="Clinic Locations"
                description="Find our clinic locations and get directions to our service areas."
                locations={clinicLocations}
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Carousel Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                🎞️ Clinic in Action
              </h2>
              <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7]">
                Rotating carousel of photos from training sessions, clinic days, and community outreach events.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <PhotoCarousel
                title="Clinic Activities"
                description="Photos from our training sessions, clinic days, and community outreach events"
                photos={clinicPhotos}
                autoPlay={true}
                interval={4000}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership & Training Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                🌱 Leadership & Training
              </h2>
              <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                Akomapa is more than a clinic—it is a platform for leadership, service, and transformation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Our Volunteers
                </h3>
                <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-6 leading-relaxed">
                  Our volunteers are compassionate, driven students from across all schools under the College of Health and Allied Sciences (COHAS) at the University of Cape Coast. They represent a wide range of disciplines—medicine, nursing, pharmacy, nutrition, physician assistantship, and public health—united by a shared passion for community service and interprofessional collaboration.
                </p>
                <div className="bg-[#007A73]/10 dark:bg-[#007A73]/20 rounded-lg p-6">
                  <div className="text-3xl font-bold text-[#007A73] dark:text-[#63B0AC] mb-2">93%</div>
                  <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                    of students expressed a preference for working in interprofessional teams, citing the holistic care it provides to patients and the many opportunities for learning, mentorship, and professional growth.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#2F3332] rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Intensive Training Program
                </h3>
                <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-6">
                  All clinic leaders underwent a 6-week intensive training led by faculty and mentors from UCC, Yale University, and UCLA. The training emphasized:
                </p>
                <div className="space-y-3">
                  {trainingAreas.map((area, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-[#2F3332] dark:text-[#E6E7E7]">{area}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12 bg-[#FCFAEF] dark:bg-[#1C1F1E] rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Our Commitment to Ethics
              </h3>
              <p className="text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                At Akomapa, we hold ourselves to the highest standards of ethics and professionalism. Every patient is treated with dignity, confidentiality, and respect. Every student is trained to lead with integrity, humility, and a commitment to service. We believe that trust is the foundation of good medicine—and we work every day to earn it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
              🤝 Our Programs
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7]">
              Comprehensive healthcare services designed to meet the diverse needs of our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clinicPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#2F3332] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${program.color}20` }}
                >
                  <program.icon size={32} style={{ color: program.color }} />
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {program.title}
                </h3>
                
                <p className="text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  {program.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-Directors Note Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#007A73] to-[#C37B1E] rounded-2xl p-8 md:p-12 text-center text-white"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                ✍️ A Note from Our Co-Directors
              </h2>
              <blockquote className="text-lg md:text-xl italic mb-6 leading-relaxed">
                &quot;Welcome to Akomapa at UCC. We are honored to serve our communities alongside students, faculty, and global partners. We believe in healthcare that listens, empowers, and uplifts—and we invite you to walk this journey with us as we grow Akomapa together.&quot;
              </blockquote>
              <p className="text-lg opacity-90">
                — Co-Directors, UCC Akomapa Clinic
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Faculty Endorsement Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#2F3332] rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                🧑🏾‍⚕️ Faculty Endorsement
              </h2>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-[#007A73]/10 dark:bg-[#63B0AC]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users size={32} className="text-[#007A73] dark:text-[#63B0AC]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">
                    From Dr. Anamaale Tuoyire
                  </h3>
                  <p className="text-sm text-[#007A73] dark:text-[#63B0AC] mb-4">
                    Head, Department of Community Medicine, College of Health and Allied Sciences
                  </p>
                  <blockquote className="text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed italic">
                    &quot;Akomapa represents the kind of student-led innovation and community partnership that Ghana needs. We are proud to house the first Akomapa clinic at UCC and excited to support its continued growth and impact. These students exemplify the values of service, leadership, and excellence.&quot;
                  </blockquote>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clinic Zones Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
              🗺️ Clinic Session Map
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7]">
              Interactive map showing the location and rotation of our clinic zones.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <InteractiveMap
                title="Clinic Zones"
                description="Interactive map showing the location and rotation of our two clinic zones."
                locations={zoneLocations}
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 md:py-24 bg-[#007A73] dark:bg-[#2F3332]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FCFAEF]">
                🙌 Support Our Work
              </h2>
              <p className="text-lg text-[#FCFAEF]/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Akomapa is powered by student volunteers, local health workers, and donors like you. Your support allows us to offer free screening, medications, and life-saving education to patients who need it most.
              </p>
              <p className="text-xl font-bold text-[#FCFAEF] mb-8">
                Help us grow Akomapa. Help us build a healthier Ghana.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#C37B1E] hover:bg-[#F3C677] text-[#FCFAEF] text-lg px-8 py-3">
                  <Link href="/join" className="flex items-center">
                    Volunteer with Us <ArrowRight size={20} className="ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-[#FCFAEF] text-[#FCFAEF] hover:bg-[#FCFAEF] hover:text-[#007A73] text-lg px-8 py-3">
                  <Link href="/donate" className="flex items-center">
                    Make a Donation <ArrowRight size={20} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
