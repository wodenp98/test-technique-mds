"use client";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "../../../components/select/Select";
import { Search } from "lucide-react";
import {
  optionsCategory,
  optionsColors,
  optionsVideoType,
} from "../../../data/optionsDataApi";

export default function VideoPage() {
  const [query, setQuery] = useState("");
  const [video, setVideo] = useState([]);
  const [category, setCategory] = useState("");
  const [videoType, setVideoType] = useState("");
  const [order, setOrder] = useState("");
  const [colors, setColors] = useState("");
  const [totalHits, setTotalHits] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    handleSearch(videoType, query, currentPage, category, order, colors);
  }, [currentPage, category, order, colors, videoType, query]);

  let timeoutId;

  const handleSearch = async (
    query,
    page,
    category,
    order,
    colors,
    videoType
  ) => {
    const response = await axios.get(
      `https://pixabay.com/api/videos/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&q=${query}&video_type=${videoType}&lg=fr&page=${page}&per_page=20&colors=${colors}&category=${category}&order=${order}&safesearch=true`
    );
    const hits = response.data.hits;
    const videoUrls = hits.map((hit) => hit.videos.medium.url);
    const totalHits = response.data.totalHits;
    setVideo(videoUrls);
    setTotalHits(totalHits);
  };

  const handleQueryChange = (e) => {
    const query = e.target.value;
    setQuery(query);
    setCurrentPage(1);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      handleSearch(query, 1);
    }, 500);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    handleSearch(query, currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    handleSearch(query, currentPage + 1);
  };

  const handleVideoTypeChange = (e) => {
    const videoType = e.target.value;
    setVideoType(videoType);
    handleSearch(query, 1, category, order, colors, videoType);
  };

  const handleColorsChange = (e) => {
    const colors = e.target.value;
    setColors(colors);
    handleSearch(query, 1, category, order, colors, videoType);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setCategory(category);
    handleSearch(query, 1, category, order, colors, videoType);
  };

  const handleOrderChange = (e) => {
    const order = e.target.value;
    setOrder(order);
    handleSearch(query, 1, category, order, colors, videoType);
  };

  return (
    <div className="p-4">
      <form onSubmit={(e) => e.preventDefault()} className="mb-4">
        <div className="flex space-x-2 w-1/2">
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            className="px-4 py-2 border rounded-l-md flex-grow"
            placeholder="Search"
          />
          <button
            type="submit"
            className="px-4 py-2  bg-green-700/70 text-white rounded-r-md hover:bg-green-900/70"
          >
            <Search size={24} />
          </button>
        </div>
      </form>
      <p>{totalHits} results found</p>
      <div className="flex justify-between">
        <div className="flex">
          <Select
            label="Video Type"
            options={optionsVideoType}
            value={videoType}
            onChange={handleVideoTypeChange}
          />
          <Select
            options={optionsCategory}
            value={category}
            onChange={handleCategoryChange}
          />
          <Select
            options={optionsOrder}
            value={order}
            onChange={handleOrderChange}
          />
          <Select
            options={optionsColors}
            value={colors}
            onChange={handleColorsChange}
          />
        </div>

        <p className="mb-2">{totalHits} results found</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {video.map((video) => (
          <div className="border rounded-lg overflow-hidden" key={video}>
            <video
              src={video}
              alt={video}
              width={500}
              height={500}
              controls
              type="video/mp4"
              className="w-full h-72  object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        {currentPage > 1 && (
          <button
            onClick={handlePrevPage}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            Prev
          </button>
        )}
        {video.length > 0 && (
          <p>
            Page {currentPage} of {Math.ceil(totalHits / 20)}
          </p>
        )}
        {currentPage &&
          video.length > 0 &&
          currentPage < Math.ceil(totalHits / 20) && (
            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-green-700/70 text-white hover:bg-green-900/70 rounded-md"
            >
              Next
            </button>
          )}
      </div>
    </div>
  );
}
