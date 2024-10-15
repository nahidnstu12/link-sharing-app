// LinkContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost, apiPut } from "../helpers/common-api";
import useAuth from "../hook/useAuth";

interface Link {
  _id: string;
  platform: string;
  link: string;
}

interface LinkContextProps {
  links: Link[];
  fetchLinks: () => Promise<void>;
  addLink: (link: Link) => Promise<void>;
  editLink: (id: string, updatedLink: Link) => Promise<void>;
  deleteLink: (id: string) => Promise<void>;
}

const LinkContext = createContext<LinkContextProps | undefined>(undefined);

export const useLinkContext = () => {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error("useLinkContext must be used within a LinkProvider");
  }
  return context;
};

export const LinkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [links, setLinks] = useState<Link[]>([]);
  const { authUser } = useAuth();

  const fetchLinks = async () => {
    try {
      if (authUser?._id) {
        const res: any = await apiGet(`/links?user_id=${authUser?._id}`);
        setLinks(res?.data?.items || []);
      }
      console.log("fetchLinks context else>");
      
    } catch (error) {
      console.error("Failed to fetch links", error);
    }
  };

  const addLink = async (newLink: Link) => {
    try {
      await apiPost("/links", newLink);
      await fetchLinks(); // Refetch after adding
    } catch (error) {
      console.error("Failed to add link", error);
    }
  };

  const editLink = async (id: string, updatedLink: Link) => {
    try {
      await apiPut(`/links/${id}`, updatedLink);
      await fetchLinks(); // Refetch after editing
    } catch (error) {
      console.error("Failed to edit link", error);
    }
  };

  const deleteLink = async (id: string) => {
    try {
      await apiDelete(`/links/${id}`);
      await fetchLinks();
    } catch (error) {
      console.error("Failed to delete link", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [authUser?._id]);

  return (
    <LinkContext.Provider
      value={{ links, fetchLinks, addLink, editLink, deleteLink }}
    >
      {children}
    </LinkContext.Provider>
  );
};
