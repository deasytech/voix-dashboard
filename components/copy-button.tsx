"use client"

import { Check, Clipboard } from "lucide-react"
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react";


const CopyButton = ({ text }: { text: string }) => {
  const [ copied, setCopied ] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
    })
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={() => copyToClipboard(text)} size="icon" className="gap-2 absolute right-0 top-0">
            {!copied ? <Clipboard className="w-4 h-4" /> :
              <Check className="w-4 h-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? "Code copied" : "Copy code"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CopyButton