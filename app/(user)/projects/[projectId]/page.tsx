import { getProject } from "@/actions/projects.action"
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Code, Globe } from "lucide-react";
import Link from "next/link";

const Page = async ({ params }: { params: { projectId: string } }) => {
  const project = await getProject(params.projectId);

  return (
    <div>
      <div>
        <Link href="/dashboard" className="flex items-center gap-2 text-indigo-700 hover:text-indigo-800 mb-5 w-fit">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-lg">Back to Projects</span>
        </Link>
      </div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-3">{project.name}</h1>
          <h2 className="text-gray-700 text-xl mb-2">{project.description}</h2>
        </div>
        <div className="flex flex-col gap-2 items-end">
          {project.url ?
            <Link href={project.url} target="_blank">
              <Button variant="link" className="border gap-2 text-indigo-700">
                <Globe className="w-4 h-4" />
                Visit site
              </Button>
            </Link> : null}
          <Link href={`/projects/${params.projectId}/instructions`} className="flex items-center gap-2">
            <Button variant="link" className="border gap-2 text-indigo-700">
              <Code className="w-4 h-4" /> Embed code
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Table data={project.projectFeedbacks} />
      </div>
    </div>
  )
}

export default Page