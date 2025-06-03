// app/page.tsx
import Link from "next/link"

export default function Home() {
  return (
    <div className="header">
      <h1 className="display-3 text-warning">You have been served!</h1>
      <h2 className="text-muted mb-4">Welcome to CookStore</h2>
      <Link href="/list" className="btn">Start Cooking</Link>
    </div>
  );
}
