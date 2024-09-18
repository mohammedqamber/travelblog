import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Loader2 className="animate-spin duration-300 text-black" />
    </div>
  );
};

export default Loading;