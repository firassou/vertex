"use client";

import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Badge } from "../components/ui/Badge";
import { StatusIndicator } from "../components/ui/StatusIndicator";
import { ProgressBar } from "../components/ui/ProgressBar";
import { CourseCard } from "../components/cards/CourseCard";
import { VideoLessonCard } from "../components/cards/VideoLessonCard";
import { LessonCard } from "../components/cards/LessonCard";
import { ResourceCard } from "../components/cards/ResourceCard";
import { NavBar } from "../components/nav/NavBar";
import { Breadcrumbs } from "../components/nav/Breadcrumbs";
import { Pagination } from "../components/nav/Pagination";

const primaryColors = [
  { name: "Primary 500", hex: "#F97316", cls: "bg-primary-500" },
  { name: "Primary 400", hex: "#FB923C", cls: "bg-primary-400" },
  { name: "Primary 300", hex: "#FDBA74", cls: "bg-primary-300" },
  { name: "Primary 200", hex: "#FED7AA", cls: "bg-primary-200" },
  { name: "Primary 100", hex: "#FFEEE5", cls: "bg-primary-100" },
];

const neutralColors = [
  { name: "Neutral 900", hex: "#0F172A", cls: "bg-neutral-900" },
  { name: "Neutral 700", hex: "#33415C", cls: "bg-neutral-700" },
  { name: "Neutral 500", hex: "#64748B", cls: "bg-neutral-500" },
  { name: "Neutral 300", hex: "#CBD5E1", cls: "bg-neutral-300" },
  { name: "Neutral 200", hex: "#E2E8F0", cls: "bg-neutral-200" },
  { name: "Neutral 100", hex: "#F1F5F9", cls: "bg-neutral-100" },
  { name: "Neutral 50", hex: "#FAFAFC", cls: "bg-neutral-50 border border-neutral-200" },
  { name: "White", hex: "#FFFFFF", cls: "bg-white border border-neutral-200" },
];

const typeScale = [
  { label: "Display 1", cls: "font-display text-display-1", sample: "Page titles" },
  { label: "Display 2", cls: "font-display text-display-2", sample: "Section titles" },
  { label: "Heading 1", cls: "font-sans text-heading-1 font-semibold", sample: "Card titles" },
  { label: "Heading 2", cls: "font-sans text-heading-2 font-semibold", sample: "Sub section" },
  { label: "Heading 3", cls: "font-sans text-heading-3 font-medium", sample: "Small titles" },
  { label: "Body Large", cls: "font-sans text-body-lg", sample: "Body copy" },
  { label: "Body", cls: "font-sans text-body", sample: "Supporting text" },
  { label: "Small", cls: "font-sans text-small", sample: "Captions, meta" },
];

const radii = [
  { name: "xs", cls: "rounded-xs" },
  { name: "sm", cls: "rounded-sm" },
  { name: "md", cls: "rounded-md" },
  { name: "lg", cls: "rounded-lg" },
  { name: "xl", cls: "rounded-xl" },
  { name: "full", cls: "rounded-full" },
];

const shadows = [
  { name: "sm", cls: "shadow-sm" },
  { name: "md", cls: "shadow-md" },
  { name: "lg", cls: "shadow-lg" },
  { name: "xl", cls: "shadow-xl" },
];

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-6">
      <h2 className="mb-4 text-heading-2 font-semibold text-neutral-900">
        <span className="mr-2 text-primary-500">{number}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function StyleGuidePage() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-1 flex-col">
      <NavBar />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6">
        <div>
          <h1 className="font-display text-display-1 font-bold text-neutral-900">
            Design System
          </h1>
          <p className="mt-2 max-w-xl text-body-lg text-neutral-500">
            A unified design language for Vertex learning platform. Clean,
            modern and focused on clarity, consistency and intuitive learning
            experiences.
          </p>
        </div>

        <Section number="01" title="Colors">
          <p className="mb-2 text-small font-medium uppercase text-neutral-500">
            Primary
          </p>
          <div className="mb-6 flex flex-wrap gap-4">
            {primaryColors.map((c) => (
              <div key={c.name} className="w-28">
                <div className={`h-16 w-full rounded-md ${c.cls}`} />
                <p className="mt-2 text-body text-neutral-900">{c.name}</p>
                <p className="text-small text-neutral-500">{c.hex}</p>
              </div>
            ))}
          </div>
          <p className="mb-2 text-small font-medium uppercase text-neutral-500">
            Neutral
          </p>
          <div className="flex flex-wrap gap-4">
            {neutralColors.map((c) => (
              <div key={c.name} className="w-28">
                <div className={`h-16 w-full rounded-md ${c.cls}`} />
                <p className="mt-2 text-body text-neutral-900">{c.name}</p>
                <p className="text-small text-neutral-500">{c.hex}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section number="03" title="Type Scale">
          <div className="flex flex-col divide-y divide-neutral-100">
            {typeScale.map((t) => (
              <div key={t.label} className="flex items-baseline justify-between gap-4 py-3">
                <span className={t.cls}>Ag {t.label}</span>
                <span className="whitespace-nowrap text-small text-neutral-500">
                  {t.sample}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section number="05" title="Radius & Shadows">
          <div className="mb-6 flex flex-wrap gap-6">
            {radii.map((r) => (
              <div key={r.name} className="text-center">
                <div className={`h-16 w-16 bg-primary-100 ${r.cls}`} />
                <p className="mt-2 text-small text-neutral-500">{r.name}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-6">
            {shadows.map((s) => (
              <div
                key={s.name}
                className={`flex h-16 w-24 items-center justify-center rounded-md bg-white text-small text-neutral-500 ${s.cls}`}
              >
                {s.name}
              </div>
            ))}
          </div>
        </Section>

        <Section number="07" title="Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Get Started</Button>
            <Button variant="secondary">Explore Courses</Button>
            <Button variant="tertiary" icon="external">
              View Lesson
            </Button>
            <Button variant="text" icon="play">
              Watch Video
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Button variant="primary" disabled>
              Get Started
            </Button>
            <Button variant="secondary" disabled>
              Explore Courses
            </Button>
            <Button variant="tertiary" icon="external" disabled>
              View Lesson
            </Button>
            <Button variant="text" icon="play" disabled>
              Watch Video
            </Button>
          </div>
        </Section>

        <Section number="08" title="Inputs">
          <div className="flex max-w-sm flex-col gap-4">
            <Input placeholder="Search anything..." shortcut="⌘K" />
            <Select defaultValue="relevant">
              <option value="relevant">Most Relevant</option>
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
            </Select>
          </div>
        </Section>

        <Section number="09" title="Badges / Tags">
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="video">Video</Badge>
            <Badge variant="lesson">Lesson</Badge>
            <Badge variant="popular">Popular</Badge>
          </div>
        </Section>

        <Section number="10" title="Status / Indicators">
          <div className="flex flex-wrap items-center gap-6">
            <StatusIndicator status="in-progress" />
            <StatusIndicator status="completed" />
            <StatusIndicator status="now-playing" />
            <StatusIndicator status="locked" />
          </div>
        </Section>

        <Section number="11" title="Progress Bar">
          <div className="max-w-sm">
            <ProgressBar percent={35} />
          </div>
        </Section>

        <Section number="12" title="Cards">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <CourseCard
              title="Next.js for Production"
              description="Build scalable, high-performance web applications with Next.js."
              level="Intermediate"
              duration="18h 24m"
              moduleCount={12}
              avatarLabel="N"
            />
            <VideoLessonCard
              title="Data Fetching in Server Components"
              description="Learn how to fetch data on the server using async/await and Next.js best practices."
              lessonLabel="Lesson 5.1"
              duration="12:45"
              startLabel="Watch from 12:45"
            />
            <LessonCard
              title="Data Fetching & Caching"
              description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance."
              moduleLabel="Module 5"
            />
            <ResourceCard
              title="Caching and Revalidation Guide"
              description="Deep dive into Next.js caching strategies."
              meta="PDF · 1.2 MB"
            />
          </div>
        </Section>

        <Section number="13" title="Navigation">
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-2 text-small font-medium uppercase text-neutral-500">
                Breadcrumbs
              </p>
              <Breadcrumbs
                items={[
                  { label: "All Courses", href: "/courses" },
                  { label: "Next.js for Production", href: "/courses/nextjs" },
                  { label: "Data Fetching & Caching" },
                ]}
              />
            </div>
            <div>
              <p className="mb-2 text-small font-medium uppercase text-neutral-500">
                Pagination
              </p>
              <Pagination currentPage={page} totalPages={8} onPageChange={setPage} />
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
