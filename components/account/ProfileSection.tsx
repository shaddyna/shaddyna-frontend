// components/profile/ProfileSection.tsx
"use client";

import { ReactNode } from "react";

interface ProfileSectionProps {
  title?: string;
  children: ReactNode;
  action?: ReactNode;
}

export const ProfileSection = ({ title, children, action }: ProfileSectionProps) => {
  return (
    <div>
      {(title || action) && (
        <div className="flex justify-between items-center mb-6">
          {title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};



// components/profile/ProfileSection.tsx
/*"use client";

import { ReactNode } from "react";
import { Plus } from "lucide-react";

interface ProfileSectionProps {
  title?: string;
  children: ReactNode;
  action?: ReactNode;
}

export const ProfileSection = ({ title, children, action }: ProfileSectionProps) => {
    function onAdd(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        // You can implement your add logic here, e.g., open a modal or call a callback
        if (action && typeof action === "function") {
            (action as () => void)();
        }
    }
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#f4b500] hover:bg-[#d4a017] text-black font-bold rounded-full transition-colors"
        >
          <Plus size={16} /> Add {(title ? title.split(" ")[0] : "Item")}
        </button>
      </div>
      <div>
        {(title || action) && (
          <div className="flex justify-between items-center mb-6">
            {title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}
            {action && <div>{action}</div>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};*/

