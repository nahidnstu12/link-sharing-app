import { createContext, useContext, useState } from "react";
import { LinkDetail, ProfilDetail, Users } from "../types";

// NEED TO FIX THIS

// Create User Context
const UserContext = createContext(null);

// Hook to use UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};

// UserProvider Component
export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<Users | null>(null);
  const [profile, setProfile] = useState<ProfilDetail | null>(null);
  const [link, setLink] = useState<LinkDetail[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches user data from the API and updates the state.
   */
  // const fetchData = async () => {
  //   const {authUser} = useAuth()
  //   setLoading(true);
  //   setError(null);
  //   try {

  //     if (fetchedUser && fetchedUser.links) {
  //       setUser(fetchedUser);
  //       setLink(fetchedUser.links);
  //       setProfile(fetchedUser.profile);
  //     } else {
  //       setUser(fetchedUser);
  //     }
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "Unknown error occurred");
  //     setLoading(false);
  //   }
  // };

  /**
   * Updates the user's profile locally.
   */
  //   const updateProfileLocal = (value: ProfilDetail) => {
  //     setProfile((prevProfile) =>
  //       prevProfile ? { ...prevProfile, ...value } : null
  //     );
  //   };

  /**
   * Updates the user's profile in the backend.
   */
  //   const updateProfileBack = async (updatedProfile: ProfilDetail) => {
  //     if (!user) return;
  //     try {
  //       const response: UpdateProfileResponse = await apiUpdateProfile(
  //         user._id,
  //         updatedProfile
  //       );
  //       const profileResponse = response.profile ?? {};
  //       console.log(profileResponse);
  //     } catch (err) {
  //       console.error("Error updating the profile:", err);
  //     }
  //   };

  /**
   * Adds a new link to the user's link list.
   */
  const addLink = (newLink: LinkDetail) => {
    setLink((prevLinks) => (prevLinks ? [...prevLinks, newLink] : [newLink]));
  };

  /**
   * Updates a link locally.
   */
  const updateLinkLocal = (
    oldKey: string | null,
    updatedLink: LinkDetail | LinkDetail[]
  ) => {
    setLink((prevLinks) => {
      if (!prevLinks) return [];
      return oldKey
        ? prevLinks.map((link) =>
            link.key === oldKey ? { ...link, ...updatedLink } : link
          )
        : Array.isArray(updatedLink)
        ? updatedLink
        : [updatedLink];
    });
  };

  /**
   * Updates the user's links in the backend.
   */
  // const updateLinkBack = async (validateLinks: LinkDetailArray) => {
  //   if (!user) return;
  //   const updatedLinks = validateLinks.map((link) => ({
  //     ...link,
  //     isLocal: false,
  //   }));
  //   try {
  //     const response: UpdateLinkResponse = await apiUpdateLink(
  //       user._id,
  //       updatedLinks
  //     );
  //     const linkResponse = response.links ?? [];
  //     console.log(linkResponse);
  //   } catch (err) {
  //     console.error("Error updating the links:", err);
  //   }
  // };

  /**
   * Removes a link locally.
   */
  const removeLink = (linkKey: string) => {
    setLink((prevLinks) =>
      prevLinks ? prevLinks.filter((link) => link.key !== linkKey) : []
    );
  };

  /**
   * Removes a link from the backend.
   */
  // const removeLinkBack = async (linkKey: string) => {
  //   if (!user) return;
  //   try {
  //     await apiDelete(user._id, linkKey);
  //     setLink((prevLinks) =>
  //       prevLinks ? prevLinks.filter((link) => link.key !== linkKey) : []
  //     );
  //   } catch (err) {
  //     console.error("Error removing link:", err);
  //   }
  // };

  const value = {
    user,
    profile,
    link,
    loading,
    error,
    setUser,
    setProfile,
    setLink,

    addLink,
    updateLinkLocal,

    removeLink,
    // removeLinkBack,
  };

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
