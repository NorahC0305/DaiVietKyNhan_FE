'use client'

import { GameFrame } from "@components/Molecules/GameFrame"
// import CompleteLand from "@components/Molecules/Popup/CompleteLand"
import KhaiNhanMoAn from "@components/Molecules/Popup/KhaiNhanMoAn"
import { useState } from "react"

const TestPageClient = () => {
    /**
     * Complete Land
     */
    // const [isOpenCompleteLand, setIsOpenCompleteLand] = useState<boolean>(true)
    // const handleCloseCompleteLand = () => {
    //     setIsOpenCompleteLand(false)
    // }
    // const land = 'Chử Đồng Tử' as 'Sơn Tinh' | 'Thánh Gióng' | 'Chử Đồng Tử' | 'Liễu Hạnh'
    // const kyChu = LAND_CONFIG[land]
    //--------------------------------End--------------------------------//

    /**
     * Khai Nhan Mo An
     */
    const [isOpenKhaiNhanMoAn, setIsOpenKhaiNhanMoAn] = useState<boolean>(true)
    const handleCloseKhaiNhanMoAn = () => {
        setIsOpenKhaiNhanMoAn(false)
    }
    //--------------------------------End--------------------------------//
    return (
        <GameFrame>
            {/* <CompleteLand isOpen={isOpenCompleteLand} onClose={handleCloseCompleteLand} land={land} /> */}
            <KhaiNhanMoAn isOpen={isOpenKhaiNhanMoAn} onClose={handleCloseKhaiNhanMoAn} onClaim={() => { }} />
        </GameFrame>

    )
}

export default TestPageClient