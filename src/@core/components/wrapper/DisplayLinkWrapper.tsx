"use client";

import React, { useState } from "react";
import { useLinks } from "../../hook/useLinks";
import ConfirmationModal from "../common/ConfirmationModal";
import AddEditLink from "../sections/AddEditLink";
import ViewLink from "../sections/ViewLink";

/**
 * CreateLink renders a form section for creating or editing a link.
 */

const DisplayLinkWrapper: React.FC<any> = ({ number, item }) => {
  const [openForm, setOpenForm] = useState(false);
  const { deleteLink } = useLinks();

  const handleCloseForm = () => {
    setOpenForm(false);
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleRemoveClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteLink(item?._id);
      setIsModalOpen(false);
    } catch (err) {
      console.log("err in deleting:", err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="bg-background-white w-full p-5 rounded-lg ">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2 items-center">
          <div className="flex justify-start h-2">
            <div className="border-b border-t w-3 h-1.5 border-dark-gray"></div>
          </div>
          <p>{`Link #${number + 1}`}</p>
        </div>
        <div className="flex gap-3">
          <p
            className={"cursor-pointer hover:text-dark-purple"}
            onClick={() => {
              setOpenForm(true);
            }}
          >
            Edit
          </p>
          <p
            className={"cursor-pointer hover:text-dark-purple"}
            onClick={handleRemoveClick}
          >
            Remove
          </p>
        </div>
      </div>
      {openForm ? (
        <AddEditLink closeForm={handleCloseForm} isEditing itemId={item?._id} />
      ) : (
        <ViewLink item={item} />
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default DisplayLinkWrapper;
