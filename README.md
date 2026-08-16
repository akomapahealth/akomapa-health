# Akomapa Health Foundation

A modern, responsive website for Akomapa Health Foundation - a student-powered healthcare organization dedicated to improving health outcomes and access to quality healthcare in Ghana through innovative programs and sustainable initiatives.

## 🛠️ Tech Stack

<div align="center">

### 🎨 **Frontend & Design**

![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### 💳 **Payments & Forms**

![Givebutter](https://img.shields.io/badge/Givebutter-FDBA2D?style=for-the-badge)
![Web3Forms](https://img.shields.io/badge/Web3Forms-00C4CC?style=for-the-badge&logo=web3forms&logoColor=white)
![Airtable](https://img.shields.io/badge/Airtable-18BFFF?style=for-the-badge&logo=airtable&logoColor=white)

### 📧 **Communication & Media**

![MailerLite](https://img.shields.io/badge/MailerLite-009EFA?style=for-the-badge&logo=mailerlite&logoColor=white)
![ImageKit](https://img.shields.io/badge/ImageKit-1389FD?style=for-the-badge&logo=imagekit&logoColor=white)

### 🚀 **Deployment**

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

## 🏥 About Akomapa Health Foundation

Akomapa Health Foundation is a student-powered initiative focused on improving access to preventive healthcare services in underserved communities across Ghana. Our comprehensive website serves as the digital platform for the organization, featuring:

- **Healthcare Programs**: Detailed descriptions of 8 current programs and 2 future initiatives
- **Donation & Partnership System**: Config-gated Givebutter checkout plus verified MTN Mobile Money giving in Ghana
- **Volunteer Recruitment**: Student volunteer application system with Airtable integration
- **Newsletter Signup**: Email subscription for updates and opportunities
- **Contact System**: Web3Forms integration for inquiries and notifications
- **Resource Library**: Educational materials and healthcare resources
- **3-Year Roadmap**: Interactive timeline showcasing strategic vision and goals

## ✨ Website Features

### 🎨 **Modern Design & User Experience**

- **Responsive design** that works seamlessly on all devices
- **Dark/Light theme support** with smooth transitions
- **Beautiful animations** and micro-interactions using Framer Motion
- **Accessible UI components** following WCAG guidelines
- **Brand-consistent design** using custom color palette (Teal #007A73, Gold #C37B1E)
- **Interactive elements** with hover states and feedback

### 💰 **Donation & Partnership System**

- **Givebutter-hosted checkout** for processor-confirmed online donations
- **Typed provider configuration** with an explicit verification and rollout gate
- **One-time gifts and monthly giving** through one shared Form campaign
- **Processor-managed receipts, thank-you messages, and recurring plans**
- **Verified MTN Mobile Money instructions** for manual donations in Ghana
- **No custom card-data collection or donor-attested completion flow**
- **Corporate sponsorship** opportunities

### 📝 **Content Management**

- **Dynamic program pages** with detailed information and interactive cards
- **News/Blog section** for updates and stories
- **Resource library** with downloadable materials and filtering
- **Team member profiles** with custom ImageKit integration
- **Gallery component** with category filtering and "show more" functionality

### 🤝 **Volunteer System**

- **Student volunteer application form** with multi-step validation
- **Airtable integration** for application management and tracking
- **Team preference selection** and availability scheduling
- **Progress tracking** and status updates
- **Form validation** with Zod schema

### 📧 **Communication Tools**

- **Newsletter signup** with MailerLite integration
- **Contact form** with Web3Forms for reliable delivery
- **Email notifications** for website inquiries
- **Givebutter-managed donation receipts and thank-you emails** for online gifts
- **Multi-channel communication** options

### 🗺️ **Strategic Roadmap**

- **Interactive 3-year roadmap** (2025-2028) with phase navigation
- **Visual timeline** showcasing strategic milestones
- **Phase-specific goals** and achievements
- **Engaging animations** and transitions
- **Call-to-action integration** for partnership opportunities

## 🎨 Design System

The website uses a comprehensive design system with:

### **Color Palette**

- **Primary Teal**: #007A73 (main brand color)
- **Primary Gold**: #C37B1E (accent color)
- **Dark Gray**: #1C1F1E (text and backgrounds)
- **Light Cream**: #FCFAEF (light backgrounds)
- **Supporting Colors**: Various shades for different states

### **Typography**

- **Primary Font**: Work Sans (headings and body)
- **Secondary Font**: DM Sans (UI elements)
- **Accent Font**: Bree Serif (special elements)

### **Components**

- **Shadcn/ui component library** for consistency
- **Custom components** for specific functionality
- **Responsive design** patterns
- **Accessibility features** built-in

## 📱 Responsive Design

The website is fully responsive and optimized for:

- **Desktop** (1200px+): Full feature set with multi-column layouts
- **Tablet** (768px - 1199px): Adapted layouts with touch-friendly interactions
- **Mobile** (320px - 767px): Mobile-first design with optimized navigation

## 🧪 Testing

### E2E Tests

This project includes comprehensive end-to-end tests using Playwright to ensure the homepage works correctly across all browsers and devices.

![E2E Tests](https://github.com/akomapahealth/akomapa-health/workflows/E2E%20Tests/badge.svg)

**Test Coverage:**
- Responsive design across 8 viewport sizes (mobile, tablet, desktop)
- Interactive features (carousels, counters, modals, galleries)
- Content verification and accessibility
- Cross-browser compatibility (Chrome, Firefox, Safari)
- Visual regression testing

**Run Tests:**
```bash
# Run all tests
npm run test:e2e

# Run tests in UI mode (recommended)
npm run test:e2e:ui

# Run specific test suites
npm run test:e2e:responsive
npm run test:e2e:interactive
npm run test:e2e:content
```

**Test Documentation:**
- See `e2e/README.md` for detailed documentation
- See `e2e/DEPLOYMENT_GUIDE.md` for online test deployment options
- See `e2e/SETUP_GITHUB_ACTIONS.md` for GitHub Actions setup
- Repository: [https://github.com/akomapahealth/akomapa-health](https://github.com/akomapahealth/akomapa-health)

## 🔒 Security & Privacy

- **Environment variable protection** for sensitive data
- **API key security** with proper server-side handling
- **Form validation** and input sanitization
- **CORS protection** for API endpoints
- **Rate limiting** for form submissions
- **Hosted payment entry** so raw card and bank data are handled by Givebutter
- **GDPR compliance** with data handling practices
- **Sentry privacy controls** documented in [`docs/observability/sentry.md`](docs/observability/sentry.md)

## 📞 Contact

For questions about Akomapa Health Foundation:

- **Email**: info@akomapa.org
- **Website**: [akomapahealth.org](https://akomapahealth.org)
- **Partnership Inquiries**: [Partner With Us](/partner)
- **Get Involved**: [Explore Engagement Pathways](/get-involved)

## 🙏 Acknowledgments

- **Next.js team** for the amazing framework and App Router
- **Vercel** for hosting and deployment infrastructure
- **Shadcn/ui** for the comprehensive component library
- **Givebutter** for hosted donation checkout and processor-confirmed receipts
- **Web3Forms** for reliable form handling
- **Framer Motion** for smooth animations
- **All volunteers and contributors** to Akomapa Health Foundation
- **Student volunteers** who power our healthcare initiatives

## 🌟 Recent Updates

### Version 2.0 (Current)

- ✅ **Config-gated Givebutter donation integration** pending organizational verification
- ✅ **Interactive roadmap page** with 3-year strategic vision
- ✅ **Enhanced partner page** with comprehensive partnership options
- ✅ **Improved programs page** with card-based layout
- ✅ **Givebutter-managed receipts and recurring-plan support**
- ✅ **Enhanced UI/UX** with better animations and interactions
- ✅ **Responsive design** improvements across all pages
- ✅ **Accessibility enhancements** for better user experience

### Version 1.0 (Previous)

- ✅ Basic website structure and navigation
- ✅ Volunteer application system
- ✅ Newsletter signup functionality
- ✅ Contact form integration
- ✅ Resource library implementation
