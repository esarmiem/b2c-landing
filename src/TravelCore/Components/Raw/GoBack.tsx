import {CornerUpLeft} from "lucide-react";

export function GoBack({title, url}: {title: string, url: string}) {

  return (
    <a href={url} className="rounded-lg">
      <button className="flex text-sm text-grey-600 items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-100">
        <CornerUpLeft className="w-4 h-4" />{title}
      </button>
    </a>
  )
}