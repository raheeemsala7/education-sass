import { RenderDescription } from "@/shared/components/rich-text-editor/RenderDescription"
import { buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"
import { FolderArchive, PenLine } from "lucide-react"
import Link from "next/link"
import { ICourse } from "../types/course"



export function CourseCard({
    id,
    title,
    description,
    thumbnail,
    price,
    is_free,
    is_enrolled,
    created_at,
    updated_at

}: ICourse) {


    return (
        <div className="w-full max-w-[450px] md:max-w-full">
            {/* Image Container */}
            <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-lg">
                <img src={thumbnail || "/placehlder.svg"} alt={title} className="w-full h-full object-cover" />
            </div>

            {/* Glass Card - Positioned to overlap image */}
            <div className="-mt-4 px-5 rounded-2xl relative z-5">
                <div className=" w-full relative rounded-2xl overflow-hidden clr-text-primary px-4 py-6 shadow-large--oblique hover-shadow-larg group-hover:shadow-large smooth border border-slate-300 dark:border-slate-800">
                    <div className="absolute rounded-2xl bg-white/50 dark:bg-slate-950/50 smooth inset-0 backdrop-blur-[4px]"></div>
                    <div className="relative z-10 ">
                        <div className="flex flex-col space-y-6">
                            <div className="flex relative items-center  justify-between  sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse" style={{ direction: "rtl" }}>
                                <div className="flex flex-col space-y-4 w-full text-start">
                                    <div className="font-bold text-xl pr-3">{title}</div>
                                    <div className="w-full h-0.5 rounded-lg smooth bg-primary dark:bg-airForceBlue-600"></div>
                                    <div className="text-secondary-foreground text-xs sm:text-sm">

                                        <RenderDescription description={description} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-col relative flex space-y-3">
                                <div className="px-10">
                                    <div className="w-full h-0.25 bg-secondary "></div>
                                </div>
                                <div className="flex justify-between flex-row-reverse items-center">
                                    {is_free ?
                                        <div className={cn(buttonVariants(), "bg-gradient-to-r from-rose-500 to-purple-500 text-white rounded-full px-3 py-1 flex-center-both")}>
                                            كورس مجاني
                                        </div>
                                        :
                                        <div className="bg-primary text-slate-100 rounded-lg py-1 px-2 space-x-2 text-sm">
                                            <span className="bg-white text-primary  px-2 py-px rounded-md text-sm font-bold ">{price}</span>
                                            <span>جنيهًا</span>
                                        </div>
                                    }
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <FolderArchive className="size-3 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">{created_at}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <PenLine className="size-3 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">{updated_at}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex  items-end gap-3">
                                    <Link href={`/course/${id}`} className={cn(buttonVariants({ variant: "outline" }), "flex-1 !px-2 rounded-2xl text-sm !bg-transparent border-1 !border-primary ")} >الدخول للكورس</Link>
                                    {!is_enrolled ?
                                        is_free ? <>
                                        <div className={cn(buttonVariants(), "bg-gradient-to-r from-rose-500 to-purple-500 text-white rounded-full px-3 py-1 flex-center-both")}>
                                            كورس مجاني
                                        </div>
                                    </> :
                                        <Link href={`/course/${id}/subscribe`} className={cn(buttonVariants(), "bg-primary flex-1 px-5 text-sm rounded-2xl")} >اشترك الآن !</Link>


                                        : ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


