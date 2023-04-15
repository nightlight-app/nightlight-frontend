import { SERVER_URL } from '@env';
import { auth } from '@nightlight/src/config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

// Session token for the current user
let userSessionToken: string | null = null;

// Listen for auth state changes and update the session token accordingly
onAuthStateChanged(auth, user => {
  if (user) {
    console.log(
      '[onAuthStateChanged] New user logged in. Setting userSessionToken for custom fetch.'
    );

    // super brute force way to get the token without using async getIdToken()
    userSessionToken = (user as any).stsTokenManager.accessToken as string;
    // user.getIdToken().then(token => {
    //   userSessionToken = token;
    //   console.log('userSessionToken is now', userSessionToken);
    // });
  } else {
    console.log(
      '[onAuthStateChanged] User is null. Setting userSessionToken to null.'
    );
    userSessionToken = null;
  }
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
}: {
  resourceUrl: string;
  options: RequestInit;
}): Promise<any> => {
  if (!userSessionToken) {
    console.error('[customFetch] Session ID token is null.');
    return;
  }

  if (resourceUrl[0] !== '/') {
    console.error('[customFetch] resourceUrl must start with /');
    return;
  }

  try {
    const response = await fetch(`${SERVER_URL}${resourceUrl}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${userSessionToken}`,
      },
    });

    console.log('[customFetch]', JSON.stringify(response, null, 2));

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error('[customFetch] Error while fetching: ', error);
    console.error('[customFetch] resourceUrl: ', resourceUrl);
    console.error('[customFetch] options: ', options);
    throw new Error(error);
  }
};
