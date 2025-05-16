type CardProps = {
    cardText: string,
    src: string
}

export default function Card ( { cardText, src }: CardProps ) {
    return (
        <div className="relative h-48 rounded-2xl shadow hover:shadow-lg transition hover:scale-102">
            <img
                src={ src }
                alt={ cardText }
                className="w-full h-full object-cover mb-2 rounded"
            />
            <p className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-2 py-1 text-white bg-white/40 rounded-md text-center whitespace-nowrap">{ cardText }</p>
        </div>
    )
}