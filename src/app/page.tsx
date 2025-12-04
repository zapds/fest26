import CountdownTimer from "@/components/CountdownTimer";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import Sponsors from "@/components/Sponsors";

export default function Home() {
  // Set target date to 3 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);

  return (
    <>
      <CountdownTimer targetDate={targetDate} />
      <AboutSection />
      <Sponsors />
      <Footer />
    </>
  );
}
