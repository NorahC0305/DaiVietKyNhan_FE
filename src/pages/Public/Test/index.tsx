'use client'

import { GameFrame } from "@components/Molecules/GameFrame"
import CompleteLand from "@components/Molecules/Popup/CompleteLand"
import { useState } from "react"

const TestPageClient = () => {
    const [isOpenCompleteLand, setIsOpenCompleteLand] = useState<boolean>(true)

    const handleCloseCompleteLand = () => {
        setIsOpenCompleteLand(false)
    }

    const land = 'Chử Đồng Tử' as 'Sơn Tinh' | 'Thánh Gióng' | 'Chử Đồng Tử' | 'Liễu Hạnh'
    return (
        <GameFrame>
            <CompleteLand isOpen={isOpenCompleteLand} onClose={handleCloseCompleteLand} land={land} />
        </GameFrame>

    )
}

export default TestPageClient