import ComponentStructure from '@/features/chapter/_components/component-structure'

interface PageProps {
  params:  Promise<{
    id: string;
  }>
}

const page = async ({ params }: PageProps) => {
  const { id: courseId } = await  params

  return (
    <ComponentStructure courseId={courseId} />
  )
}

export default page