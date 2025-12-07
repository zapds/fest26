"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    time: "10:00 AM",
    title: "Opening Ceremony",
    description: "Kickstarting the fest with an electrifying opening ceremony.",
  },
  {
    time: "12:00 PM",
    title: "Robotics Competition",
    description: "Witness the clash of titans in the robotics arena.",
  },
  {
    time: "02:00 PM",
    title: "Hackathon",
    description: "Coders race against time to build innovative solutions.",
  },
  {
    time: "04:00 PM",
    title: "Guest Lecture",
    description: "An inspiring talk by a renowned industry expert.",
  },
  {
    time: "06:00 PM",
    title: "Cultural Night",
    description: "A vibrant evening of music, dance, and drama.",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;

    // Add generic type here to fix TypeScript error
    const events = gsap.utils.toArray<HTMLElement>(".timeline-event");

    if (section && timeline) {
      // Animate the timeline line
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }
      );

      // Animate each event
      events.forEach((event) => {
        const isLeft = event.classList.contains("justify-start");

        gsap.fromTo(
          event,
          {
            x: isLeft ? -200 : 200,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: event,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-black py-20 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <h2
          className={`mb-16 text-5xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl`}
        >
          <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Timeline
          </span>
        </h2>
        <div ref={timelineRef} className="relative">
          <div className="timeline-line absolute left-1/2 h-full w-1 bg-gradient-to-b from-orange-400 via-pink-500 to-purple-500"></div>
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`timeline-event mb-8 flex items-center w-full ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`w-1/2 ${
                  index % 2 === 0 ? "pr-8" : "pl-8"
                }`}
              >
                <div
                  className={`p-6 rounded-lg shadow-lg bg-zinc-800/50 backdrop-blur-sm border border-white/10 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                >
                  <p className="text-sm font-bold text-orange-400">
                    {event.time}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-zinc-300">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
