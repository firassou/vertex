import Link from "next/link";
import { ArrowRight, Box, Star } from "lucide-react";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";
import { CourseCard } from "./components/cards/CourseCard";

const courses = [
  {
    title: "Next.js for Production",
    description:
      "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    moduleCount: 12,
    avatarLabel: "N",
    avatarClassName: "bg-neutral-900 text-white",
  },
  {
    title: "Docker Essentials",
    description:
      "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    moduleCount: 8,
    avatarLabel: null,
    avatarClassName: "bg-sky-500 text-white",
  },
  {
    title: "TypeScript Deep Dive",
    description: "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    moduleCount: 10,
    avatarLabel: "TS",
    avatarClassName: "bg-blue-600 text-white",
  },
];

const bars = [24, 40, 64, 48, 32, 20, 56, 72, 44, 60, 36, 28];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-neutral-50">
      <section className="mx-auto w-full max-w-3xl px-4 py-24 text-center sm:px-6">
        <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-100 px-3 py-1 text-small font-semibold uppercase tracking-wide text-primary-500">
          Intelligent Learning
        </span>
        <h1 className="mt-6 font-display text-display-2 font-bold text-neutral-900 sm:text-display-1">
          Search your learning
          <br />
          in plain English.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-body-lg text-neutral-500">
          Vertex understands what you want to learn and finds the exact
          lessons across all your courses.
        </p>
        <div className="mt-8 flex justify-center">
          <Button variant="primary" icon={<ArrowRight size={16} strokeWidth={2} />}>
            Explore Courses
          </Button>
        </div>
        <form action="/search" className="mx-auto mt-8 max-w-xl">
          <Input
            name="q"
            shortcut="⌘K"
            placeholder="Ask anything about your learning..."
          />
        </form>
      </section>

      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-heading-1 font-bold text-neutral-900">
              All Courses
            </h2>
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-body font-medium text-primary-500 hover:text-primary-400"
            >
              View all courses
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course.title}
                title={course.title}
                description={course.description}
                level={course.level}
                duration={course.duration}
                moduleCount={course.moduleCount}
                avatarLabel={
                  course.avatarLabel ?? (
                    <Box size={20} strokeWidth={2} />
                  )
                }
                avatarClassName={course.avatarClassName}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 border-t border-neutral-200 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 text-body text-neutral-500 sm:px-6">
          <Star size={16} strokeWidth={2} className="text-primary-500" />
          New courses and lessons added every week.
        </div>
      </section>

      <div
        aria-hidden="true"
        className="flex h-40 items-end justify-center gap-3 overflow-hidden border-t border-neutral-200 bg-linear-to-b from-transparent to-primary-100 px-4 sm:gap-4"
      >
        {bars.map((height, index) => (
          <div
            key={index}
            style={{ height: `${height}%` }}
            className="w-6 rounded-t-sm bg-linear-to-t from-primary-500 to-primary-200 opacity-70 sm:w-10"
          />
        ))}
      </div>
    </div>
  );
}
