import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-wide py-24 text-center">
      <div className="wine-seal !w-24 !h-24 text-4xl mx-auto">404</div>
      <h1 className="heading-serif text-5xl text-cream mt-6">Page not found</h1>
      <div className="gold-divider mx-auto" />
      <p className="text-muted mt-4 max-w-md mx-auto">
        The bottle you're looking for seems to have been uncorked elsewhere.
        Let's get you back to the cellar.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="btn-gold">Back to home</Link>
        <Link href="/products" className="btn-ghost">Browse wines</Link>
      </div>
    </div>
  );
}
