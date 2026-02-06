import { prisma } from "@/lib/prisma";
import {
  Star,
  MapPin,
  GraduationCap,
  DollarSign,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";

const List = async () => {
  const scholarships = await prisma.scholarship.findMany({
    where: { isFeatured: true },
    orderBy: { updatedAT: "desc" },
    take: 4,
  });

  const formatAmount = (amount: number, currency: string) => {
    return `${currency} ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {scholarships.map((scholarship, index) => (
        <div
          key={scholarship.id}
          className={
            "bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-emerald-200 group overflow-hidden"
          }
          style={{ transitionDelay: `${200 + index * 100}ms` }}
        >
          {/* Card header */}
          <div className="p-6 pb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {scholarship.title}
                </h3>
                <p className="text-gray-700 font-medium">
                  {scholarship.providerName}
                </p>
              </div>
              {scholarship.isFeatured && (
                <div className="flex items-center gap-1 bg-linear-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                  <Star className="w-3.5 h-3.5 fill-white" />
                  Featured
                </div>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {scholarship.description}
            </p>

            {/* Key details */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-gray-700 font-medium">
                  {scholarship.targetCountry}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">
                  {scholarship.degreeLevel}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <DollarSign className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-gray-700 font-semibold">
                  {formatAmount(scholarship.amount, scholarship.currency)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-red-600" />
                </div>
                <span className="text-gray-700 font-medium">
                  {scholarship.deadline
                    ? formatDate(scholarship.deadline)
                    : "No deadline"}
                </span>
              </div>
            </div>
          </div>

          {/* Card footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              Updated {formatDate(scholarship.updatedAT)}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 font-semibold group/btn"
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
