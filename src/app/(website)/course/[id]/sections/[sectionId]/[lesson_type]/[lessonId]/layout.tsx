

interface IProps {
    params : Promise<{ lesson_type: string; }>
    video: React.ReactNode
    pdf: React.ReactNode
    exam: React.ReactNode
}
const lessonTypeLayout = async ({params, video, pdf, exam} : IProps) => {

    const {lesson_type} = await params;
    const lessonType = lesson_type ;

  return (
    <>
        {lessonType === "course_video" ? video : null}
        {lessonType === "course_pdf" ? pdf : null}
        {lessonType === "course_exam" ? exam : null}
    </>
  )
}

export default lessonTypeLayout