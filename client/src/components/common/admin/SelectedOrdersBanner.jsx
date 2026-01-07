import { Trash2 } from "lucide-react"

function SelectedOrdersBanner({ selectedCount, onClear }) {
  return (
     <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
        {selectedCount} order(s) selected
        </span>
        <div className="flex items-center gap-2">
        <button 
            onClick={onClear} 
            className="cursor-pointer flex items-center gap-1 px-3 py-1.5 text-md bg-red-500 text-white hover:text-gray-50 rounded-lg"
        >
            <span>
                Clear
            </span>
            <Trash2 className="inline-block w-4 h-3" />
        </button>
        </div>
    </div>
  )
}

export default SelectedOrdersBanner