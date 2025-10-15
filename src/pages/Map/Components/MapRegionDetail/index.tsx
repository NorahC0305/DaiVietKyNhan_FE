"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";

interface MapRegionDetailProps {
  region: {
    id: string;
    name: string;
    imageSrc: string;
    description: string;
  } | null;
}

export default function MapRegionDetail({ region }: MapRegionDetailProps) {
  const router = useRouter();

  // Kiểm tra region có tồn tại không
  if (!region) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy vùng đất</h1>
          <button
            onClick={() => router.push("/map")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại bản đồ
          </button>
        </div>
      </div>
    );
  }

  // Đảm bảo region có đầy đủ properties
  const { id, name, imageSrc, description } = region;

  const handleBackToMap = () => {
    router.push("/map");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Header */}
      <div className="relative w-full h-16 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between h-full px-4">
          <button
            onClick={handleBackToMap}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Quay lại bản đồ</span>
          </button>
          
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={20} />
            <span className="font-medium">{name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Region Image */}
          <div className="relative w-full h-96 mb-8 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={imageSrc}
              alt={name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{name}</h1>
            </div>
          </div>

          {/* Region Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Về {name}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* Additional Content Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Thông tin chi tiết
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tên vùng:</span>
                  <span className="font-medium">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ID:</span>
                  <span className="font-medium">{id}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Khám phá thêm
              </h3>
              <p className="text-gray-600">
                Khám phá thêm về lịch sử và văn hóa của {name} trong 
                hành trình du lịch tâm linh.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
