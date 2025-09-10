import React from 'react'

const ContactInfo = () => {
  return (
    <div className="rounded-xl bg-white/15 backdrop-blur-lg p-5 sm:p-6 border border-white/10 text-white">
      <h2 className="text-xl sm:text-2xl font-semibold">Thông tin liên hệ</h2>
      <div className="mt-4 space-y-5">
        <div className="flex items-start gap-3">
          <div className="mt-1 h-9 w-9 flex items-center justify-center rounded-full bg-white/15 border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 7.5v9a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 16.5v-9m19.5 0A2.25 2.25 0 0 0 19.5 5.25H4.5A2.25 2.25 0 0 0 2.25 7.5m19.5 0-8.682 5.421a2.25 2.25 0 0 1-2.136 0L2.25 7.5" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold">Email</div>
            <div className="text-sm text-gray-200">photogoagency.contact@gmail.com</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 h-9 w-9 flex items-center justify-center rounded-full bg-white/15 border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h1.5c.414 0 .75.336.75.75v3c0 .414-.336.75-.75.75H5.25A2.25 2.25 0 0 0 3 11.25v1.5a6.75 6.75 0 0 0 6.75 6.75h1.5a2.25 2.25 0 0 0 2.25-2.25v-1.5c0-.414.336-.75.75-.75h3c.414 0 .75.336.75.75v1.5a4.5 4.5 0 0 1-4.5 4.5H9.75C5.245 21.75 1.5 18.005 1.5 13.5V9.75a3 3 0 0 1 3-3z" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold">Điện thoại</div>
            <div className="text-sm text-gray-200">+1 (555) 123-4567</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 h-9 w-9 flex items-center justify-center rounded-full bg-white/15 border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold">Địa chỉ văn phòng</div>
            <div className="text-sm text-gray-200">123 Photography Lane</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo


