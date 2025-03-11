"use client"; 
import { useState, useEffect } from "react";
import { NextPage } from "next";
import Footer from "@/components/Footer";
import BottomNavigationBar from "@/components/BottomNav";
import Shop from "@/components/shop";
import Back from "@/components/Back";
import HeadNavigation from "@/components/HeadNavigation";

const ShopsPage: NextPage = () => {
  const [isMounted, setIsMounted] = useState(false);  // State to track if component is mounted
  //const router = useRouter();
  
  // Wait for the component to mount before accessing the router
  useEffect(() => {
    setIsMounted(true);
  }, []);

  //const { query } = router.query;
  const [] = useState([0, 1000]);
  const [] = useState<string | null>(null);
  const [] = useState<string | null>(null);
  const [, setSelectedShop] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");

  //const colors = ["#ff199c", "#182155", "#f3f3f3", "#000000"];

   // Dummy product data


  // Reset all filters

   // Filter and sort products based on the selected filters

  /*useEffect(() => {
    if (isMounted && query) {
      // If query is an array, take the first value
      setSearchQuery(Array.isArray(query) ? query[0] : query);
    }
  }, [isMounted, query]); // This ensures query is updated only after mount
*/
  // Render the page only after the component is mounted
  if (!isMounted) {
    return null; // Optionally render a loading indicator here
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
     <HeadNavigation />
      <div className="max-w-screen-xl mx-auto p-4">
      <Shop />
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
  
};

export default ShopsPage;

