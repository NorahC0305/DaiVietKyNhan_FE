import React from 'react'

const Title = () => {
    return (
        <section className="vietnamese-pattern py-20 relative">
            <div className="container mx-auto px-4 text-center">
                <div className="animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-bold text-holder mb-8 leading-tight">
                        Khám Phá Kho Tàng
                        <span className="text-primary block">Văn Hóa Việt Nam</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-3xl mx-auto mb-12 leading-relaxed">
                        Những cuốn sách quý giá về lịch sử, văn hóa và truyền thống Việt Nam.
                        <span className="text-primary font-medium"> Đặt trước ngay hôm nay</span> để không bỏ lỡ cơ hội sở hữu
                        những tác phẩm độc đáo.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            <span>Miễn phí vận chuyển toàn quốc</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            <span>Ưu đãi đặc biệt cho khách hàng đặt trước</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-10 left-10 w-20 h-20 border border-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 border border-primary/30 rounded-full animate-pulse delay-1000"></div>
        </section>
    )
}

export default Title