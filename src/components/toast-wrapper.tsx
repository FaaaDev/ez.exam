import React from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import success from "@/assets/success.lottie";
import error from "@/assets/error.lottie"

export default function ToastWrapper({
  label,
  description,
  type,
  action,
}: {
  label: string;
  description?: string;
  type?: "default" | "success" | "error" | "action";
  action?: React.ReactNode;
}) {
  if (type === "success") {
    return (
      <div className="flex gap-2">
        {/* <div className="h-5.5 w-5.5 bg-green-500 rounded-md flex items-center justify-center p-1"> */}
          <DotLottieReact className="h-7 w-7" src={success} loop autoplay />
        {/* </div> */}
        <div className="flex flex-col gap-1">
          <span className="font-semibold">{label}</span>
          {description && (
            <span className="text-muted-foreground">{description}</span>
          )}
        </div>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className="flex gap-2">
        {/* <div className="h-5.5 w-5.5 bg-[#feb72b] rounded-md flex items-center justify-center p-1"> */}
        <DotLottieReact className="h-7 w-7" src={error} loop autoplay />
        {/* </div> */}
        <div className="flex flex-col gap-1">
          <span className="font-semibold">{label}</span>
          {description && (
            <span className="text-muted-foreground">{description}</span>
          )}
        </div>
      </div>
    );
  }
  if (type === "action") {
    return (
      <div className="flex gap-4 items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-semibold">{label}</span>
          {description && (
            <span className="text-muted-foreground">{description}</span>
          )}
        </div>
        {action && action}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="font-semibold">{label}</span>
      {description && (
        <span className="text-muted-foreground">{description}</span>
      )}
    </div>
  );
}
