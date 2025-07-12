"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Users, 
  Stethoscope, 
  Heart, 
  Shield, 
  ArrowRight,
  Calendar,
  CheckCircle,
  Building,
  Car,
  Bus,
  Wifi,
  Car as Parking,
  Accessibility as Wheelchair
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import Image from "@/components/common/Image";

const clinicServices = [
  {
    icon: Stethoscope,
    title: "Primary Care",
    description: "Comprehensive health assessments, preventive care, and treatment for common illnesses.",
    features: ["Health screenings", "Vaccinations", "Chronic disease management", "Health education"]
  },
  {
    icon: Heart,
    title: "Cardiovascular Care",
    description: "Specialized care for heart health, including screenings and preventive measures.",
    features: ["Blood pressure monitoring", "Heart health assessments", "Lifestyle counseling", "Risk factor evaluation"]
  },
  {
    icon: Users,
    title: "Student Health Services",
    description: "Dedicated healthcare services for University of Cape Coast students and staff.",
    features: ["Student health checkups", "Mental health support", "Sports medicine", "Emergency care"]
  },
  {
    icon: Shield,
    title: "Community Outreach",
    description: "Extending healthcare services to surrounding communities through mobile clinics.",
    features: ["Mobile health units", "Community health education", "Vaccination drives", "Health awareness campaigns"]
  }
];

const clinicHours = [
  { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 3:00 PM" },
  { day: "Sunday", hours: "Emergency Services Only" },
  { day: "Public Holidays", hours: "9:00 AM - 2:00 PM" }
];

const facilities = [
  { icon: Wifi, name: "Free Wi-Fi", description: "High-speed internet access for patients and visitors" },
  { icon: Parking, name: "Free Parking", description: "Convenient parking spaces available on campus" },
  { icon: Wheelchair, name: "Accessibility", description: "Wheelchair accessible facilities and ramps" },
  { icon: Bus, name: "Public Transport", description: "Easy access via public transportation routes" },
  { icon: Building, name: "Modern Facilities", description: "State-of-the-art medical equipment and clean environment" },
  { icon: Car, name: "Emergency Access", description: "24/7 emergency vehicle access and ambulance services" }
];

const teamMembers = [
  {
    name: "Dr. Kwame Asante",
    role: "Medical Director",
    specialization: "Internal Medicine",
    experience: "15+ years",
    image: "/images/team/doctor-1.jpg"
  },
  {
    name: "Dr. Sarah Mensah",
    role: "Senior Physician",
    specialization: "Family Medicine",
    experience: "12+ years",
    image: "/images/team/doctor-2.jpg"
  },
  {
    name: "Nurse Grace Addo",
    role: "Head Nurse",
    specialization: "Primary Care Nursing",
    experience: "10+ years",
    image: "/images/team/nurse-1.jpg"
  },
  {
    name: "Dr. Michael Osei",
    role: "Resident Physician",
    specialization: "Community Medicine",
    experience: "5+ years",
    image: "/images/team/doctor-3.jpg"
  }
];

export default function UCCClinicPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

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
              <span className="text-[#007A73] dark:text-[#63B0AC] font-medium">Our First Clinic</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-6"
            >
              Akomapa Health - UCC
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#2F3332] dark:text-[#E6E7E7] mb-8"
            >
              Located at the University of Cape Coast, our flagship clinic provides comprehensive healthcare services 
              to students, faculty, staff, and the surrounding community.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                className="bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] text-lg px-8 py-3"
                onClick={() => scrollToSection('contact')}
              >
                <span className="flex items-center">
                  Book Appointment <ArrowRight size={20} className="ml-2" />
                </span>
              </Button>
              <Button 
                variant="outline" 
                className="border-[#007A73] text-[#007A73] hover:bg-[#007A73] hover:text-[#FCFAEF] dark:border-[#63B0AC] dark:text-[#63B0AC] dark:hover:bg-[#63B0AC] text-lg px-8 py-3"
                onClick={() => scrollToSection('services')}
              >
                <span className="flex items-center">
                  Our Services <ArrowRight size={20} className="ml-2" />
                </span>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Clinic Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#C37B1E] dark:text-[#F3C677] font-bold text-lg mb-2">
                ABOUT OUR CLINIC
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Excellence in Healthcare
              </h3>
              <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] mb-6">
                Established in 2025, the Akomapa Health Clinic at the University of Cape Coast represents our commitment 
                to providing accessible, quality healthcare services. Our clinic serves as a model for community-based 
                healthcare delivery, combining academic excellence with practical medical care.
              </p>
              <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-8">
                We offer comprehensive medical services, from routine checkups to specialized care, ensuring that 
                students, faculty, staff, and community members have access to the healthcare they need. Our 
                student-led approach provides valuable hands-on experience while delivering quality care.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#007A73] dark:text-[#63B0AC] mb-2">5000+</div>
                  <div className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">Patients Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#007A73] dark:text-[#63B0AC] mb-2">15+</div>
                  <div className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">Healthcare Professionals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#007A73] dark:text-[#63B0AC] mb-2">24/7</div>
                  <div className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">Emergency Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#007A73] dark:text-[#63B0AC] mb-2">100%</div>
                  <div className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">Patient Satisfaction</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white dark:bg-[#2F3332] rounded-2xl p-8 shadow-lg">
                <h4 className="text-xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">Clinic Highlights</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#007A73] dark:text-[#63B0AC] mr-3" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">State-of-the-art medical equipment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#007A73] dark:text-[#63B0AC] mr-3" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">Experienced healthcare professionals</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#007A73] dark:text-[#63B0AC] mr-3" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">Student-led care with supervision</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#007A73] dark:text-[#63B0AC] mr-3" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">Affordable healthcare services</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#007A73] dark:text-[#63B0AC] mr-3" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">Community outreach programs</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#007A73] dark:text-[#63B0AC] mr-3" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">Research and innovation focus</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#C37B1E] dark:text-[#F3C677] font-bold text-lg mb-2">
              OUR SERVICES
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
              Comprehensive Healthcare
            </h3>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7]">
              We provide a wide range of medical services to meet the diverse healthcare needs of our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {clinicServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#2F3332] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-[#007A73]/10 dark:bg-[#63B0AC]/10 rounded-xl flex items-center justify-center mb-6">
                  <service.icon size={32} className="text-[#007A73] dark:text-[#63B0AC]" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {service.title}
                </h3>
                
                <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-[#007A73] dark:text-[#63B0AC] mr-2">•</span>
                      <span className="text-[#2F3332] dark:text-[#E6E7E7] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#C37B1E] dark:text-[#F3C677] font-bold text-lg mb-2">
              OUR TEAM
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
              Meet Our Healthcare Professionals
            </h3>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7]">
              Our dedicated team of healthcare professionals is committed to providing the highest quality care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#2F3332] rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="w-20 h-20 bg-[#007A73]/10 dark:bg-[#63B0AC]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={32} className="text-[#007A73] dark:text-[#63B0AC]" />
                </div>
                <h4 className="font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-1">
                  {member.name}
                </h4>
                <p className="text-sm text-[#007A73] dark:text-[#63B0AC] mb-2">
                  {member.role}
                </p>
                <p className="text-xs text-[#2F3332] dark:text-[#E6E7E7] mb-2">
                  {member.specialization}
                </p>
                <p className="text-xs text-[#2F3332] dark:text-[#E6E7E7]">
                  {member.experience} experience
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#C37B1E] dark:text-[#F3C677] font-bold text-lg mb-2">
              FACILITIES & AMENITIES
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
              Modern Healthcare Environment
            </h3>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7]">
              Our clinic is equipped with modern facilities to ensure comfort and convenience for all patients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#2F3332] rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-[#007A73]/10 dark:bg-[#63B0AC]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <facility.icon size={24} className="text-[#007A73] dark:text-[#63B0AC]" />
                </div>
                <h4 className="font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">
                  {facility.name}
                </h4>
                <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                  {facility.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#C37B1E] dark:text-[#F3C677] font-bold text-lg mb-2">
              PATIENT TESTIMONIALS
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
              What Our Patients Say
            </h3>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7]">
              Hear from our patients about their experience at the Akomapa Health Clinic.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#2F3332] rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-[#007A73] dark:text-[#63B0AC]">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact & Hours Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#C37B1E] dark:text-[#F3C677] font-bold text-lg mb-2">
                CONTACT & HOURS
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Visit Our Clinic
              </h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-[#007A73] dark:text-[#63B0AC] mt-1 mr-4" />
                  <div>
                    <h4 className="font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-1">Location</h4>
                    <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                      Department of Community Medicine<br />
                      School of Medical Sciences<br />
                      University of Cape Coast<br />
                      Cape Coast, Ghana
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-[#007A73] dark:text-[#63B0AC] mt-1 mr-4" />
                  <div>
                    <h4 className="font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-1">Phone</h4>
                    <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                      <a href="tel:+233209544834" className="hover:text-[#007A73] dark:hover:text-[#63B0AC] transition-colors">
                        +233 20 954 4834
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-[#007A73] dark:text-[#63B0AC] mt-1 mr-4" />
                  <div>
                    <h4 className="font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-1">Email</h4>
                    <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                      <a href="mailto:akomapahealth@gmail.com" className="hover:text-[#007A73] dark:hover:text-[#63B0AC] transition-colors">
                        akomapahealth@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              
              <Button className="bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] text-lg px-8 py-3">
                <Link href="/contact" className="flex items-center">
                  Book Appointment <ArrowRight size={20} className="ml-2" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#2F3332] rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <Clock className="w-6 h-6 text-[#007A73] dark:text-[#63B0AC] mr-3" />
                <h3 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">Operating Hours</h3>
              </div>
              
              <div className="space-y-4">
                {clinicHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <span className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">{schedule.day}</span>
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-[#007A73]/10 dark:bg-[#63B0AC]/10 rounded-lg">
                <h4 className="font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">Emergency Services</h4>
                <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                  Emergency services are available 24/7. For urgent medical attention outside regular hours, 
                  please call our emergency line or visit the nearest hospital.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                Ready to Experience Quality Healthcare?
              </h2>
              <p className="text-lg text-[#FCFAEF]/90 mb-8 max-w-2xl mx-auto">
                Join thousands of patients who trust Akomapa Health Clinic for their healthcare needs. 
                Book your appointment today and experience the difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#C37B1E] hover:bg-[#63B0AC] dark:hover:bg-[#63B0AC] text-[#FCFAEF] text-lg px-8 py-3">
                  <Link href="/contact" className="flex items-center">
                    <Calendar size={20} className="mr-2" />
                    Book Appointment
                  </Link>
                </Button>
                <Button variant="outline" className="border-[#FCFAEF] text-[#1C1F1E] hover:bg-[#FCFAEF] hover:text-[#007A73] text-lg px-8 py-3">
                  <Link href="/contact" className="flex items-center">
                    <Phone size={20} className="mr-2" />
                    Call Us
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
