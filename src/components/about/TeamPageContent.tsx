import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "@/components/common/Image";
import TeamMemberDialog, {
  type TeamSpotlightMember,
} from "@/components/about/TeamMemberDialog";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";

const heroRows: Array<{
  offset: string;
  faces: Array<{ image: string; delay: number }>;
}> = [
  {
    offset: "lg:pr-1 xl:pr-2 2xl:pr-4",
    faces: [
      { image: "/images/team/brian-fleischer.jpeg", delay: 0 },
      { image: "/images/team/esi-bon-berkoh.jpg", delay: 0.05 }
    ]
  },
  {
    offset: "lg:pr-4 xl:pr-8 2xl:pr-12",
    faces: [
      { image: "/ucc-team/getwell_ebiram_essuman.JPG", delay: 0.1 },
      { image: "/ucc-team/david_konadu_kombate.JPG", delay: 0.15 },
      { image: "/images/team/nana-ama-ocran.jpeg", delay: 0.2 }
    ]
  },
  {
    offset: "lg:pr-8 xl:pr-14 2xl:pr-20",
    faces: [
      { image: "/images/team/afriyie-badu.jpg", delay: 0.25 },
      { image: "/images/team/prince-agyei.jpg", delay: 0.3 },
      { image: "/images/team/adwoa-danso-dodoo.jpg", delay: 0.35 },
      { image: "/ucc-team/queenster_aduse_opoku.JPG", delay: 0.4 }
    ]
  },
  {
    offset: "lg:pr-12 xl:pr-20 2xl:pr-28",
    faces: [
      { image: "/ucc-team/david_kojo_ofosu.JPG", delay: 0.45 },
      { image: "/images/team/gabrielle-nartey.JPG", delay: 0.5 },
      { image: "/ucc-team/wilfred_obeng.JPG", delay: 0.55 },
      { image: "/ucc-team/belinda_odoom.JPG", delay: 0.6 }
    ]
  },
  {
    offset: "lg:pr-16 xl:pr-28 2xl:pr-36",
    faces: [
      { image: "/ucc-team/hafiz_shaban.JPG", delay: 0.65 },
      { image: "/images/team/mighty-doffoe.jpg", delay: 0.7 },
      { image: "/images/team/dr-tuoyire.jpeg", delay: 0.75 },
      { image: "/images/team/kelvin-fiifi.jpeg", delay: 0.8 }
    ]
  },
  {
    offset: "lg:pr-20 xl:pr-36 2xl:pr-44",
    faces: [
      { image: "/ucc-team/martha_bawa.JPG", delay: 0.85 },
      { image: "/ucc-team/prince_nyarkoh.JPG", delay: 0.9 },
      { image: "/ucc-team/geraldine_cristal_apeadua_agyepong.JPG", delay: 0.95 }
    ]
  },
  {
    offset: "lg:pr-24 xl:pr-44 2xl:pr-52",
    faces: [
      { image: "/ucc-team/frederick_baffour.JPG", delay: 1.0 },
      { image: "/ucc-team/gloria_tawia_blay.JPG", delay: 1.05 }
    ]
  }
];

const executiveTeam: TeamSpotlightMember[] = [
  {
    name: "Brian Amu Fleischer, MD",
    role: "Founder & President",
    org: "Yale University",
    image: "/images/team/brian-fleischer.jpeg",
    email: "brian.fleischer@yale.edu",
    linkedin: "https://www.linkedin.com/in/brian-fleischer-md-37011010b/",
    bio: "Dr. Brian Fleischer is a visionary physician and global health leader dedicated to advancing equitable care for non-communicable diseases in underserved communities. A graduate of Yale School of Medicine and Stanford University, he founded the Akomapa Health Foundation to empower students and communities to drive sustainable solutions for hypertension, diabetes, and mental health care across Ghana and beyond—building a movement of compassionate health leaders with akomapa, a “good heart.”"
  },
  {
    name: "Esi Bon Berkoh",
    role: "Vice President",
    org: "Medical Doctor, University of Cape Coast",
    image: "/images/team/esi-bon-berkoh.jpg",
    email: "esibberkoh@gmail.com",
    linkedin: "https://linkedin.com/in/esiberkoh",
    bio: "Esi Berkoh is a final-year medical student at the University of Cape Coast School of Medical Sciences. She holds a BSc in Biology from Mount Holyoke College and an MSc in Infection, Immunity & Human Disease from the University of Leeds. As Vice President and co-founder of Akomapa Health, she coordinates clinic operations, supports leadership, and organizes community engagement programs to serve underserved communities while gaining hands-on experience and leadership training."
  },
  // {
  //   name: "Bismark Amoh",
  //   role: "Co-Founder & Research Lead",
  //   org: "David Geffen School of Medicine at UCLA",
  //   image: "/images/team/placeholder.jpg",
  //   email: "abismac@gmail.com",
  //   linkedin: "https://linkedin.com/in/bismarkamoh",
  //   bio: "Bismark Amoh leads Akomapa's research initiatives, bringing rigorous scientific methodology to evaluate and improve our healthcare programs. His work ensures that every intervention is evidence-based and continuously refined for maximum impact on community health outcomes."
  // },
  {
    name: "Afriyie Badu, MD",
    role: "Chief Operations Officer",
    org: "Primary Care Physician, University of Ghana",
    image: "/images/team/afriyie-badu.jpg",
    email: "nanabadu59@gmail.com",
    linkedin: "https://linkedin.com/in/afriyie-badu",
    bio: "Dr. Afriyie Badu oversees Akomapa's financial strategy and sustainability initiatives. With expertise in healthcare economics and resource management, he ensures that every dollar invested creates lasting value for the communities we serve.Dr. Nana Yaw Afriyie Badu is a medical doctor and a Co-founder and Chief Financial Officer (CFO) of Akomapa. In his role, he oversees the organization’s financial strategy and sustainability, ensuring that programs are effectively resourced to make a lasting community impact. He co-founded Akomapa out of a desire to transform the approach to non-communicable diseases by shifting the focus from treatment to prevention through early detection, education, and lifestyle interventions. Outside Akomapa, Dr. Badu is deeply passionate about orthopaedic surgery, sports medicine, and public health advocacy, and continues to champion initiatives that bridge healthcare access and community wellness."
  },
  {
    name: "Prince Agyei Tuffour",
    role: "Chief Technology Officer",
    org: "Software Engineer, dynaConnections Corporation",
    image: "/images/team/prince-tuffour.jpg",
    email: "prince.agyei.tuffour@gmail.com",
    linkedin: "https://linkedin.com/in/prince-agyei-tuffour",
    bio: "Prince Agyei Tuffour manages Akomapa's technology infrastructure, ensuring our digital systems support efficient operations and data management. His technical expertise enables scalable solutions for our growing organization."
  },
  {
    name: "Adwoa Danso-Dodoo",
    role: "Chief Finance Officer",
    org: "Business Analyst, McKinsey",
    image: "/images/team/adwoa-danso-dodoo.jpg",
    email: "adansododoo@gmail.com",
    linkedin: "https://www.linkedin.com/in/adwoadanso-dodoo/",
    bio: "Adwoa Danso-Dodoo brings financial acumen and operational excellence to Akomapa's finance team. Her meticulous approach to budgeting and resource allocation ensures transparency and accountability in all our financial operations.Adwoa Danso-Dodoo is a Business Analyst at McKinsey & Company and a graduate of Yale College and the Yale School of Management, where she studied Chemical Engineering and Technology Management, respectively. She serves as Associate Finance Lead at Akomapa Health Foundation, helping to manage the organization’s budget. In addition, she is helping develop the Akomapa Summer Immersion Program. Adwoa joined the team because she is passionate about Akomapa’s mission to bring care to more communities and to encourage students to lead with empathy and purpose."
  },
  // {
  //   name: "David Ofosu",
  //   role: "Chapter Co-Director, Akomapa UCC",
  //   org: "University of Cape Coast",
  //   image: "/ucc-team/david_kojo_ofosu.JPG",
  //   email: "ofosud.kojo@gmail.com",
  //   linkedin: "https://linkedin.com/in/david-kojo-ofosu-9a592a300",
  //   bio: "David Kojo Ofosu is a final year medical student at the University of Cape Coast School (UCC) of Medical Sciences. He currently serves as the Co-Director of the UCC Chapter Akomapa. In his role,  he oversees all aspects of the clinic’s operations, ensuring alignment with its mission and goals, he together with his team develop strategic plans to guide the clinic’s growth and impact. He coordinate and chair leadership team meetings, ensuring all roles collaborate effectively. He acts as the primary point of contact for external partners, and funding organizations.he address operational challenges and ensure compliance with relevant guidelines and regulations He also represent the clinic in public forums, presentations, and community events."
  // },
  {
    name: "Hafiz Shaban",
    role: "Co-Director, Akomapa UCC",
    org: "Nursing Student, University of Cape Coast",
    image: "/ucc-team/hafiz_shaban.JPG",
    email: "hafiz.shaban@stu.ucc.edu.gh",
    linkedin: "https://linkedin.com/in/akomapahealth",
    bio: "Hafiz Shaban is a final-year nursing student at the University of Cape Coast and Co-Director of the UCC chapter of Akomapa. Passionate about global health and community-based medicine, he joined the clinic to expand access to quality healthcare for underserved communities. Hafiz is committed to promoting equitable, community-centered healthcare and developing as a global health leader."
  },
  {
    name: "Sedem Dankwa",
    role: "Global Partnerships Lead",
    org: "Doctor-in-Training,Yale University",
    image: "/images/team/placeholder.jpg",
    email: "sedem.dankwa@yale.edu",
    linkedin: "https://www.linkedin.com/in/sedem-dankwa-b651401b7/",
    bio: "Sedem Dankwa builds strategic partnerships that amplify Akomapa's impact globally. Her work connects our mission with organizations, institutions, and individuals who share our commitment to equitable healthcare access."
  },
  {
    name: "Nana Ama Ocran",
    role: "Education Programming Lead",
    org: "B.A., History of Medicine &Public Health (YC '26)Yale University",
    image: "/images/team/nana-ama-ocran.jpeg",
    email: "naamaocran@gmail.com",
    linkedin: "https://www.linkedin.com/in/nana-ama-nhyira-ocran-16957626b/",
    bio: "Nana Ama Ocran is a senior at Yale University studying History of Science, Medicine & Public Health, and French. She currently serves as the Leadership Training Program Lead for Akomapa Health Foundation, US. In her role, she designs and organizes opportunities for bidirectional learning that emphasize equity, collaboration, and community-rooted approaches to care. She joined Akomapa to support youth-driven health systems and strengthen cross-continental pathways for learning and leadership."
  },
  {
    name: "Wilfred Obeng",
    role: "Clinical Standards Lead",
    org: "University of Cape Coast",
    image: "/ucc-team/wilfred_obeng.JPG",
    email: "wilfred.obeng7@gmail.com",
    linkedin: "https://www.linkedin.com/company/akomapahealth/",
    bio: "Wilfred Obeng is currently studying Medicine at the University of Cape Coast, Ghana. He serves as a Training and Standards lead with Akomapa UCC and as Clinical Standards Coordinator with Akomapa Global. He joined the project to learn about and contribute towards addressing the health problems of rural Ghanaian communities and helps with the development of training resources for volunteers and with the monitoring, evaluation, and improvement of the clinic's standards."
  },
  {
    name: "Gabrielle Nartey",
    role: "Lead Social Media Manager",
    org: "Akomapa Health Foundation",
    image: "/images/team/gabrielle-nartey.JPG",
    email: "akomapahealth@gmail.com",
    linkedin: "https://www.linkedin.com/in/gabrielle-nartey-a2456128b/",
    bio: "Gabrielle Nartey is a sophomore at Yale University studying Neuroscience on the pre-medical track. She currently serves as Lead Social Media Manager for Akomapa, where she oversees marketing across all social media platforms and works to expand the clinic’s reach and visibility on an international scale. Gabrielle joined the clinic to help bridge the gap between healthcare and access—ensuring that individuals who need care most are aware of and empowered to seek Akomapa’s services."
  },
  // {
  //   name: "Christabel Amma Buckman",
  //   role: "Development & Communications Lead",
  //   org: "David Geffen School of Medicine at UCLA",
  //   image: "/images/team/placeholder.jpg",
  //   email: "amma.buckman@akomapa.org",
  //   linkedin: "https://linkedin.com/in/amma-buckman",
  //   bio: "Amma Buckman leads development and communications efforts, crafting compelling narratives that showcase Akomapa's impact. Her strategic approach helps secure resources and partnerships that fuel our growth and expansion."
  // },
  {
    name: "Dr. Patrick Ampofo",
    role: "UG Expansion Lead",
    org: "Yale School of Public Health",
    image: "/images/team/patrick-ampofo.jpg",
    email: "#",
    linkedin: "https://linkedin.com/in/patrick-ampofo",
    bio: "Dr. Patrick Ampofo, an alumnus of UGMS and a first-year MPH student at Yale School of Public Health, currently serves as the UG expansion lead. He has a passion for bridging the gap in healthcare access disparities through evidence-based approaches and community-based interventions. In his current role, Dr. Ampofo is focused on helping establish the UG chapter of Akomapa by actively engaging key personnel and mobilizing medical students."
  },
  // {
  //   name: "Mighty Doffoe",
  //   role: "Associate Head of IT",
  //   org: "Akomapa Health Foundation",
  //   image: "/images/team/mighty-doffoe.jpg",
  //   email: "mighty.doffoe@akomapa.org",
  //   linkedin: "https://linkedin.com/in/mighty-doffoe",
  //   bio: "Mighty Doffoe is a final year Computer Science student at Bridgewater College. He currrently serves as the Associate Head of IT for Akomapa. Mighty Doffoe supports Akomapa's IT operations, maintaining systems and developing tools that streamline our workflows. His contributions ensure that technology enhances rather than hinders our mission delivery."
  // },
  {
    name: "Kelvin Fiifi Ocran",
    role: "Branding and Public Relations Lead",
    org: "Akomapa Health Foundation",
    image: "/images/team/kelvin-fiifi.jpeg",
    email: "kelvinocran17@gmail.com",
    linkedin: "https://linkedin.com/in/kelvin-ocran",
    bio: "Kelvin is a naturally creative mind who enjoys building ideas, designing brands, and exploring anything that blends art, tech, and problem solving. Calm but unpredictable in the best way, he connects with people easily, yet values trust deeply. Tall, caramel-toned, and openly expressive, he’s someone who loves good music, good food, and any space that lets him create freely. He's always learning, always experimenting, and always ready for the next project or opportunity that challenges him to grow."
  },
  {
    name: "Samuel Kumi",
    role: "Legal Affairs Lead",
    org: "Akomapa Health Foundation",
    image: "/images/team/samuel-kumi.JPG",
    email: "samuelkumik@gmail.com",
    linkedin: "https://www.linkedin.com/in/samuel-k-kumi-41627a161/", 
    bio: "Samuel Kwame Kumi, Esq. is a private legal practitioner and lecturer. Samuel has valuable experience in litigation and Alternative Dispute Resolution, notably acting as lawyer for medical professionals in medical matters. His interests span medical, IT, Intellectual Property and energy law, areas in which he has published. As Akomapa's Head of Legal, Samuel oversees corporate affairs, advises on risk, and ensures compliance. He sees Akomapa's strategic community-focused initiatives establishing it as a trailblazer in community health. "
  },
  {
    name: "Jeanelle Forson",
    role: "Immersion Program Lead",
    org: "Akomapa Health Foundation",
    image: "/images/team/jeanelle-forson.jpg",
    email: "jeanelledonkoh@gmail.com",
    linkedin: "https://www.linkedin.com/in/jeanelle-forson-rn-bn-b5680a162"
  },
  {
    name: "Bernard Mensah",
    role: "Research Lead",
    org: "Akomapa Health Foundation",
    image: "/images/team/bernard-mensah.jpg",
    email: "#",
    linkedin: "#"
  },
  {
    name: "Divina Selase Afenyo",
    role: "UG Hub Co-Lead",
    org: "Akomapa Health Foundation",
    image: "/images/team/divina-selase-afenyo.jpg",
    email: "#",
    linkedin: "#"
  },
  {
    name: "Jade Kissi",
    role: "Head of Internal Affairs",
    org: "Akomapa Health Foundation",
    image: "/images/team/jade-kissi.jpg",
    email: "#",
    linkedin: "#"
  }
];

const advisoryBoard: TeamSpotlightMember[] = [
  {
    name: "Prof. Derek Anamaale Tuoyire",
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
    name: "Emily Sheldon",
    role: "Co-Founder",
    org: "African Health Innovation Center",
    image: "/images/team/emily-sheldon.png"
  },
  {
    name: "Dr. Jeremy Schwartz",
    role: "Associate Professor of Medicine",
    org: "Yale University",
    image: "/images/team/jeremy-schwartz.jpeg"
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
    image: "/images/team/elijah-paintsil.avif"
  },
  {
    name: "Prof. Alfred Yawson",
    role: "Provost, University of Ghana College of Health Sciences",
    org: "University of Ghana",
    image: "/images/team/prof-alfred-yawson.png"
  },
  {
    name: "Freda Yawson",
    role: "Founder",
    org: "Innovate Ghana and Innovate Labs",
    image: "/images/team/freda-yawson.jpg"
  }
];

const heroStats = [
  { value: "15+", label: "Executive Leads" },
  { value: "6", label: "Academic Partners" },
  { value: "100+", label: "Volunteers Inspired" }
];

function AdvisoryCard({ member }: { member: TeamSpotlightMember }) {
  return (
    <article
      data-team-member={member.name}
      className="flex h-full flex-col border-t border-[#FCFAEF]/25 pt-5"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#2F3332]">
        <Image
          src={member.image}
          alt={`Headshot of ${member.name}, ${member.role}`}
          fill
          className="object-cover object-center"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
        />
      </div>
      <p className="mt-5 font-subheading text-xs font-bold uppercase tracking-[0.16em] text-[#F5C94D]">
        {member.org}
      </p>
      <h3 className="mt-3 font-heading text-xl font-semibold text-[#FCFAEF]">
        {member.name}
      </h3>
      <p className="mt-2 text-base leading-relaxed text-[#FCFAEF]/75">
        {member.role}
      </p>
    </article>
  );
}
export default function TeamPageContent() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <EditorialBand
        tone="teal"
        aria-labelledby="team-hero-heading"
        className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-6 xl:gap-8 2xl:gap-12">
          <div className="lg:col-span-5">
            <EditorialEyebrow tone="light">
              A team of young leaders for young people
            </EditorialEyebrow>
            <EditorialHeading
              as="h1"
              id="team-hero-heading"
              className="mt-5 max-w-3xl text-[2.25rem] text-[#FCFAEF] sm:text-[2.75rem] md:text-[3.1rem] lg:text-[2.5rem] xl:text-[2.75rem] 2xl:text-[3.1rem]"
            >
              We are a youth-powered team reimagining healthcare with heart,
              science, and shared purpose.
            </EditorialHeading>
            <EditorialLead className="mt-6 max-w-2xl text-[0.95rem] text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85 md:text-base xl:text-[1.05rem]">
              From Cape Coast to Yale and UCLA, Akomapa leaders blend academic
              rigor, community roots, and relentless hope to build a
              student-powered model of care that is ethical, joyful, and
              unstoppable.
            </EditorialLead>

            <dl className="mt-8 grid border-y border-[#FCFAEF]/25 sm:grid-cols-3">
              {heroStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`py-5 sm:px-5 ${
                    index > 0
                      ? "border-t border-[#FCFAEF]/25 sm:border-l sm:border-t-0"
                      : ""
                  }`}
                >
                  <dd className="font-heading text-2xl font-semibold text-[#FCFAEF] sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-2 font-subheading text-xs font-bold uppercase tracking-[0.16em] text-[#FCFAEF]/70">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <EditorialButton
                href="/contact"
                variant="light"
                className="text-[#0F4C5C] focus-visible:ring-[#F5C94D] sm:min-w-40"
              >
                Meet with Us
              </EditorialButton>
              <EditorialButton
                href="/get-involved"
                variant="amber"
                className="focus-visible:ring-[#F5C94D] sm:min-w-40"
              >
                Join the Movement
              </EditorialButton>
            </div>
          </div>

          <div
            data-team-node-network
            aria-hidden="true"
            className="mx-auto flex w-full max-w-md flex-col gap-2 overflow-hidden border-y border-[#FCFAEF]/20 py-5 sm:gap-3 sm:py-7 lg:col-span-7 lg:max-w-none lg:gap-3 lg:border-y-0 lg:border-l lg:py-4 lg:pl-6 xl:gap-4 xl:pl-8 2xl:gap-5 2xl:pl-10"
          >
            {heroRows.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className={`flex min-w-0 items-center justify-end gap-1.5 sm:gap-2 ${row.offset}`}
              >
                {row.faces.map((face, faceIndex) => (
                  <div
                    key={`${face.image}-${faceIndex}`}
                    className="flex min-w-0 items-center gap-1.5 sm:gap-2"
                  >
                    <div
                      data-team-node-portrait
                      className="relative size-7 shrink-0 overflow-hidden rounded-full border border-[#FCFAEF]/35 bg-[#0F4C5C] sm:size-9 lg:size-10 xl:size-12 2xl:size-16"
                    >
                      <Image
                        src={face.image}
                        alt=""
                        width={64}
                        height={64}
                        className="h-full w-full object-cover object-center"
                        sizes="(max-width: 639px) 28px, (max-width: 1023px) 36px, (max-width: 1279px) 40px, (max-width: 1535px) 48px, 64px"
                      />
                    </div>
                    {faceIndex !== row.faces.length - 1 ? (
                      <span className="h-px w-3 shrink-0 border-t border-dotted border-[#FCFAEF]/40 sm:w-5 lg:w-6 xl:w-9 2xl:w-12" />
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="02"
        aria-labelledby="executive-team-heading"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Executive Team
            </EditorialEyebrow>
            <EditorialHeading id="executive-team-heading" className="mt-4">
              The builders behind the Akomapa model
            </EditorialHeading>
          </div>
          <EditorialLead className="max-w-3xl lg:col-span-7 lg:pt-8">
            Each leader blends academic excellence, community credibility, and
            operational discipline—mentoring the next generation of ethical
            global health professionals while ensuring every clinic day reflects
            empathy, rigor, and trust.
          </EditorialLead>
        </div>

        <div className="mt-12 grid items-stretch gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {executiveTeam.map((member) => (
            <TeamMemberDialog key={member.name} member={member} />
          ))}
        </div>
      </EditorialBand>

      <EditorialBand
        tone="onyx"
        marker="03"
        aria-labelledby="advisory-board-heading"
        className="border-y border-[#66C4DC]/35"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Advisory Board
            </EditorialEyebrow>
            <EditorialHeading id="advisory-board-heading" className="mt-4">
              Global experts guiding our ethics, science, and scale
            </EditorialHeading>
          </div>
          <EditorialLead className="max-w-3xl text-[#FCFAEF]/78 dark:text-[#FCFAEF]/78 lg:col-span-7 lg:pt-8">
            Learning from global leaders sits at the heart of our model. Faculty
            and advisors from partner institutions worldwide keep Akomapa
            clinically sound, academically rigorous, and deeply community-rooted
            as we expand across regions.
          </EditorialLead>
        </div>

        <div className="mt-12 grid items-stretch gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {advisoryBoard.map((member) => (
            <AdvisoryCard key={member.name} member={member} />
          ))}
        </div>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="04"
        aria-labelledby="team-cta-heading"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <EditorialHeading id="team-cta-heading">
              Join the hearts behind the mission
            </EditorialHeading>
            <EditorialLead className="mt-5 max-w-3xl">
              We are always looking for faculty, mentors, collaborators, and
              students who believe in ethical, student-powered healthcare. Your
              expertise, story, or sponsorship could open the next door for
              patients we serve.
            </EditorialLead>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <EditorialButton
              href="/partnerships"
              className="bg-[#0F4C5C] focus-visible:ring-[#0F4C5C] dark:focus-visible:ring-[#F5C94D]"
            >
              Partner with Akomapa
            </EditorialButton>
            <EditorialButton
              href="/get-involved"
              variant="amber"
              className="focus-visible:ring-[#0F4C5C] dark:focus-visible:ring-[#F5C94D]"
            >
              Apply to Serve
            </EditorialButton>
          </div>
        </div>
      </EditorialBand>
    </div>
  );
}
