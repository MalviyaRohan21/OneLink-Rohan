import HeroForm from "@/components/forms/HeroForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <section className="pt-32">
        <div className="max-w-l mb-8">
        <h1 className="text-6xl font-bold mx-auto">
          OneLink, One stop Solution for all your Links!
        </h1>
        <h2 className="text-gray-500 text-xl mt-6">
          Share your links, social profiles, contact info,<br/>product links and more on one page
        </h2>
        </div>
        <HeroForm user={session?.user} />
      </section>
    </main>   
  )
}
