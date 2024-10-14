"use client";

import Button from "./Button";
import CreateLink from "./CreateLink";
import EmptySetting from "./EmptySetting";

/**
 * SettingContainer component renders the link settings form and handles form submission.
**/

let link: any = [
  {
    key: "01",
    label: "GitHub",
    url: "github.com/nahid",
    color: "link-black",
    isLocal: false,
  },
  // {
  //   key: "03",
  //   label: "LinkedIn",
  //   url: "linkedin.com/nahid-dev",
  //   color: "link-blue",
  //   isLocal: false,
  // },
];

const SettingContainer = (): JSX.Element => {
  const containerClass = link && link.length > 2 ? "overflow-y-auto " : "";

  const removeLink = () => {}
  const removeLinkBack = () => {};
  const handleChange = () => {};
  const linkErrors =  {};

  return (
    <div className="w-full h-full p-7 sm:p-10">
      <h1 className="text-titleSmall sm:text-title text-black mb-4">
        Customize your links
      </h1>
      <p className="mb-6">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <div className="mb-6">
        <Button
          label={"+ Add new link"}
          onClick={() => {
            console.log("add new link");
          }}
        />
      </div>
      <form
        className={"flex flex-col gap-3"}
        action="submit"
        onSubmit={() => {
          console.log("handleSubmit");
        }}
      >
        <div className={`${containerClass} flex flex-col gap-6 h-[470px] `}>
          {link && link.length > 0 ? (
            link.map((link: any, index: number) => (
              <CreateLink
                key={`${link.key}`}
                link={link}
                number={index}
                removeLink={removeLink}
                removeLinkBack={removeLinkBack}
                handleChange={handleChange}
                linkErrors={linkErrors}
              />
            ))
          ) : (
            <EmptySetting />
          )}
        </div>
        <div className="flex justify-end w-full border-t mt-6 ">
          <div className="w-full sm:w-[91px] mt-6 ">
            <Button label={"Save"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingContainer;
