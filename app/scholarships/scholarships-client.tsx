"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  GraduationCap,
  Star,
  Clock,
  ArrowRight,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import OptionalSignInCard from "@/components/optional-signin-card";

interface Scholarship {
  id: string;
  slug: string;
  title: string;
  providerName: string;
  targetCountry: string;
  deadline: Date | null;
  description: string;
  amount: number;
  currency: string;
  degreeLevel: string;
  isFeatured: boolean;
  views: number;
  updatedAt: Date;
}

interface ScholarshipsClientProps {
  scholarships: Scholarship[];
}

export default function ScholarshipsClient({
  scholarships,
}: ScholarshipsClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);
  const [selectedAmount, setSelectedAmount] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [displayCount, setDisplayCount] = useState(6);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { value: "recent", label: "Most Recent", icon: Clock },
    { value: "deadline-soon", label: "Deadline: Soonest", icon: Calendar },
    { value: "amount-high", label: "Amount: High to Low", icon: DollarSign },
    { value: "amount-low", label: "Amount: Low to High", icon: DollarSign },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Extract unique countries from scholarships
  const countries = Array.from(
    new Set(scholarships.map((s) => s.targetCountry)),
  ).sort();

  const degreeTypes = ["Bachelor", "Master", "PhD", "Diploma"];

  const amountRanges = [
    { label: "Any Amount", value: "" },
    { label: "Under $10,000", value: "0-10000" },
    { label: "$10,000 - $25,000", value: "10000-25000" },
    { label: "$25,000 - $50,000", value: "25000-50000" },
    { label: "Above $50,000", value: "50000+" },
  ];

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country],
    );
  };

  const toggleDegree = (degree: string) => {
    setSelectedDegrees((prev) =>
      prev.includes(degree)
        ? prev.filter((d) => d !== degree)
        : [...prev, degree],
    );
  };

  const clearFilters = () => {
    setSelectedCountries([]);
    setSelectedDegrees([]);
    setSelectedAmount("");
    setSearchQuery("");
  };

  const activeFiltersCount =
    selectedCountries.length +
    selectedDegrees.length +
    (selectedAmount ? 1 : 0) +
    (searchQuery ? 1 : 0);

  // Filter scholarships based on search and filters
  const filteredScholarships = scholarships
    .filter((scholarship) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        scholarship.title.toLowerCase().includes(searchLower) ||
        scholarship.providerName.toLowerCase().includes(searchLower) ||
        scholarship.targetCountry.toLowerCase().includes(searchLower);

      // Country filter
      const matchesCountry =
        selectedCountries.length === 0 ||
        selectedCountries.includes(scholarship.targetCountry);

      // Degree filter
      const matchesDegree =
        selectedDegrees.length === 0 ||
        selectedDegrees.some((degree) =>
          scholarship.degreeLevel.includes(degree),
        );

      // Amount filter
      const matchesAmount =
        !selectedAmount ||
        (() => {
          const [min, max] = selectedAmount
            .split("-")
            .map((v) => (v === "+" ? Infinity : parseInt(v)));
          return scholarship.amount >= min && scholarship.amount <= max;
        })();

      return matchesSearch && matchesCountry && matchesDegree && matchesAmount;
    })
    // Sort: featured first, then by other criteria
    .sort((a, b) => {
      // Always put featured scholarships first
      if (a.isFeatured !== b.isFeatured) {
        return a.isFeatured ? -1 : 1;
      }

      // Then apply the selected sort option
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case "deadline-soon":
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return (
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          );
        case "amount-high":
          return b.amount - a.amount;
        case "amount-low":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

  const formatDate = (dateString: string | number | Date | null) => {
    if (!dateString) return "No deadline";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return `${currency} ${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Browse{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
            Scholarships
          </span>
        </h1>

        <OptionalSignInCard />

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search scholarships, universities, countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter Button */}
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="border-2 border-gray-300 hover:border-emerald-500 hover:bg-emerald-50 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 relative"
          >
            <Filter className="w-5 h-5" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Clear all
                  </button>
                )}
              </div>

              {/* Country Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  Country
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {countries.map((country) => (
                    <label
                      key={country}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCountries.includes(country)}
                        onChange={() => toggleCountry(country)}
                        className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">{country}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Degree Level Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  Degree Level
                </h3>
                <div className="space-y-2">
                  {degreeTypes.map((degree) => (
                    <label
                      key={degree}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDegrees.includes(degree)}
                        onChange={() => toggleDegree(degree)}
                        className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">{degree}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Scholarship Amount Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  Scholarship Amount
                </h3>
                <div className="space-y-2">
                  {amountRanges.map((range) => (
                    <label
                      key={range.value}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <input
                        type="radio"
                        name="amount"
                        checked={selectedAmount === range.value}
                        onChange={() => setSelectedAmount(range.value)}
                        className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scholarships Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-semibold">
                  {filteredScholarships.length}
                </span>{" "}
                scholarships
              </p>

              {/* Modern Sort Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-300 hover:border-emerald-500 rounded-xl text-sm font-medium text-gray-700 hover:text-emerald-600 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  {(() => {
                    const option = sortOptions.find(
                      (opt) => opt.value === sortBy,
                    );
                    if (option?.icon) {
                      const Icon = option.icon;
                      return <Icon className="w-4 h-4" />;
                    }
                    return null;
                  })()}
                  <span>
                    {sortOptions.find((opt) => opt.value === sortBy)?.label}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showSortDropdown ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {showSortDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-300 rounded-xl shadow-lg z-20">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${sortBy === option.value
                            ? "bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600"
                            : "text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Scholarship Cards */}
            <div className="grid gap-6">
              {filteredScholarships
                .slice(0, displayCount)
                .map((scholarship) => (
                  <div
                    key={scholarship.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-emerald-200 group"
                  >
                    <div className="p-6 pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                              {scholarship.title}
                            </h3>
                            {scholarship.isFeatured && (
                              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">
                            {scholarship.providerName}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {scholarship.description}
                      </p>

                      {/* Key Info Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                            <DollarSign className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Amount</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {formatAmount(
                                scholarship.amount,
                                scholarship.currency,
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                            <GraduationCap className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Degree</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {scholarship.degreeLevel}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                            <MapPin className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Country</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {scholarship.targetCountry}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                            <Calendar className="w-4 h-4 text-red-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Deadline</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {formatDate(scholarship.deadline)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        Updated {formatDate(scholarship.updatedAt)}
                      </div>
                      <Button
                        onClick={() =>
                          router.push(`/scholarships/${scholarship.slug}`)
                        }
                        className="text-white bg-emerald-600 hover:text-emerald-900 hover:bg-emerald-500 font-semibold group/btn"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Load More Button */}
            {displayCount < filteredScholarships.length && (
              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setDisplayCount((prev) => prev + 6)}
                  className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-10 py-6 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Load More Scholarships
                  <ChevronDown className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
