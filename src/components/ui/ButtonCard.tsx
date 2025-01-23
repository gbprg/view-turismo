import { cn } from "@/app/utils/lib"

export const ButtonCard = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
}