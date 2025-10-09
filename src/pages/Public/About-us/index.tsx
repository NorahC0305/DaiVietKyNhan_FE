import React from "react";
import Image from "next/image";

const AboutUsPage = () => {
  return (
    <div className="min-h-screenÏ text-white py-8 px-4 font-sans">
      {/* Main Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          VỀ CHÚNG TÔI
        </h1>
      </div>

      {/* First Scroll Section - Dai Viet Ky Nhan */}
      <div className="mb-16">
        <div className="relative max-w-6xl mx-auto">
          {/* Scroll Paper Background */}
          <div
            className="relative bg-cover bg-center bg-no-repeat p-8 md:p-22 rounded-3xl"
            style={{ backgroundImage: "url(/ScrollPaper.svg)" }}
          >
            {/* Content */}
            <div className="flex flex-col lg:flex-row items-start gap-8 relative z-10">
              {/* Left Side - Text Content */}
              <div className="flex-1 text-gray-800">
                <h2 className="text-2xl md:text-3xl font-bold text-[#ddac40] mb-6 drop-shadow-sm">
                  ĐẠI VIỆT KỸ NHÂN
                </h2>
                <div className="space-y-4">
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    Đại Việt Kỷ Nhân là một dự án cộng đồng sáng tạo, với sứ
                    mệnh làm mới cách kể chuyện lịch sử và đưa những nhân vật
                    "lực la – kiệt xuất – bị lãng quên" trong sử Việt đến gần
                    hơn với thế hệ trẻ.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    Thông qua những minh họa nhân vật công phu, mang đậm bản sắc
                    và tính thẩm mỹ hiện đại, dự án hướng tới việc kết nối Gen Z
                    với lịch sử bằng những hình thức truyền tải gần gũi, trực
                    quan và cảm xúc hơn.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    Với ba giá trị cốt lõi: tôn trọng sử liệu – thẩm mỹ thị giác
                    – kết nối cộng đồng. Đại Việt Kỷ Nhân mong muốn tạo nên một
                    không gian nói lịch sử không chỉ được ghi nhớ mà còn được
                    sống lại một cách sáng tạo, và truyền cảm hứng trong đời
                    sống hiện đại.
                  </p>
                </div>
              </div>

              {/* Right Side - Images */}
              <div className="flex-1 flex justify-center items-center">
                <div className="w-full max-w-md">
                  <Image
                    src="/boardgamefb2b 1.svg"
                    alt="Đại Việt Kỷ Nhân Cards"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Scroll Section - Founder */}
      <div className="mb-16">
        <div className="relative max-w-6xl mx-auto">
          {/* Scroll Paper Background */}
          <div
            className="relative bg-cover bg-center bg-no-repeat p-8 md:p-22 rounded-3xl"
            style={{ backgroundImage: "url(/ScrollPaper.svg)" }}
          >
            {/* Content */}
            <div className="flex flex-col lg:flex-row items-start gap-8 relative z-10">
              {/* Left Side - Logo */}
              <div className="flex-1 flex justify-center items-center">
                <div className="w-48 h-48 md:w-56 md:h-56">
                  <Image
                    src="/big-logo.svg"
                    alt="Đại Việt Kỷ Nhân Logo"
                    width={200}
                    height={200}
                    className="w-full h-full drop-shadow-xl"
                  />
                </div>
              </div>

              {/* Right Side - Text Content */}
              <div className="flex-1 text-gray-800">
                <h2 className="text-2xl md:text-3xl font-bold text-[#ddac40] mb-6 drop-shadow-sm">
                  FOUNDER
                </h2>
                <div className="space-y-4">
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    Đại Việt Kỷ Nhân được khởi xướng bởi một người trẻ yêu sử –
                    Tô Quốc Nghĩ, họa sĩ minh họa và nhà sáng tạo nội dung có
                    niềm đam mê đặc biệt với lịch sử và bản sắc dân tộc.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    Với tư duy thẩm mỹ hiện đại kết hợp tinh thần gìn giữ di
                    sản, anh là người đứng sau hơn 500 minh họa nhân vật lịch sử
                    mang phong cách riêng biệt – vừa chỉn chu về sử liệu, vừa
                    cuốn hút về hình ảnh.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    Từ những nét vẽ đầu tiên, Tô Quốc Nghĩ đã dần định hình nên
                    một dự án không chỉ tôn vinh lịch sử Việt, mà còn truyền cảm
                    hứng sáng tạo cho thế hệ trẻ thông qua những góc nhìn mới
                    mẻ, gần gũi và đầy cảm xúc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
