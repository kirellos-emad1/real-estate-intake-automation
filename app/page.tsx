"use client";
import Image from "next/image";
import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Image parallax scroll animation
    gsap.fromTo(
      ".scroll-image",
      {
        objectPosition: "50% 0%", // Start from top of image
      },
      {
        objectPosition: "50% 100%", // End at bottom of image
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll-section",
          start: "top top",
          end: "bottom bottom",
          scrub: true, // Smooth scroll-linked animation
        }
      }
    );
    
  }, []);

  return (
    <section className="scroll-section pt-12 h-[140vh] w-full">
      <div className="h-full w-full flex justify-center  py-10 px-10">
        <div className="relative h-[60%] w-full max-w-5xl overflow-hidden rounded-2xl">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPwpZhZxL7TgYdFzezHTQdi0xxwFzfjC3eXDwOX40BedldYvsEddajZz38cFouzPHl0xXo2MLtnT3M59xqXCy1JLQZgfFfgxpE3zBDNTDkS5TJ2bEVXt1LRC-23Zqysdvj4CJdkPy4mcs4YjDcqmSWp3V1ZRHcJxKcnWpaX3b1YjeAukTh02MypQGxciWmc2Bj4GZMpFzJwhWX5z1OfBmmDbdtKUv8pYGHwT4wKm64Or4RAl98SyaMdO1vOe2yHBPKGyKAMvkL-_DD"
            alt="House"
            fill
            priority
            sizes="100vw"
            className="scroll-image object-cover"
            style={{ objectPosition: "50% 0%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col gap-8 items-center justify-center text-white text-4xl font-bold">
            <h1 className="text-4xl text-amber-400 font-bold">Convert leads into clients—automatically.</h1>
            <p className="   text-lg text-center font-light max-w-3xl">Real Estate Intake Automation is a smart, plug-and-play platform that helps real estate firms capture leads, confirm appointments, and track team follow-ups — all without lifting a finger.</p>
            <Button className="bg-amber-400 hover:bg-amber-400/20 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out">
              <Link href="/book-a-viewing" className="text-white">Get Started</Link>
            </Button>
          </div>
        </div>
        
      </div>
      
    </section>
  );
}