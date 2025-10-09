import React from "react";
import Image from "next/image";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen text-white py-8 px-4 font-sans">
      {/* Main Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          VỀ CHÚNG TÔI
        </h1>
      </div>

      {/* First Scroll Section - Dai Viet Ky Nhan */}
      <div className="mb-16">
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Scroll Paper Background */}
          <Image
            src="/ScrollPaper.svg"
            alt="Scroll Paper"
            width={1000}
            height={1000}
            className="w-full h-auto"
          />

          {/* Content - Giảm kích thước để nằm gọn trong ảnh nền */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] sm:w-[65%] md:w-[50%] h-[70%] sm:h-[75%] md:h-[75%]">
            {/* Thay đổi để mobile cũng hiển thị 2 cột như desktop */}
            <div className="grid grid-cols-2 gap-2 md:gap-4 items-stretch h-full">
              {/* Left Side - Text Content - Sử dụng tối đa không gian có sẵn */}
              <div className="text-gray-800 h-full overflow-y-auto pr-1">
                {/* Điều chỉnh font size nhỏ hơn để nằm trong ảnh nền */}
                <h2 className="text-center text-[9px] md:text-base font-bold text-[#ddac40] mb-1 md:mb-2 drop-shadow-sm">
                  ĐẠI VIỆT KỲ NHÂN
                </h2>
                <div className="space-y-1 md:space-y-2">
                  {/* Giảm kích thước text để nằm trong ảnh nền */}
                  <p className="text-[8px] sm:text-[10px] md:text-sm leading-tight text-gray-700">
                    Đại Việt Kỳ Nhân là một dự án cộng đồng sáng tạo, ra đời với
                    sứ mệnh làm mới cách kể chuyện lịch sử và đưa những nhân vật
                    "kỳ lạ – kiệt xuất – bị lãng quên" trong sử Việt đến gần hơn
                    với thế hệ trẻ.
                  </p>
                  <p className="text-[8px] sm:text-[10px] md:text-sm leading-tight text-gray-700">
                    Thông qua những minh họa nhân vật công phu, mang đậm bản sắc
                    và tính thẩm mỹ hiện đại, dự án hướng tới việc kết nối Gen Z
                    với lịch sử bằng những hình thức truyền tải gần gũi, trực
                    quan và cảm xúc hơn.
                  </p>
                  <p className="text-[8px] sm:text-[10px] md:text-sm leading-tight text-gray-700">
                    Với ba giá trị cốt lõi: tôn trọng sử liệu – thẩm mỹ thị giác
                    – kết nối cộng đồng, Đại Việt Kỳ Nhân mong muốn tạo nên một
                    không gian nơi lịch sử không chỉ được ghi nhớ, mà còn được
                    sống lại một cách sáng tạo và truyền cảm hứng trong đời sống
                    hiện đại.
                  </p>
                </div>
              </div>

              {/* Right Side - Images - Cố định, không scroll */}
              <div className="flex flex-col gap-1 md:gap-2 justify-center items-center h-full">
                {/* Giảm kích thước ảnh để nằm trong ảnh nền */}
                <div className="w-full max-w-[80%] md:max-w-xs">
                  <Image
                    src="/boardgamefb2b 1.svg"
                    alt="Đại Việt Kỷ Nhân Cards"
                    width={300}
                    height={225}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
                {/* Giảm kích thước ảnh để nằm trong ảnh nền */}
                <div className="w-full max-w-[80%] md:max-w-xs">
                  <Image
                    src="/daivietkynhan1h 1.svg"
                    alt="Đại Việt Kỷ Nhân Cards"
                    width={300}
                    height={225}
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
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Scroll Paper Background */}
          <Image
            src="/ScrollPaper.svg"
            alt="Scroll Paper"
            width={1000}
            height={1000}
            className="w-full h-auto"
          />

          {/* Content - Giới hạn chặt chẽ hơn để nằm trong ảnh nền */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] sm:w-[70%] md:w-[55%] max-h-[70%] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start">
              {/* Left Side - Logo */}
              <div className="flex justify-center items-center mb-4 md:mb-0">
                <div className="w-full h-32 md:h-64">
                  {/* Reduced mobile height for logo */}
                  <Image
                    src="/big-logo.svg"
                    alt="Đại Việt Kỷ Nhân Logo"
                    width={300}
                    height={300}
                    className="w-full h-full object-contain drop-shadow-xl"
                  />
                </div>
              </div>

              {/* Right Side - Text Content */}
              <div className="text-gray-800">
                <h2 className="text-center text-sm sm:text-base md:text-lg font-bold text-[#ddac40] mb-2 md:mb-3 drop-shadow-sm">
                  FOUNDER
                </h2>
                <div className="space-y-1 md:space-y-2">
                  {/* Reduced text size slightly for tighter mobile fit */}
                  <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed text-gray-700">
                    Đại Việt Kỳ Nhân được khởi xướng bởi một người trẻ yêu sử –
                    Tô Quốc Nghi, họa sĩ minh họa và nhà sáng tạo nội dung có
                    niềm đam mê đặc biệt với lịch sử và bản sắc dân tộc.
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed text-gray-700">
                    Với tư duy thẩm mỹ hiện đại kết hợp tinh thần gìn giữ di
                    sản, anh là người đứng sau hơn 500 minh họa nhân vật lịch sử
                    mang phong cách riêng biệt – vừa chỉn chu về sử liệu, vừa
                    cuốn hút về hình ảnh.
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed text-gray-700">
                    Từ những nét vẽ đầu tiên, Tô Quốc Nghi đã dần định hình nên
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
