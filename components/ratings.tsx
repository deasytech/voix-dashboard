import { cn } from '@/lib/utils';
import { StarIcon } from 'lucide-react'
import React from 'react'

const Ratings = ({ rating, count }: { rating: number; count: number }) => {
  return (
    <div className="flex items-center gap-2">
      {[ ...Array(5) ].map((_, index) => (
        <StarIcon
          key={index}
          className={cn(
            "h-5 w-5",
            rating > index
              ? "fill-primary"
              : "fill-muted stroke-muted-foreground"
          )}
        />
      ))}
    </div>
  )
}

export default Ratings