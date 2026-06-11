import ListAdminCards from '@/features/course/_components/list-admin-cards'
import { buttonVariants } from '@/shared/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

const page = () => {

    return (
        <div>
            <div className="flex justify-between items-center">
                <h4 className='text-2xl font-semibold'>كورساتك</h4>
                <Link href={"/admin/courses/create"} className={buttonVariants({
                    className: "text-sm font-semibold"
                })}>
                    <PlusCircle className=' font-semibold' />
                    إضافة كورس جديد
                </Link>
            </div>

             <Suspense fallback={<div>Loading...</div>}>
                <ListAdminCards />
            </Suspense>
        </div>
    )
}

export default page