import Image from "next/image"
import Link from "next/link"

export default function author({ name, image, email }) {
  if(!name && !image) return <></>;

  return (
    <div className="author flex py-5">
        <Image src={image || ""} width={50} height={50} className="rounded-full" alt="no picture"></Image>        
        <div className="flex flex-col justify-center px-4">
            <Link href={"/"}><a className="text-xs font-bold text-gray-500 hover:text-gray-600">{name || "No Name"}</a></Link>
            <span className="text-xs text-gray-400">{email || ""}</span>
        </div>
    </div>
  )
}
