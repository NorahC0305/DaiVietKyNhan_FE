import Image from 'next/image'
import React from 'react'

const CONTENT_CONFIG: Record<string, { img: string; title: string; color: string }> = {
    'Sơn Tinh': {
        img: 'https://res.cloudinary.com/dznt9yias/image/upload/v1760714093/Logo_ST_w5vzqy.svg',
        title: 'CHƯƠNG 1: KHỞI NGUYÊN KỲ GIỚI',
        color: '#41821E'
    },
    'Chử Đồng Tử': {
        img: 'https://res.cloudinary.com/dznt9yias/image/upload/v1760714057/Logo_C%C4%90T_dvt4yb.svg',
        title: 'CHƯƠNG 2: TÀ ẢNH',
        color: '#2B638F'
    },
    'Thánh Gióng': {
        img: 'https://res.cloudinary.com/dznt9yias/image/upload/v1760714074/Logo_TG_ybvbuo.svg',
        title: 'CHƯƠNG 3: BIẾN CỐ',
        color: '#EF493D'
    },
    'Liễu Hạnh': {
        img: 'https://res.cloudinary.com/dznt9yias/image/upload/v1760714057/Logo_LH_dvt4yb.svg',
        title: 'CHƯƠNG 4: HÀNH TRÌNH',
        color: '#8D3BBB'
    }
}

const ContentChuong4 = () => {
    return (
        <>
            {/* --- Content 1 --- */}
            <div className="px-10 flex items-center justify-between">
                <div className="w-[55%]">
                    <p className="text-secondary lg:text-xl text-base text-justify leading-relaxed">Kỳ Chủ đặt chân vào Kỳ Giới - nơi từng là cõi linh thiêng của ký ức Đại Việt, nay đã bị bao phủ bởi màn sương xám của Tà Ảnh.</p>

                    <br />
                    <p className="text-secondary lg:text-xl text-base text-justify leading-relaxed">Để khôi phục ánh sáng, Kỳ Chủ phải đi qua bốn vùng đất linh thiêng: Núi Tản Viên, Đầm Dạ Trạch, Làng Phù Đổng và Phủ Tây Hồ.</p>
                </div>
                <div className="relative lg:w-[330px] lg:h-[230px] w-[230px] h-[150px]">
                    <Image src='https://res.cloudinary.com/dznt9yias/image/upload/v1760726368/Trang_map_Ky%CC%80_Gio%CC%9B%CC%81i_qu5mvl.svg' alt="talinh" fill />
                </div>
            </div>

            {/* --- Content 2 --- */}
            <div className="px-10 mt-6 flex items-center justify-between">
                <div className="relative w-[300px] h-[350px]">
                    <Image src='https://res.cloudinary.com/dznt9yias/image/upload/v1760869022/4_logo_1_1_epeehj.png' alt="NgonLuaTat" fill />
                </div>
                <div className="w-[60%] ml-10">
                    <span className="text-secondary lg:text-xl text-base text-justify mb-0.5 leading-relaxed">Tại mỗi vùng đất, Kỳ Chủ sẽ thông qua những dấu tích còn sót lại từ những câu chuyện Kỳ Nhân để giải phong ấn cho họ. Mỗi khi thành công giải ấn cho một Kỳ Nhân, cảm xúc và ký ức của họ lại sống dậy, trao cho Kỳ Chủ một Kỳ Ấn - những thông tin và câu chuyện về Kỳ Nhân đó.</span>
                    <br />
                    <br />
                    <span className="text-secondary lg:text-xl text-base text-justify mb-0.5 leading-relaxed">Càng nhiều Kỳ Ấn được thu thập, ánh sáng trong Kỳ Giới càng mạnh mẽ hơn, từng chút đẩy lùi bóng tối của Tà Ảnh. Khi bốn vùng đất được thanh tẩy, bốn dấu ấn của Tứ Bất Tử - bốn Kỳ Văn - trỗi dậy và hợp nhất để triệu hồi vùng đất cuối cùng, Tứ Nguyên Linh Giới: Khai Hoa Huyền Ấn. Nơi đó, Tà Ảnh đang ẩn náu để giữ không cho ngọn Kỳ Linh Việt Hỏa được thắp sáng.</span>
                </div>
            </div>
        </>
    )
}

const ContentChuong3 = () => {
    return (
        <>
            {/* --- Content 1 --- */}
            <div className="px-10 flex items-center justify-between">
                <div className="w-[65%]">
                    <p className="text-secondary lg:text-xl text-base text-justify leading-relaxed">Mỗi khi có người thở dài lười biếng trước những trang sử dài miên man, hoặc ngán ngẩm trước những thông tin khô khan phải ghi nhớ, Tà Ảnh lại âm thầm lớn thêm một phần sức mạnh.</p>
                    <br />
                    <p className="text-secondary lg:text-xl text-base text-justify leading-relaxed">Cứ thế, Tà Ảnh từng chút một lớn lên. Từ những làn sương đen yếu ớt, nó tích tụ năng lượng trong im lặng, lan khắp những kẽ hở của tâm trí con người.</p>
                </div>
                <div className="relative w-[230px] h-[230px]">
                    <Image src='https://res.cloudinary.com/dznt9yias/image/upload/v1760866961/T%C3%A0_%E1%BA%A2nh_1_o8opax.png' alt="talinh" fill />
                </div>
            </div>

            {/* --- Content 2 --- */}
            <div className="px-10 mt-6 flex items-center justify-between">
                <div className="relative w-[240px] h-[200px]">
                    <Image src='https://res.cloudinary.com/dznt9yias/image/upload/v1760868510/l%E1%BB%ADa_t%E1%BA%AFt_1_jdahkz.svg' alt="NgonLuaTat" fill />
                </div>
                <div className="w-[60%] ml-10">
                    <span className="text-secondary lg:text-xl text-base text-justify mb-0.5 leading-relaxed">Và rồi, khi sức mạnh đủ lớn, bóng tối ấy bắt đầu len lỏi vào Kỳ Giới – nơi lẽ ra chỉ có ánh sáng của ký ức và niềm tin tồn tại. Biến cố ập đến khi nó thổi tắt Kỳ Linh Việt Hỏa, dập tắt ánh sáng thiêng liêng vốn nuôi dưỡng linh hồn đất Việt. Hậu quả là toàn bộ các Kỳ Nhân – những danh nhân đã góp phần làm nên linh hồn dân tộc – bị phong ấn trong những  cuộn giấy cổ.</span>
                </div>
            </div>
        </>
    )
}

const ContentChuong2 = () => {
    return (
        <>
            {/* --- Content 1 --- */}
            <div className="px-10 flex items-center justify-between">
                <div className="w-[80%]">
                    <span className="text-secondary lg:text-xl text-base text-justify leading-relaxed">Giống như ánh sáng và bóng tối là hai mặt song hành của tự nhiên, nơi có ngọn lửa, ở đó cũng có tro tàn.</span>
                    <br />
                    <br />
                    <span className="text-secondary lg:text-xl text-base text-justify leading-relaxed">Vào những năm quân Minh xâm lược nước ta, chúng đã đốt phá, thiêu hủy gần như toàn bộ sử sách Đại Việt. Lịch sử bỗng chốc đứt đoạn, ký ức dân tộc rơi vào khoảng trống không thể hàn gắn. Từ trong những tro tàn ấy, Tà Ảnh sinh ra.</span>
                    <br />
                    <br />
                    <span className="text-secondary lg:text-xl text-base text-justify leading-relaxed">Ban đầu, Tà Ảnh chỉ là những bào thai hỗn loạn. Bản thể của nó là những làn sương đen mỏng, yếu ớt, mang hình dạng của những ý niệm sai lệch trước lịch sử.  </span>
                </div>
                <div className="relative w-[270px] lg:w-[300px] h-[270px] lg:h-[330px]">
                    <Image src='https://res.cloudinary.com/dznt9yias/image/upload/v1760866961/T%C3%A0_%E1%BA%A2nh_1_o8opax.png' alt="TaAnh" fill />
                </div>
            </div>

            {/* --- Content 2 --- */}
            <div className="px-10 mt-6 flex items-center justify-between">
                <span className="text-secondary lg:text-xl text-base text-justify leading-relaxed">Thế nhưng, chúng không thể khuất phục được ý chí quật cường của người Việt – ngọn lửa ấy đã được rèn trong máu và niềm tin của muôn thế hệ. Không thể chiến thắng trực diện, Tà Ảnh rút vào bóng tối, tồn tại dai dẳng, âm thầm len vào tâm trí con người. Không thể chiến thắng, Tà Ảnh rút vào bóng tối, chọn một cách tồn tại khác. Nó không xóa bỏ ký ức, mà lăm le tắt đi những cảm xúc trong ký ức ấy.
                    <br />
                    <br />
                    <span className="text-secondary lg:text-xl text-base text-justify leading-relaxed">
                        Theo thời gian, lịch sử dần mất đi sự sống động. Con người vẫn nhớ đến các vị danh nhân nnhưng chỉ như những cái tên trên giấy mực, những tượng đá trầm lặng. Họ được nhắc đến qua chiến công, mốc thời gian, danh hiệu, chứ không còn là những con người với đầy đủ cảm xúc, nỗi sợ, niềm tin, và cả những góc khuất rất đỗi nhân sinh.
                    </span>
                    <br />
                    <br />
                    <span className="text-secondary lg:text-xl text-base text-justify leading-relaxed">
                        Lịch sử không biến mất, nhưng dưới sự ảnh hưởng của Tà Ảnh dần trở nên một chiều, lạnh lẽo – như ngọn lửa bị bao phủ bởi lớp tro tàn dày đặc, chỉ chờ một ai đủ niềm tin để thắp sáng lại.</span>
                </span>
            </div>
        </>
    )
}

const ContentChuong1 = () => {
    return (
        <>
            {/* --- Content 1 --- */}
            <div className="px-10 flex items-center justify-between">
                <div className="w-[70%]">
                    <span className="text-secondary lg:text-xl text-base text-justify leading-relaxed">Ngàn năm về trước, mỗi dân tộc đều có riêng cho mình một ngọn lửa thiêng – kết tinh của hồn cốt và ký ức dân tộc, là mạch nguồn lưu giữ câu chuyện của muôn ngàn thế hệ. Ngọn lửa của con dân đất Việt mang tên Kỳ Linh Việt Hỏa. Ánh sáng của ngọn lửa trường tồn ấy không chỉ soi tỏ lịch sử, mà còn gắn kết nó với từng con người bằng xương bằng thịt, cùng nỗi buồn, niềm vui, khát vọng của họ. </span>
                </div>
                <div className="relative w-[200px] h-[200px]">
                    <Image src='https://res.cloudinary.com/dznt9yias/image/upload/v1760722420/Ky%CC%80_Linh_Vie%CC%A3%CC%82t_Ho%CC%89a_1_mvwrlg.svg' alt="KyLinhVietHoa" fill />
                </div>
            </div>

            {/* --- Content 2 --- */}
            <div className="px-10 mt-6 flex items-center justify-between">
                <div className="relative w-[300px] h-[280px]">
                    <Image src='https://res.cloudinary.com/dznt9yias/image/upload/v1760865503/POST_TBT_1_js9xab.png' alt="Post TBT 1" fill />
                </div>
                <div className="w-[70%] ml-10">
                    <span className="text-secondary lg:text-xl text-base text-justify mb-0.5 leading-relaxed">Tứ Bất Tử được chọn làm những vị thần canh giữ Kỳ Linh Việt Hỏa. Để bảo vệ ngọn lửa khỏi những thế lực xấu xa, họ đã cùng nhau dựng nên Kỳ Giới - một cõi linh thiêng, huyền ảo với bốn vùng đất được bảo hộ bởi mỗi vị thần tương ứng Những vùng đất ấy lần lượt là:</span>
                    <ul className="list-disc list-inside">
                        <li className="font-bold text-secondary lg:text-xl text-base mt-0.5">Núi Tản Viên (Sơn Tinh)</li>
                        <li className="font-bold text-secondary lg:text-xl text-base mt-0.5">Đầm Dạ Trạch (Chử Đồng Tử)</li>
                        <li className="font-bold text-secondary lg:text-xl text-base mt-0.5">Làng Phù Đổng (Thánh Gióng)</li>
                        <li className="font-bold text-secondary lg:text-xl text-base mt-0.5">Phủ Tây Hồ (Liễu Hạnh Công Chúa)</li>
                    </ul>
                </div>
            </div>
        </>

    )
}

const ContentKhaiNhanMoAn = ({ isHidden, an }: { isHidden: boolean, an: string }) => {
    const renderContent = () => {
        switch (an) {
            case 'Sơn Tinh':
                return <ContentChuong1 />;
            case 'Chử Đồng Tử':
                return <ContentChuong2 />;
            case 'Thánh Gióng':
                return <ContentChuong3 />;
            case 'Liễu Hạnh':
                return <ContentChuong4 />;
            default:
                return <ContentChuong1 />;
        }
    };

    return (
        <div className={`mt-10 w-full flex items-center justify-center ${isHidden ? 'hidden' : ''}`}>
            <div className="bg-[#a4a89d29] lg:w-[93%] w-[98%] h-full rounded-xl py-10">
                <h1
                    className="font-bd-street-sign text-center lg:text-6xl text-3xl mb-10"
                    style={{
                        color: CONTENT_CONFIG[an]?.color || '#41821E',
                        WebkitTextStrokeWidth: 2,
                        WebkitTextStrokeColor: '#FFDD3D',
                        strokeWidth: 2,
                        stroke: '#FFDD3D',
                        paintOrder: 'stroke fill',
                    }}
                >
                    {CONTENT_CONFIG[an]?.title || 'CHƯƠNG 1: KHỞI NGUYÊN KỲ GIỚI'}
                </h1>

                {/* Render content based on selected chapter */}
                {renderContent()}
            </div>
        </div>
    )
}

export default ContentKhaiNhanMoAn