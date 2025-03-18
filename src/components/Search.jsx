import React, { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState(""); // State to store input value
  const [results, setResults] = useState([]); // State to store API response

  const handleSearch = async () => {
    if (!query) return alert("Please enter a search term!");

    try {
      const response = await fetch(`http://localhost:4000/youtube/api/search?query=${query}`);
      console.log("response",response);
      
      const data = await response.json();
      console.log("data",data,);
      
      setResults(data.items || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="p-4 ">
      <div className="flex gap-2 max-w-lg mx-auto">
        <input
          type="text"
          className="border p-2 w-full rounded-md"
          placeholder="Search YouTube videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      {/* Display results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.length > 0 ? (
          results.map((video, index) => (
            <div key={index} className="border-b p-2 flex  ">
              <img src={video.snippet?.thumbnails?.default?.url} alt="thumbnail" />
              <div>
              <h3 className="font-bold">{video.snippet?.title}</h3>
              <p>{video.snippet?.channelTitle}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
