import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoader() {
  return (
    <>
      <Card className="max-w-4xl">
        <CardContent className="relative flex flex-col justify-between gap-4 pt-2 md:flex-row md:pt-0">
          <div className="flex w-full flex-1 flex-col items-center gap-2 md:flex-row md:gap-4">
            <div className="flex-1">
              <Skeleton className="h-24 w-24 rounded-full md:h-36 md:w-36" />
            </div>

            <div className="flex w-full flex-col items-center gap-1 md:items-start">
              <Skeleton className="h-7 w-full max-w-52" />

              <Skeleton className="h-5 w-full max-w-48" />
            </div>
          </div>

          <div className="absolute right-2 top-2 md:static">
            <Skeleton className="h-10 w-10" />
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-full max-w-32" />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Skeleton className="h-5 w-full" />
        </CardContent>
      </Card>

      <Card className="max-w-4xl">
        <CardContent className="flex flex-wrap justify-center gap-4 [&>*]:w-full [&>*]:max-w-[calc(50%-1rem)] md:[&>*]:max-w-[calc(33.333%-1rem)]">
          <div className="flex flex-col items-center">
            <Skeleton className="h-5 w-full max-w-32 md:h-6" />
            <Skeleton className="mt-1 h-4 w-full max-w-40 md:h-5" />
            <Skeleton className="my-1 h-4 w-full max-w-40 md:h-5" />
          </div>
          <div className="flex flex-col items-center">
            <Skeleton className="h-5 w-full max-w-32 md:h-6" />
            <Skeleton className="mt-1 h-4 w-full max-w-40 md:h-5" />
            <Skeleton className="my-1 h-4 w-full max-w-40 md:h-5" />
          </div>
          <div className="flex flex-col items-center">
            <Skeleton className="h-5 w-full max-w-32 md:h-6" />
            <Skeleton className="mt-1 h-4 w-full max-w-40 md:h-5" />
            <Skeleton className="my-1 h-4 w-full max-w-40 md:h-5" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
