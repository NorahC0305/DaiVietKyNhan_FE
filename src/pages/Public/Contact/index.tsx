import React from "react";
import ContactHeader from "./Components/ContactHeader";
import ContactForm from "./Components/ContactForm";
import ContactInfo from "./Components/ContactInfo";
import CommunitySupport from "./Components/CommunitySupport";

const ContacPage = () => {
  return (
    <div className="min-h-screen w-full bg-center bg-fixed">
      {/* translucent gray overlay */}
      <div className="min-h-screen w-full ">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <ContactHeader />

          <div className="mt-8 flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <ContactForm />
            </div>
            <div className="lg:w-1/2 space-y-8">
              <ContactInfo />
              <CommunitySupport />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContacPage;
