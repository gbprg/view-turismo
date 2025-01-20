import { cn } from "@/app/utils/lib"

export const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  )
}