"use client"
import { usePathname } from "next/navigation";

const ShelfDetails = () => { 
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Extract the last part of the path as ID

  return (
    <div className="p-4">
      <h1>Shelf ID: {id}</h1> 
    </div>
  );
};

export default ShelfDetails;
