// app/layout.tsx
'use client';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../lib/apolloClient'; // Singleton instance

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
