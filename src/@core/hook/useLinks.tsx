import { useLinkContext } from "../context/link.context";

export const useLinks = () => {
  const { links, addLink, editLink, deleteLink } = useLinkContext();

  return {
    links,
    addLink,
    editLink,
    deleteLink,
  };
};
