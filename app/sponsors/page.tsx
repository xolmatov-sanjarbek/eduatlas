import { Metadata } from "next";
import SponsorsPageClient from "@/components/sponsors-page-client";

export const metadata: Metadata = {
    title: "Our Sponsors | EduAtlas",
    description: "Meet the organizations helping us make education accessible to students worldwide.",
};

export default function SponsorsPage() {
    return <SponsorsPageClient />;
}
