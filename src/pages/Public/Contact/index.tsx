import React from "react";
import ContactHeader from "./Components/ContactHeader";
import ContactForm from "./Components/ContactForm";
import ContactInfo from "./Components/ContactInfo";
import CommunitySupport from "./Components/CommunitySupport";

const ContacPage = () => {
  return (
    <div
      className="min-h-screen w-full bg-center bg-fixed"
    >
      {/* translucent gray overlay */}
      <div className="min-h-screen w-full bg-gray-900/60">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <ContactHeader />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ContactForm />
            <ContactInfo />
            <div className="lg:col-start-2">
              <CommunitySupport />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContacPage;
