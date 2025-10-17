'use client'

import CompleteLand from "@components/Molecules/Popup/CompleteLand"
import { useState } from "react"

const TestPageClient = () => {
    const [isOpenCompleteLand, setIsOpenCompleteLand] = useState<boolean>(true)

    const handleCloseCompleteLand = () => {
        setIsOpenCompleteLand(false)
    }

    return (
        <>
            <CompleteLand isOpen={isOpenCompleteLand} onClose={handleCloseCompleteLand} />
        </>

    )
}

export default TestPageClient