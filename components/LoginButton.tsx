"use client";
import React from "react";

interface LoginButtonProps {
  handleLoginClick: () => void;
  className?: string;
}

export const LoginButton = ({ handleLoginClick, className }: LoginButtonProps) => (
  <button
    className={`px-4 py-2 rounded-lg border-2 border-blue text-sm font-medium hover:bg-white hover:text-[#182155] text-blue ${className}`}
    onClick={handleLoginClick}
  >
    Login/Register
  </button>
);