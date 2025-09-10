import { ArrowRightIcon } from "lucide-react";
import React from "react";

const ContactForm = () => {
  return (
    <div className="rounded-xl bg-white/15 backdrop-blur-md p-5 sm:p-6 border border-white/10 text-white">
      <h2 className="text-xl sm:text-2xl font-semibold">
        Gửi tin nhắn cho chúng tôi
      </h2>
      <form className="mt-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-sm text-gray-200">Họ</label>
            <input
              className="w-full rounded-md bg-white/15 border border-white/15 px-3 py-2 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
              placeholder=""
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-200">Tên</label>
            <input
              className="w-full rounded-md bg-white/15 border border-white/15 px-3 py-2 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
              placeholder=""
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-200">Email</label>
          <input
            type="email"
            className="w-full rounded-md bg-white/15 border border-white/15 px-3 py-2 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
            placeholder="hello@example.com"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-200">Vấn đề</label>
          <input
            className="w-full rounded-md bg-white/15 border border-white/15 px-3 py-2 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
            placeholder=""
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-200">Lời nhắn</label>
          <textarea
            rows={4}
            className="w-full rounded-md bg-white/15 border border-white/15 px-3 py-2 placeholder-gray-300 text-white resize-y focus:outline-none focus:ring-2 focus:ring-amber-400/70"
            placeholder="Để lại lời nhắn tại đây"
          ></textarea>
        </div>
        <div>
          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 hover:bg-amber-600 text-black font-medium px-5 py-2 transition-colors"
          >
            Gửi lời nhắn
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
