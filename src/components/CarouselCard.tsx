"use client";

import * as React from "react";
import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export default function CarouselCard() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000); // Auto-slide mỗi 3s

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="text-2xl font-bold mt-5">Our courses</div>
      <div
        className="overflow-hidden w-[80%] p-3 mx-auto carousel-mask"
        ref={emblaRef}
      >
        <div className="flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="min-w-0 flex-[0_0_80%] sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%] p-1"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Create project</CardTitle>
                  <CardDescription>
                    Deploy your new project in one-click.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">View more</Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
