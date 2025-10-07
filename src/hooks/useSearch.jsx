import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/authConfig";

export const useSearch = () => {
  const { instance } = useMsal();

  const fetchSearchResults = async (query) => {
    try {
      const account = instance.getActiveAccount();
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account,
      });
      const accessToken = response.accessToken;

      const apiUrl = `/api/search?q=${encodeURIComponent(query)}`;
      const res = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Search failed: ${errorText}`);
      }

      return await res.json();
    } catch (error) {
      console.error("Search failed:", error);
      return null;
    }
  };

  return { fetchSearchResults };
};
