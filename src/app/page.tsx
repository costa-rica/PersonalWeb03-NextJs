import HeroSection from "@/src/components/HeroSection";
import ProjectsSection from "@/src/components/ProjectsSection";
import ResumeSection from "@/src/components/ResumeSection";
import BlogSection from "@/src/components/BlogSection";

export default function HomePage() {
  return (
    <main className="bg-white">
      <HeroSection />
      <ProjectsSection />
      <ResumeSection />
      <BlogSection />
    </main>
  );
}
