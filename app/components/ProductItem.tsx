import Image from "next/image";

export default function ProductItem({
  imageSrc,
  name,
}: {
  imageSrc?: string;
  name?: string;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center border border-gray-100 rounded-2xl bg-white p-8 gap-2 shadow-lg">
      <Image
        src={imageSrc || "/"}
        alt={`Item to guess the price of ${name}`}
        width={500}
        height={500}
      />
      <p>{name}</p>
    </div>
  );
}
