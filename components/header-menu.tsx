"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreditCard, Folder, Menu, X } from "lucide-react"
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";


function HeadeerMenu() {
  const [ open, setOpen ] = useState(false);

  const router = useRouter();

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  }
  return (
    <DropdownMenu open={open} onOpenChange={handleToggle}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" onClick={handleToggle}>
          {open ?
            <X className="w-6 h-6" /> :
            <Menu className="w-6 h-6" />
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={() => router.replace("/dashboard")}>
          <Folder className="mr-2 w-4 h-4" />
          Projects
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.replace("/payments")}>
          <CreditCard className="mr-2 w-4 h-4" />
          Billing
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default HeadeerMenu