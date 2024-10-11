import { useState,useEffect } from "react";
import Displaysurah from "./Displaysurah";



const LoadMore = ()=>{

  function removeArabicDiacritics(text) {
    return text.replace(/[\u0617-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, '');
  }
  
  const [surah, setSurah] = useState("");
  const [selectedSurah, setSelectedSurah]= useState(null)
  const [search,setSearch] = useState("")
  console.log(search)

    useEffect(() => {
      fetch('http://api.alquran.cloud/v1/surah')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setSurah(data.data);
        });
    }, []);




    return (
      <>
      <form action="" class="max-w-md mx-auto">
      <div className="relative">
      <div class="flex justify-center items-center">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" placeholder="Search a Surah" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=>setSearch(e.target.value)} />
      </div>
      </div>
      </form>
      
      
      {selectedSurah == null && surah.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {surah
              .filter((ayah) => {
                return search === ""
                  ? ayah
                  : removeArabicDiacritics(ayah.name).includes(search);
              })
              .map((ayah) => (
                <div
                  key={ayah.number}
                  className="p-4 mt-5 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md cursor-pointer transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => {
                    setSelectedSurah(ayah.number);
                  }}
                >
                  <p className="text-lg font-semibold gulzar-regular">
                    {ayah.number} {ayah.name}
                  </p>
                </div>
              ))}
          </div>
        ) : null} 
       {selectedSurah !== null && (
          <>
            <button
              className="mb-4 px-2 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors text-center"
              onClick={() => setSelectedSurah(null)}
            >
              Back to Surah List
            </button>
            <Displaysurah number={selectedSurah} />
          </>
        )}
      </>
    );
  };
export default LoadMore