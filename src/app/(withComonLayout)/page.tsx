import { subtitle, title } from "@/src/components/primitives";
import Link from "next/link";

export default async function Home() {
  return (
    <section
      className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 bg-cover bg-center"
      style={{ backgroundImage: 'url("/path-to-your-garden-bg-image.jpg")' }}
    >
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Grow&nbsp;</span>
        <span className={title({ color: "green" })}>your dream&nbsp;</span>
        <br />
        <span className={title()}>
          garden with <span className={title({ color: "green" })}>expert </span>
          tips and <span className={title({ color: "green" })}>community </span>
          support.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Join a thriving community of gardening enthusiasts, access premium
          content, and share your passion for nature.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href="/dashboard"
          className="bg-green-600 px-8 py-3 rounded-full no-underline text-white hover:brightness-90"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
