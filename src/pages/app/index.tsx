import Link from "next/link";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <span className="text-indigo-600 italic cursor-pointer">
        <Link href="/">Go back</Link>
      </span>
    </div>
  );
}

export default Home;
