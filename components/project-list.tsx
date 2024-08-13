import { InferSelectModel } from "drizzle-orm";
import { projects } from "@/db/schema";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { Lock } from "lucide-react";

type Project = InferSelectModel<typeof projects>;

type ProjectListProps = {
  projects: Project[];
}

const ProjectList = (props: ProjectListProps) => {
  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 m-5 p-4">
        {props.projects.map((project: Project) => (
          <li key={project.id}>
            <Card className="max-w-[350px] flex flex-col h-full">
              <CardHeader className="flex-1">
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={`/projects/${project.id}`}>
                  <Button>View Project</Button>
                </Link>
              </CardFooter>
            </Card>
          </li>
        ))}
        <Card className="max-w-[350px] flex flex-col h-full bg-gray-300">
          <CardHeader className="flex-1 gap-2">
            <CardTitle className="flex items-center gap-2 text-sm md:text-lg">
              <Lock className="w-4 h-4 md:w-8 md:h-8" />
              <span>Upgrade to Premium</span>
            </CardTitle>
            <CardDescription>Unlock unlimited projects</CardDescription>
          </CardHeader>
          <div className="w-fit mx-auto">
            <Button className="w-full bg-indigo-700 mb-4" disabled>Subscribe</Button>
          </div>
        </Card>
      </ul>
    </div>
  )
}

export default ProjectList