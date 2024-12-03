import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/post')({
  component: RouteComponent,
  beforeLoad: () => ({ title: "Post" }),
})

function RouteComponent() {
  return <div>Hello "/post"!</div>
}
