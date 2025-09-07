const GameCard = ({ title, subtitle, bgColor = "bg-gray-700", textColor = "text-white" }: { title: string, subtitle: string, bgColor: string, textColor: string }) => {
    return (
        <div className={`${bgColor} ${textColor} p-4 h-full flex flex-col justify-between relative`}>
            <div className="absolute top-2 right-2 w-4 h-6 bg-red-600 rounded-sm"></div>
            <div className="flex-1 flex items-center justify-center">
                <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mb-2">
                    <div className="w-6 h-8 bg-orange-600 rounded"></div>
                </div>
            </div>
            <div className="text-center">
                <p className="text-xs font-bold">{title}</p>
                {subtitle && <p className="text-xs opacity-80">{subtitle}</p>}
            </div>
        </div>
    );
};

export default GameCard;