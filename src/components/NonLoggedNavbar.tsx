import Link from 'next/link';

const NonLoggedNavbar = () => (
  <nav className="bg-[#FEEC37] text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-[#FF77B7]">
        Mailov Adventures
      </Link>
      <div className="space-x-4">
        <Link href="/auth" className="text-[#654321] hover:underline">
          Login
        </Link>
        <Link href="/auth/register" className="text-[#654321] hover:underline">
          Sign Up
        </Link>
      </div>

    </div>
  </nav>
);

export default NonLoggedNavbar;
