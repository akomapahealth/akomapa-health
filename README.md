# Akomapa Health

A modern, responsive website for Akomapa Health Foundation - a healthcare-focused organization dedicated to improving health outcomes and access to quality healthcare in Ghana.

## 🏥 About the Project

Akomapa Health is a student-powered initiative focused on improving access to preventive healthcare services. This website serves as the digital platform for the organization, featuring:

- **Program Information**: Detailed descriptions of healthcare programs and initiatives
- **Volunteer Recruitment**: Student volunteer application system
- **Newsletter Signup**: Email subscription for updates and opportunities
- **Contact System**: Web3Forms integration for inquiries
- **Resource Library**: Educational materials and healthcare resources

## ✨ Features

### 🎨 **Modern Design**

- Responsive design that works on all devices
- Dark/Light theme support
- Beautiful animations and transitions
- Accessible UI components

### 📝 **Content Management**

- Dynamic program pages with detailed information
- Blog/News section for updates
- Resource library with downloadable materials
- Team member profiles

### 🤝 **Volunteer System**

- Student volunteer application form
- Airtable integration for application management
- Multi-step validation and progress tracking
- Team preference and availability selection

### 📧 **Communication Tools**

- Newsletter signup with MailerLite integration
- Contact form with Web3Forms
- Email notifications and confirmations

### 🔧 **Technical Features**

- Next.js 15+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Form validation with Zod
- API integrations (Airtable, MailerLite, Web3Forms)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd akomapa
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```bash
   # MailerLite (Newsletter)
   MAILERLITE_API_KEY=your_mailerlite_api_key

   # Web3Forms (Contact Form)
   NEXT_PUBLIC_WEB3FORMS_API_KEY=your_web3forms_api_key

   # Airtable (Volunteer Applications)
   AIRTABLE_API_KEY=your_airtable_api_key
   AIRTABLE_BASE_ID=your_airtable_base_id

   # ImageKit (Image Optimization)
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_url
   NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key

   # Stripe (Donations)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main layout pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── common/           # Shared components
│   ├── contact/          # Contact form components
│   ├── layout/           # Layout components
│   ├── shared/           # Shared UI components
│   └── ui/               # Shadcn/ui components
├── data/                 # Static data and content
├── lib/                  # Utility functions
└── styles/               # Global styles
```

## 🔧 API Integrations

### MailerLite (Newsletter)

- Automatic subscriber management
- Email campaign integration
- Subscription tracking

### Web3Forms (Contact Form)

- Spam protection
- Email notifications
- Form validation

### Airtable (Volunteer Applications)

- Application data storage
- Team management interface
- Status tracking system

### Stripe (Donations)

- Secure payment processing
- Donation tracking
- Receipt generation

## 🎨 Design System

The project uses a custom design system with:

- **Primary Colors**: Teal (#007A73) and Gold (#C37B1E)
- **Typography**: Work Sans, DM Sans, and Bree Serif
- **Components**: Shadcn/ui component library
- **Icons**: Lucide React icons

## 📱 Responsive Design

The website is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔒 Security Features

- Environment variable protection
- API key security
- Form validation and sanitization
- CORS protection
- Rate limiting

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions about the project or Akomapa Health Foundation:

- **Email**: akomapahealth@gmail.com
- **Website**: [akomapahealth.org](https://akomapahealth.org)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Shadcn/ui for the component library
- All volunteers and contributors to Akomapa Health Foundation
