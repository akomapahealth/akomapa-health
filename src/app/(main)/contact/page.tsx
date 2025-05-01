import { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import LocationMap from "@/components/contact/LocationMap";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Akomapa Health Foundation. We'd love to hear from you regarding our programs, partnerships, or general inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      <section className="bg-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <PageHeader
            title="Contact Us"
            description="Have questions or want to learn more about our healthcare programs? We'd love to hear from you."
          />
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Please fill out the form with your information and we'll get back to you as soon as possible.
                Whether you have questions about our programs, want to volunteer, or discuss potential partnerships,
                we're here to help.
              </p>
              
              <ContactForm />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Information</h2>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-teal-600 mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium text-lg mb-1">Main Office</h3>
                      <p className="text-gray-600">
                        123 Healthcare Avenue<br />
                        Accra, Ghana<br />
                        GA-123-4567
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-teal-600 mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium text-lg mb-1">Phone</h3>
                      <p className="text-gray-600">
                        <a href="tel:+233123456789" className="hover:text-teal-600">
                          +233 123 456 789
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-teal-600 mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium text-lg mb-1">Email</h3>
                      <p className="text-gray-600">
                        <a href="mailto:info@akomapahealthfoundation.org" className="hover:text-teal-600">
                          info@akomapahealthfoundation.org
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-teal-600 mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium text-lg mb-1">Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 8:00 AM - 5:00 PM<br />
                        Saturday: 9:00 AM - 1:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden h-80 shadow-sm border border-gray-200">
                <LocationMap />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}