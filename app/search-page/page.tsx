"use client"; // ✅ Ensure this is a Client Component
import { Suspense } from "react";
import SearchResults from "@/components/SearchResults";
import Back from "@/components/Back";
import Footer from "@/components/Footer";
import BottomNavigationBar from "@/components/BottomNav";

export default function SearchPage() {
  return (
    <div>
        <Back title={"Search Page"} />
    <Suspense fallback={<p className="text-center text-gray-600">Loading search results...</p>}>
      <SearchResults />
    </Suspense>
    <Footer />
    <BottomNavigationBar />
    </div>
  );
}
