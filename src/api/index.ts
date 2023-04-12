import { SERVER_URL } from '@env';
import { auth } from '@nightlight/src/config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

// Session token for the current user
let userSessionToken: string | null = null;

// Listen for auth state changes and update the session token accordingly
onAuthStateChanged(auth, user => {
  if (user) {
    user.getIdToken().then(token => {
      userSessionToken = token;
    });
  } else userSessionToken = null;
});

/**
 * Basic fetch wrapper that adds Authorization header to the request
 * Uses the session token for the current user
 *
 * @param url - sub URL to fetch
 * @param options - Fetch options
 * @returns data - response data from Response.json()
 */
export const customFetch = async ({
  // the resource URL to append after SERVER_URL
  resourceUrl,
  // Fetch options
  options,
  // optionally override the userSessionToken
  sessionToken,
}: {
  resourceUrl: string;
  options: RequestInit;
  sessionToken?: string;
}): Promise<any> => {
  if (!userSessionToken && !sessionToken) {
    console.log('[customFetch] session id token is null');
    return;
  }

  if (resourceUrl[0] !== '/') {
    console.log('[customFetch] resourceUrl must start with /');
    return;
  }

  const token = sessionToken || userSessionToken;

  try {
    const response = await fetch(`${SERVER_URL}${resourceUrl}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log('[customFetch] error while fetching: ', error);
    console.log('[customFetch] resourceUrl: ', resourceUrl);
    console.log('[customFetch] options: ', options);
    return;
  }
};
