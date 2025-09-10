import React from 'react'

const CommunitySupport = () => {
  return (
    <div className="rounded-xl bg-white/15 backdrop-blur-lg p-5 sm:p-6 border border-white/10 text-white">
      <h2 className="text-xl sm:text-2xl font-semibold">Hỗ trợ cộng đồng</h2>
      <p className="mt-2 text-sm text-gray-200">Tham gia cộng đồng của chúng tôi để được hỗ trợ và thảo luận nhanh hơn</p>
      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <a href="#" className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 hover:bg-amber-600 text-black font-medium px-5 py-2 transition-colors">
          Nhóm Facebook <span>→</span>
        </a>
        <a href="#" className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 hover:bg-amber-600 text-black font-medium px-5 py-2 transition-colors">
          Discord DVKN <span>→</span>
        </a>
      </div>
    </div>
  )
}

export default CommunitySupport


