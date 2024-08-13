import { getUserProjects } from "@/actions/projects.action";
import { getSubscription } from "@/actions/users.action";
import NewProject from "@/components/new-project";
import ProjectList from "@/components/project-list";
import { maxFreeProjects } from "@/lib/payments";
import { auth } from "@clerk/nextjs/server";

const Page = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const userProjects = await getUserProjects(userId);

  const subscribed = await getSubscription(userId);

  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        <h1 className="text-3xl font-bold my-4">Project List</h1>
        {subscribed !== true && userProjects.length > maxFreeProjects ? null : <NewProject />}
      </div>
      {!subscribed ? <ProjectList projects={userProjects} /> : null}
    </div>
  )
}

export default Page