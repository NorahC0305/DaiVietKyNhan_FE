'use client'

import { GameFrame } from "@components/Molecules/GameFrame"
import Guide from "@components/Molecules/Popup/Guide"
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
    // const [isOpenKhaiNhanMoAn, setIsOpenKhaiNhanMoAn] = useState<boolean>(true)
    // const handleCloseKhaiNhanMoAn = () => {
    //     setIsOpenKhaiNhanMoAn(false)
    // }
    //--------------------------------End--------------------------------//


    /**
     * Guide
     */
    const [isOpenGuide, setIsOpenGuide] = useState<boolean>(true)
    const handleCloseGuide = () => {
        setIsOpenGuide(false)
    }
    const land = 'Sơn Tinh' as 'Sơn Tinh' | 'Thánh Gióng' | 'Chử Đồng Tử' | 'Liễu Hạnh'
    //--------------------------------End--------------------------------//

    return (
        <GameFrame user={null as any}>
            {/* <CompleteLand isOpen={isOpenCompleteLand} onClose={handleCloseCompleteLand} land={land} /> */}
            {/* <KhaiNhanMoAn isOpen={isOpenKhaiNhanMoAn} onClose={handleCloseKhaiNhanMoAn} onClaim={() => { }} /> */}
            <Guide isOpen={isOpenGuide} onClose={handleCloseGuide} user={null as any} />
        </GameFrame>

    )
}

export default TestPageClient