import { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import LocationMap from "@/components/contact/LocationMap";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Akomapa Health. We'd love to hear from you regarding our programs, partnerships, or general inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      <section className="bg-[#C37B1E]/50 dark:bg-[#1C1F1E] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <PageHeader
            title="Contact Us"
            description="Have questions or want to learn more about our healthcare programs? We'd love to hear from you."
          />
        </div>
      </section>
      
      <section className="py-16 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#2F3332] dark:text-[#FCFAEF]">Get In Touch</h2>
              <p className="text-[#2F3332]/80 dark:text-[#FCFAEF]/80 mb-8">
                Please fill out the form with your information and we'll get back to you as soon as possible.
                Whether you have questions about our programs, want to volunteer, or discuss potential partnerships,
                we're here to help.
              </p>
              
              <ContactForm />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#2F3332] dark:text-[#FCFAEF]">Our Information</h2>
              
              <div className="bg-white dark:bg-[#2F3332] rounded-xl shadow-sm border border-[#C1C3C3] dark:border-[#4F5554] p-6 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-[#007A73] dark:text-[#63B0AC] mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium text-lg mb-1 text-[#2F3332] dark:text-[#FCFAEF]">Main Office</h3>
                      <p className="text-[#2F3332]/80 dark:text-[#FCFAEF]/80">
                        Department of Community Medicine<br />
                        School of Medical Sciences<br />
                        PMB, University of Cape Coast<br />
                        Cape Coast, Ghana<br />
                        +233 20 954 4834
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-[#007A73] dark:text-[#63B0AC] mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium text-lg mb-1 text-[#2F3332] dark:text-[#FCFAEF]">Phone</h3>
                      <p className="text-[#2F3332]/80 dark:text-[#FCFAEF]/80">
                        <a href="tel:+233209544834" className="hover:text-[#C37B1E] dark:hover:text-[#F3C677] transition-colors">
                        +233 20 954 4834
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-[#007A73] dark:text-[#63B0AC] mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium text-lg mb-1 text-[#2F3332] dark:text-[#FCFAEF]">Email</h3>
                      <p className="text-[#2F3332]/80 dark:text-[#FCFAEF]/80">
                        <a href="mailto:akomapahealth@gmail.com" className="hover:text-[#C37B1E] dark:hover:text-[#F3C677] transition-colors">
                          akomapahealth@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-[#007A73] dark:text-[#63B0AC] mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium text-lg mb-1 text-[#2F3332] dark:text-[#FCFAEF]">Hours</h3>
                      <p className="text-[#2F3332]/80 dark:text-[#FCFAEF]/80">
                        Monday - Friday: 8:00 AM - 5:00 PM<br />
                        Saturday: 9:00 AM - 1:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden h-80 shadow-sm border border-[#C1C3C3] dark:border-[#4F5554]">
                <LocationMap />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}