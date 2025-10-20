"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface MediaItem {
    id: number
    url: string
    alt?: string | null
}

interface ImageModalProps {
    isOpen: boolean
    onClose: () => void
    images: MediaItem[]
    currentIndex: number
    onPrevious: () => void
    onNext: () => void
}

const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    onClose,
    images,
    currentIndex,
    onPrevious,
    onNext
}) => {
    const currentImage = images[currentIndex]

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return

            switch (e.key) {
                case 'Escape':
                    onClose()
                    break
                case 'ArrowLeft':
                    onPrevious()
                    break
                case 'ArrowRight':
                    onNext()
                    break
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose, onPrevious, onNext])

    if (!isOpen || !currentImage) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                aria-label="Đóng"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Previous button */}
            {images.length > 1 && (
                <button
                    onClick={onPrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    aria-label="Ảnh trước"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>
            )}

            {/* Next button */}
            {images.length > 1 && (
                <button
                    onClick={onNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    aria-label="Ảnh tiếp theo"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
            )}

            {/* Image container */}
            <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
                <Image
                    src={currentImage?.url || ''}
                    alt={currentImage?.alt || 'Hình ảnh'}
                    width={800}
                    height={600}
                    className="max-w-full max-h-full object-contain"
                    priority
                />
            </div>

            {/* Image counter */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
                    {currentIndex + 1} / {images.length}
                </div>
            )}
        </div>
    )
}

export default ImageModal
