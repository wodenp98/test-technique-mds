"use client";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "../../../components/select/Select";
import { Search } from "lucide-react";
import {
  optionsOrder,
  optionsCategory,
  optionsColors,
} from "../../../data/optionsDataApi";

export default function ImagePage() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("");
  const [colors, setColors] = useState("");
  const [totalHits, setTotalHits] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  let timeoutId;

  useEffect(() => {
    handleSearch(query, currentPage, category, order, colors);
  }, [currentPage, category, order, colors, query]);

  const handleSearch = async (query, page, category, order, colors) => {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&q=${query}&lg=fr&page=${page}&per_page=20&colors=${colors}&category=${category}&order=${order}&safesearch=true`
    );
    const hits = response.data.hits;
    const imageUrls = hits.map((hit) => hit.webformatURL);
    const totalHits = response.data.totalHits;
    setImages(imageUrls);
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

  const handleColorsChange = (e) => {
    const colors = e.target.value;
    setColors(colors);
    handleSearch(query, 1, category, order, colors);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setCategory(category);
    handleSearch(query, 1, category, order, colors);
  };

  const handleOrderChange = (e) => {
    const order = e.target.value;
    setOrder(order);
    handleSearch(query, 1, category, order, colors);
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

      <div className="flex justify-between">
        <div className="flex">
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
        {images.map((imageUrl, index) => (
          <div className="border rounded-lg overflow-hidden" key={imageUrl}>
            <Image
              src={imageUrl}
              alt={imageUrl}
              width={500}
              height={500}
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
        {images.length > 0 && (
          <p>
            Page {currentPage} of {Math.ceil(totalHits / 20)}
          </p>
        )}
        {currentPage &&
          images.length > 0 &&
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
