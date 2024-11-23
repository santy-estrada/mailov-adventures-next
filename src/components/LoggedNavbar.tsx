import Link from 'next/link';

const LoggedNavbar = () => (
  <nav className="bg-[#FEEC37] text-white p-4 font-nunito">
    <div className="container mx-auto flex justify-between items-center">
      <Link href="/partnerships" className="text-xl font-bold text-[#FF77B7]">
        Mailov Adventures
      </Link>
      <div className="space-x-4">
        <Link href="/activities" className="text-[#654321] hover:underline">
          Activities
        </Link>
        <Link href="/date-idea" className="text-[#654321] hover:underline">
          Date Ideas
        </Link>
        {/* <Link href="/restaurants" className="text-[#654321] hover:underline">
          Restaurants
        </Link>
        <Link href="/questions" className="text-[#654321] hover:underline">
          Questions
        </Link>
        <Link href="/pets" className="text-[#654321] hover:underline">
          Pet
        </Link>
        <Link href="/movies" className="text-[#654321] hover:underline">
          Movies
        </Link>
        <Link href="/facts" className="text-[#654321] hover:underline">
          Facts
        </Link> */}
      </div>
    </div>
  </nav>
);

export default LoggedNavbar;
