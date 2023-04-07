import { SERVER_URL } from '@env';
import type { User as FirebaseUser } from 'firebase/auth';

/**
 * Basic fetch wrapper that adds Authorization header to the request
 *
 * @param userSession - Firebase user session
 * @param url - sub URL to fetch
 * @param options - Fetch options
 * @returns data - response data from Response.json()
 */
export const customFetch = async (
  userSession: FirebaseUser,
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  if (!userSession) throw new Error('User is not logged in');

  const userSessionToken = await userSession.getIdToken();

  const response = await fetch(`${SERVER_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${userSessionToken}`,
    },
  });

  const data = await response.json();

  return data;
};
