import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
}

export function LoadingSpinner({ className, size = "md", ...props }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        className
      )}
      {...props}
    >
      <Loader2
        className={cn(
          "animate-spin text-muted-foreground",
          {
            "h-4 w-4": size === "sm",
            "h-8 w-8": size === "md",
            "h-12 w-12": size === "lg",
          }
        )}
      />
    </div>
  )
}

export { Skeleton } from "./skeleton"

