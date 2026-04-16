import Image from "@/components/common/Image";

export default function DonateHero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 opacity-20">
        <Image src="/highlights/Akomapa-73.jpg" alt="Akomapa health volunteers with community members" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white/60 p-8 backdrop-blur-sm dark:bg-[#1C1F1E]/60 md:p-10">
          <h1 className="mb-4 text-4xl font-bold text-lapis md:text-5xl">
            Give health. Build hope.
          </h1>
          <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7]">
            Your donation powers student-led clinics, life-saving screenings, and training for future health leaders in Ghana.
          </p>
        </div>
      </div>
    </section>
  );
}
