import About from "@/components/about";
import FooterStandard from "@/components/footer";
import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import Navbar from "@/components/navbar";
import ScholarshipsSection from "@/components/scholarships";

const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
      <ScholarshipsSection />
      <About />
    </main>
  );
};

export default Home;
