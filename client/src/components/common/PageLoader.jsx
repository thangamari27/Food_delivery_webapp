import React from "react";

function PageLoader() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center flex-col bg-orange-50">
      <div className="grid grid-cols-3 gap-2 w-[70px] h-[70px]">
        <span className="bg-orange-400 animate-bounce [animation-delay:0ms]" />
        <span className="bg-orange-200 animate-bounce [animation-delay:200ms]" />
        <span className="bg-orange-400 animate-bounce [animation-delay:300ms]" />
        <span className="bg-orange-200 animate-bounce [animation-delay:400ms]" />
        <span className="bg-orange-400 animate-bounce [animation-delay:500ms]" />
        <span className="bg-orange-200 animate-bounce [animation-delay:600ms]" />
      </div>
      <p className="mt-3 text-gray-400 font-medium">Loading..</p>
    </div>
  );
}

export default PageLoader;