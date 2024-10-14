"use client ";

import React, { useCallback, useState } from "react";
import { FieldErrors } from "react-hook-form";

import * as Yup from "yup";
import { useUser } from "../context/user.context";
import { LinkDetail, LinkErrors, UrlValue, UseAddLinkReturn } from "../types";
import useAuth from "./useAuth";
import mongoose from "mongoose";

/**
 * Custom hook for managing user links.
 */

const useAddLink = (): UseAddLinkReturn => {
  const {
    addLink,
    removeLink,
    removeLinkBack,
    updateLinkLocal,
    updateLinkBack,
  } = useUser();

  const { authUser } = useAuth();

  const link = authUser?.links;

  const [linkErrors, setLinkErrors] = useState<LinkErrors>({});
  const [initialLinks, setInitialLinks] = useState<LinkDetail[] | null>(null);

  React.useEffect(() => {
    if (link && !initialLinks) {
      setInitialLinks(JSON.parse(JSON.stringify(link)));
    }
  }, [link, initialLinks]);

  const handleAddLink = () => {
    addLink({
      label: "",
      url: "",
      color: "",
      isLocal: true,
      user_id: new mongoose.Types.ObjectId(authUser?._id),
    });
  };

  const updateLinkErrors = useCallback((index: number, field: string) => {
    setLinkErrors((prevErrors) => ({
      ...prevErrors,
      [index]: {
        ...prevErrors[index],
        [field]: "",
      },
    }));
  }, []);

  const handleChange = useCallback(
    (
      index: number,
      key: string,
      field: string,
      value: LinkDetail | UrlValue
    ) => {
      updateLinkErrors(index, field);
      const currentLink = link && link.find((link) => link._id === key);
      const isLocal = true;
      if (!currentLink) return;
      if (field === "label") {
        const updatedLinks = {
          // key: (value as LinkDetail).key,
          label: (value as LinkDetail).label,
          url: (value as LinkDetail).url,
          color: (value as LinkDetail).color,
          isLocal: isLocal,
        };
        updateLinkLocal(key, updatedLinks);
      } else if (field === "url") {
        const urlValue =
          typeof value === "string" ? value : (value as UrlValue).url;

        const updatedLinks = {
          key: key,
          label: currentLink.label,
          url: urlValue,
          color: currentLink.color,
          isLocal: isLocal,
        };
        updateLinkLocal(key, updatedLinks);
      }
    },
    [link, updateLinkLocal, updateLinkErrors]
  );

  const hasChanges = () => {
    if (!initialLinks || !link) return false;
    return link.some((currentLink, index) => {
      const initialLink = initialLinks[index];
      if (
        currentLink.label !== initialLink?.label ||
        currentLink.url !== initialLink?.url ||
        currentLink.color !== initialLink?.color
      ) {
        return true;
      }
      return false;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasChanges()) {
      return;
    }

    if (link !== null) {
      try {
        await linkValidationSchema.validate(
          { links: link },
          { abortEarly: false }
        );
        updateLinkBack(link);
        setInitialLinks(link);
        console.log("Links are valid:", link);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const fieldErrors: FieldErrors = {};
          error.inner.forEach((err) => {
            if (err.path) {
              const match = err.path.match(/links\[(\d+)\]\.(\w+)/);
              if (match) {
                const [_, index, field] = match;
                const indexNumber = parseInt(index, 10);
                if (!fieldErrors[indexNumber]) {
                  fieldErrors[indexNumber] = {};
                }
                fieldErrors[indexNumber][field] = err.message;
              }
            }
          });
          console.log("Field errors:", fieldErrors);
          setLinkErrors(fieldErrors);
        }
        console.error("Validation error:", error);
      }
    } else {
      console.log("Link is null");
    }
  };

  return {
    link,
    removeLink,
    removeLinkBack,
    linkErrors,
    handleAddLink,
    handleChange,
    handleSubmit,
  };
};
export default useAddLink;
