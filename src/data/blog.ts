import type { BlogPost } from "@/lib/types";

type BlogCategory = BlogPost["category"];

/**
 * Single source of truth for blog categories: display label, short filter
 * label, and the brand-tinted badge classes used on cards and article headers.
 * Ordered as they should appear in the category filter.
 */
export const BLOG_CATEGORIES: {
  value: BlogCategory;
  label: string;
  filterLabel: string;
  badgeClassName: string;
}[] = [
  {
    value: "student-essay",
    label: "Student Essay",
    filterLabel: "Student Essays",
    badgeClassName:
      "bg-[#0097b2]/12 text-[#036576] dark:bg-[#0097b2]/25 dark:text-[#66C4DC]",
  },
  {
    value: "faculty-reflection",
    label: "Faculty Reflection",
    filterLabel: "Faculty Reflections",
    badgeClassName:
      "bg-[#eeba2b]/20 text-[#8a6a09] dark:bg-[#eeba2b]/20 dark:text-[#F5C94D]",
  },
  {
    value: "article",
    label: "Article",
    filterLabel: "Articles",
    badgeClassName:
      "bg-[#0F4C5C]/12 text-[#0F4C5C] dark:bg-[#0F4C5C]/40 dark:text-[#8fd6e4]",
  },
  {
    value: "community-voice",
    label: "Community Voice",
    filterLabel: "Community Voices",
    badgeClassName:
      "bg-[#b4552d]/12 text-[#a1481f] dark:bg-[#b4552d]/25 dark:text-[#e9a986]",
  },
  {
    value: "recorded-talk",
    label: "Recorded Talk",
    filterLabel: "Recorded Talks",
    badgeClassName:
      "bg-[#2F3332]/10 text-[#2F3332] dark:bg-white/12 dark:text-[#E6E7E7]",
  },
  {
    value: "conference-session",
    label: "Conference Session",
    filterLabel: "Conference Sessions",
    badgeClassName:
      "bg-[#7a5195]/12 text-[#654183] dark:bg-[#7a5195]/28 dark:text-[#cbb4de]",
  },
];

const CATEGORY_BY_VALUE = new Map(
  BLOG_CATEGORIES.map((category) => [category.value, category]),
);

/** Resolve the display label for a category value (e.g. "Student Essay"). */
export function getCategoryLabel(value: BlogCategory): string {
  return CATEGORY_BY_VALUE.get(value)?.label ?? value;
}

/** Resolve the badge classes for a category value. */
export function getCategoryBadgeClass(value: BlogCategory): string {
  return CATEGORY_BY_VALUE.get(value)?.badgeClassName ?? "";
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "what-ethical-leadership-means-to-me",
    title: "What Ethical Leadership Means to Me",
    excerpt:
      "A first-year scholar reflects on the moment a blood-pressure cuff taught her more about leadership than any lecture ever had.",
    author: "Ama Serwaa Boateng",
    authorRole: "Academy Scholar",
    authorInstitution: "University of Cape Coast",
    authorBio:
      "Ama is a third-year medical student at the University of Cape Coast and a scholar in the Akomapa Ethical Leadership Academy. She helps coordinate the UCC Community Health Hub and writes about the everyday practice of care.",
    category: "student-essay",
    tags: ["ethical-leadership", "student-perspective", "academy"],
    image: "/highlights/Akomapa-20.jpg",
    date: "2026-05-24",
    featured: true,
    content: `
<p>I used to think leadership was something you were given — a title, a badge, a seat at the front of the room. My first afternoon at the community hub taught me otherwise.</p>
<p>A man in his sixties sat down across from me. He had walked forty minutes to reach us, not because he felt unwell, but because a neighbour had told him we would "check the pressure of the blood." When the cuff tightened around his arm, he looked away, embarrassed, and said quietly that no one had ever measured it before.</p>
<h2>Care begins with listening</h2>
<p>Nothing in my coursework had prepared me for that quiet. The number on the monitor mattered — it was high, and it needed attention — but what he needed first was to be taken seriously. To be asked about his work, his sleep, the salt in his soup. To be treated as a partner in his own health rather than a problem to be solved.</p>
<blockquote>Ethical leadership is not the authority to act on people's behalf. It is the discipline to act <em>with</em> them.</blockquote>
<h2>The habits we practice</h2>
<p>Over the following weeks I began to notice the small disciplines that separated good intentions from good care:</p>
<ul>
  <li>Explaining a diagnosis in the language someone actually speaks at home.</li>
  <li>Asking permission before touching, measuring, or advising.</li>
  <li>Following up — because a referral no one can afford to reach is not a plan.</li>
</ul>
<p>None of these are dramatic. None of them will appear on an exam. But together they are the difference between a service that arrives and a partnership that lasts.</p>
<p>I am still learning what ethical leadership means. What I know now is that it is built in these ordinary moments — one honest conversation, one kept promise at a time.</p>
`.trim(),
  },
  {
    id: "2",
    slug: "good-intentions-are-not-enough",
    title: "Good Intentions Are Not Enough: Rethinking Global Health Education",
    excerpt:
      "For decades we have sent well-meaning people into communities without asking whether the model itself was sound. A faculty mentor makes the case for a different approach.",
    author: "Dr. Kwabena Mensah",
    authorRole: "Faculty Mentor, Public Health",
    authorInstitution: "University of Ghana",
    authorBio:
      "Dr. Mensah is a public health physician and faculty mentor with the Akomapa Ethical Leadership Academy. His work focuses on community-based models for non-communicable disease care and the ethics of global health training.",
    category: "faculty-reflection",
    tags: ["ethical-leadership", "global-health", "education"],
    image: "/highlights/Akomapa-40.jpg",
    date: "2026-04-18",
    featured: false,
    content: `
<p>Every year, thousands of students travel across borders in the name of global health. They arrive with energy, compassion, and a genuine wish to help. And every year, a quieter question goes unasked: what happens to the community after they leave?</p>
<h2>The limits of goodwill</h2>
<p>Goodwill is necessary, but it is not a method. A short-term project that screens hundreds of people and then disappears can do real harm — raising expectations it cannot meet, and teaching communities that outsiders come, take their photographs, and go.</p>
<p>The problem is rarely the people. It is the design. We have built an entire ecosystem of global health experience around the needs of the visitor rather than the health of the visited.</p>
<blockquote>If a program cannot survive the departure of the students who started it, it was never really about the community.</blockquote>
<h2>Designing for what remains</h2>
<p>A different approach starts from a single commitment: build things that stay. At Akomapa that means three disciplines we ask every scholar to hold:</p>
<ul>
  <li><strong>Continuity</strong> — care that follows a patient across months, not a single afternoon.</li>
  <li><strong>Local ownership</strong> — communities and partner institutions who lead, not simply host.</li>
  <li><strong>Reciprocity</strong> — students who expect to learn as much as they contribute.</li>
</ul>
<p>None of this diminishes the idealism that brings young people to this work. It gives that idealism a structure worthy of it. Good intentions are where we begin. They are not where we are allowed to stop.</p>
`.trim(),
  },
  {
    id: "3",
    slug: "the-silent-epidemic-ncds-new-model-of-care",
    title: "The Silent Epidemic: Why NCDs Demand a New Model of Care",
    excerpt:
      "Hypertension and diabetes now kill more people than infectious disease in much of the world — yet the systems built to catch them were designed for a different era.",
    author: "Akomapa Research Team",
    authorRole: "Research & Innovation",
    authorInstitution: "Akomapa Health",
    authorBio:
      "The Akomapa Research & Innovation team studies how student-powered community hubs can improve the detection and long-term management of non-communicable diseases.",
    category: "article",
    tags: ["ncds", "hypertension", "diabetes", "health-systems"],
    image: "/highlights/Akomapa-28.jpg",
    date: "2026-03-09",
    featured: false,
    content: `
<p>They rarely announce themselves. A raised blood pressure produces no fever, no cough, no pain — until, years later, it produces a stroke. This is why non-communicable diseases, or NCDs, are so often called the silent epidemic.</p>
<h2>A quiet reversal</h2>
<p>Across much of sub-Saharan Africa, the leading causes of death have quietly shifted. Conditions like hypertension, diabetes, and heart disease now sit alongside — and increasingly ahead of — the infectious diseases that health systems were built to fight.</p>
<p>The infrastructure has not caught up. Clinics designed for acute, episodic illness struggle with conditions that require patience, continuity, and trust over years.</p>
<blockquote>You cannot treat a lifelong condition with a system built for a single visit.</blockquote>
<h2>What a community model changes</h2>
<p>A community-based model answers the specific shape of the NCD problem:</p>
<ul>
  <li><strong>Prevention and screening</strong> reach people where they are, before symptoms force a crisis.</li>
  <li><strong>Referral</strong> connects the newly diagnosed to facilities equipped to confirm and treat.</li>
  <li><strong>Longitudinal care</strong> keeps a relationship alive between visits, so a diagnosis becomes a plan rather than a scare.</li>
</ul>
<p>Students, working alongside faculty and community partners, are uniquely suited to this work. They have the time to listen, the training to measure, and — crucially — the continuity of a hub that returns week after week.</p>
<p>The epidemic is silent. Our response does not have to be.</p>
`.trim(),
  },
  {
    id: "4",
    slug: "what-partnership-really-means-a-community-elder",
    title: "What Partnership Really Means: A Community Elder Speaks",
    excerpt:
      "\"We have had visitors before,\" she told us. \"You are the first who asked what we wanted.\" A conversation about trust, memory, and being treated as a partner.",
    author: "Naa Adjeley Ankrah",
    authorRole: "Community Leader",
    authorInstitution: "Partner Community, Cape Coast",
    authorBio:
      "Naa Adjeley Ankrah is a community elder and organiser who has helped host and shape the Akomapa Community Health Hub in her neighbourhood.",
    category: "community-voice",
    tags: ["community-partnership", "trust", "reciprocal-learning"],
    image: "/gallery/gallery-pic-6.jpg",
    date: "2026-02-14",
    featured: false,
    content: `
<p>When the students first came to speak with us, I did not expect much. We have had visitors before. They measure things, they take photographs, and then the road is quiet again.</p>
<h2>A different first question</h2>
<p>But these ones began differently. Before they set up a single table, they sat with us and asked what <em>we</em> wanted. Not what they had come to give — what we needed. That is a small thing to say and a large thing to do.</p>
<blockquote>You are the first who asked what we wanted. That is why we opened our doors.</blockquote>
<p>Partnership is not a word you can put on a banner. It is whether you return. It is whether the young woman who checked my neighbour's sugar remembers his name the following month. It is whether, when we raise a concern, anything actually changes.</p>
<h2>What we offer in return</h2>
<p>People imagine a community only receives. That is not how it works here. We teach these students things no classroom can:</p>
<ul>
  <li>How to speak to an elder so that he will listen.</li>
  <li>Which households are struggling and which will quietly go without.</li>
  <li>How trust is built slowly and lost in a single broken promise.</li>
</ul>
<p>If they keep coming, and keep listening, they will leave here better healers than they arrived. That is the exchange. That is partnership.</p>
`.trim(),
  },
  {
    id: "5",
    slug: "reciprocal-learning-in-practice",
    title: "Reciprocal Learning in Practice",
    excerpt:
      "A recorded conversation between faculty and scholars on what it means to learn from the communities we serve — and why the direction of that learning matters.",
    author: "Akomapa Academy",
    authorRole: "Ethical Leadership Academy",
    authorInstitution: "Akomapa Health",
    authorBio:
      "The Akomapa Ethical Leadership Academy trains students and emerging health professionals to lead through community partnership, reflection, and reciprocal learning.",
    category: "recorded-talk",
    tags: ["reciprocal-learning", "academy", "ethical-leadership"],
    image: "/highlights/Akomapa-47.jpg",
    videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    date: "2026-01-20",
    featured: false,
    content: `
<p>In this recorded session, Academy faculty and scholars sit down to unpack one of the ideas at the heart of the Akomapa model: that learning in global health should move in both directions.</p>
<h2>The conversation in brief</h2>
<p>Too often, "training" describes a one-way transfer — expertise flowing from the institution to the community. Reciprocal learning insists on something harder and more honest: that the community is also a teacher, and that the student who cannot learn from it is not yet ready to serve it.</p>
<blockquote>The question is not only what we bring to a community, but what we are willing to be changed by.</blockquote>
<h2>What you will hear</h2>
<ul>
  <li>How scholars describe the moments that reshaped how they practice.</li>
  <li>Why faculty treat humility as a clinical skill, not a personality trait.</li>
  <li>Practical ways hubs build reflection into every visit.</li>
</ul>
<p>Watch the full conversation above, and read the companion essays from our scholars to see these ideas at work in the field.</p>
`.trim(),
  },
];

/** All posts, newest first. */
export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/** The most recent featured post, or the most recent post as a fallback. */
export function getFeaturedPost(): BlogPost | undefined {
  const sorted = getAllBlogPosts();
  return sorted.find((post) => post.featured) ?? sorted[0];
}

/** Find a single post by its slug. */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/**
 * Related posts for a given slug: same category first (newest first),
 * backfilled with other recent posts up to `limit`.
 */
export function getRelatedPosts(
  slug: string,
  category: BlogCategory,
  limit = 3,
): BlogPost[] {
  const others = getAllBlogPosts().filter((post) => post.slug !== slug);
  const sameCategory = others.filter((post) => post.category === category);
  const rest = others.filter((post) => post.category !== category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Ordered categories that actually appear in the current post set. */
export function getActiveCategories() {
  const present = new Set(blogPosts.map((post) => post.category));
  return BLOG_CATEGORIES.filter((category) => present.has(category.value));
}
