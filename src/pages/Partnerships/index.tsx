import Navbar from '@/components/LoggedNavbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

interface PartnershipsProps {
  user1: string;
  user2: string;
  daysTogether: number;
}

const PartnershipsPage: React.FC<PartnershipsProps> = ({ user1, user2, daysTogether }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#B1D690]">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-[#654321]">
          {user1} and {user2} have been together for...
        </h1>
        <div className="mt-4">
          <div className="flex flex-col items-center">
            <div className="relative w-80 h-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="absolute top-0 left-0 w-full h-full fill-[#FFA24C]"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-6xl font-nunito">
                {daysTogether}
              </div>
            </div>

            <span className="text-2xl font-bold text-[#654321]">days</span>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <button
            className="bg-[#FF77B7] text-white px-6 py-2 rounded hover:bg-[#FF4081] transition-colors"
            onClick={() => alert(`Are you sure you want to end the relationship after ${daysTogether} days? What a shame...`)}
          >
            End Relationship
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PartnershipsPage;
