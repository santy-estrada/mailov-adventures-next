'use client';

import Navbar from '@/components/LoggedNavbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import { GET_USER_PARTNERSHIP } from '@/api/user';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

const PartnershipsPage = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [showNoPartnership, setShowNoPartnership] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);

      const userIdFromStorage = sessionStorage.getItem('userId');
      const accessTokenFromStorage = sessionStorage.getItem('accessToken');
      console.log('userIdFromStorage', userIdFromStorage);
      console.log('accessTokenFromStorage', accessTokenFromStorage);

      if (userIdFromStorage) {
        setUserId(Number(userIdFromStorage));
      }

      if (accessTokenFromStorage) {
        setAccessToken(accessTokenFromStorage);
      } else {
        console.log('No access token found');
      }
    }
  }, []);

  const { data, loading, error } = useQuery(GET_USER_PARTNERSHIP, {
    variables: { userId: userId ?? 0 },
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    },
    skip: !userId || !accessToken,
  });

  const [daysTogether, setDaysTogether] = useState<number | null>(null);

  useEffect(() => {
    if (data?.getUserPartnershipDetails?.length > 0) {
      const partnership = data.getUserPartnershipDetails[0]; // Get the first partnership
      sessionStorage.setItem('partnershipId', partnership.id);
      const partnershipDate = new Date(Number(partnership.startDate));
      const today = new Date();
      const timeDiff = today.getTime() - partnershipDate.getTime();
      setDaysTogether(Math.floor(timeDiff / (1000 * 3600 * 24)));
    } else if (!loading && !error) {
      const timeout = setTimeout(() => {
        window.location.href = '/partnerships/none';
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [data, loading, error]);

  if (!isClient) return null;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (showNoPartnership || data?.getUserPartnershipDetails?.length === 0) {
    return <div>No Partnership Found</div>;
  }

  const partnership = data.getUserPartnershipDetails[0]; // Access the first partnership
  const user1 = partnership?.user1?.name;
  const user2 = partnership?.user2?.name;

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
