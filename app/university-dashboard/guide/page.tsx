import Link from "next/link";
import { ArrowLeft, CheckCircle2, Info, FileText, Globe2, Users, ShieldCheck } from "lucide-react";

export default function UniversityGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/university-dashboard"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">University Guide</h1>
              <p className="text-gray-500 mt-1">Best practices for creating high‑quality scholarship listings.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Clear Title & Purpose</h3>
                  <p className="text-gray-600 text-sm">
                    Use a descriptive title and summarize who the scholarship is for. Avoid internal codes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Detailed Description</h3>
                  <p className="text-gray-600 text-sm">
                    Include eligibility, benefits, required documents, and application steps.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe2 className="w-5 h-5 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Accurate Location & Regions</h3>
                  <p className="text-gray-600 text-sm">
                    Specify target country and eligible regions. This improves matching and search visibility.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Degree Level & Fields</h3>
                  <p className="text-gray-600 text-sm">
                    Add the correct degree level and fields of study to reach qualified applicants.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Set a Real Deadline</h3>
                  <p className="text-gray-600 text-sm">
                    Always include an application deadline and keep it updated.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Link to Official Website</h3>
                  <p className="text-gray-600 text-sm">
                    Provide a valid, public URL so students can verify and apply confidently.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 p-5 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-900 text-sm">
            Tip: Listings with complete details receive higher engagement and more qualified applications.
          </div>
        </div>
      </div>
    </div>
  );
}
