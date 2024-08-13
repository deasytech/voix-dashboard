import CopyButton from "@/components/copy-button";

const Page = ({ params }: { params: { projectId: string } }) => {
  if (!params.projectId) return (<h1>Invalid Project ID</h1>);
  if (!process.env.WIDGET_URL) return (<h1>Widget URL is missing.</h1>);

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold">Start Collecting Feedback</h1>
      <p className="text-lg text-secondary-foreground">Embed the code in your website</p>
      <div className="bg-blue-950 text-white p-6 rounded-md relative">
        <CopyButton text={`<my-widget projectId="${params.projectId}"></my-widget><script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`} />
        <code>
          {`<my-widget project-id="${params.projectId}"></my-widget>`}<br />
          {`<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
        </code>
      </div>
    </div>
  )
}

export default Page