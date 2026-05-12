import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"

export function StatisticsSkeleton() {
    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-8 w-16" />
                            </div>
                            <Skeleton className="size-6 rounded-md" />
                        </CardHeader>
                        <CardFooter>
                            <Skeleton className="h-4 w-48" />
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Charts */}
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[250px] w-full rounded-xl" />
                </CardContent>
            </Card>

            {/* Last Students & Enrollments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Array.from({ length: 2 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Skeleton className="size-5 rounded-md" />
                                <Skeleton className="h-5 w-40" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <div key={j} className="p-4 rounded-lg border space-y-2">
                                        <div className="flex justify-between items-start">
                                            <Skeleton className="h-5 w-32" />
                                            <Skeleton className="h-5 w-10 rounded-full" />
                                        </div>
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-3 w-36" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}