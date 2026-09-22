import { defineQuery } from 'next-sanity'

const instructorSummaryProjection = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  photo,
  expertise
`

const categorySummaryProjection = /* groq */ `
  _id,
  title,
  "slug": slug.current
`

const lessonSummaryProjection = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  poster,
  duration,
  freePreview,
  studentCount
`

export const COURSES_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    instructor->{ ${instructorSummaryProjection} },
    category->{ ${categorySummaryProjection} },
    "moduleCount": count(modules),
    "lessonCount": count(modules[].lessons[])
  }
`)

export const COURSE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "course" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    learningOutcomes[]{
      icon,
      title,
      description
    },
    instructor->{ ${instructorSummaryProjection}, bio },
    category->{ ${categorySummaryProjection} },
    modules[]{
      _key,
      title,
      summary,
      lessons[]->{ ${lessonSummaryProjection} }
    }
  }
`)

export const LESSON_BY_SLUG_QUERY = defineQuery(`
  *[_type == "lesson" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    poster,
    duration,
    freePreview,
    studentCount,
    notes,
    keyPoints,
    proTip,
    resources[]{
      _key,
      type,
      title,
      description,
      url
    },
    "course": *[_type == "course" && references(^._id)][0]{
      _id,
      title,
      "slug": slug.current,
      modules[]{
        _key,
        title,
        "lessons": lessons[]->{ _id, title, "slug": slug.current }
      }
    }
  }
`)

export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "instructor" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    photo,
    expertise,
    bio,
    "courses": *[_type == "course" && references(^._id)]{
      _id,
      title,
      "slug": slug.current,
      coverImage,
      level
    }
  }
`)

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`)
