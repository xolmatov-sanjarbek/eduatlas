import About from "@/components/about";
import FooterStandard from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import ScholarshipsSection from "@/components/scholarships";
import SponsorsSection from "@/components/sponsors";

const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <ScholarshipsSection />
      <div id="sponsors">
        <SponsorsSection />
      </div>
      <About />
    </main>
  );
};

export default Home;
