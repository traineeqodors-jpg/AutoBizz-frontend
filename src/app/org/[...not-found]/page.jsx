import { notFound } from "next/navigation";

export default function CatchAllPost() {
  // This forces Next.js to trigger the closest 'not-found.js'
  notFound();
}
