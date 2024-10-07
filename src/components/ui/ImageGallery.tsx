"use client";

import LightGallery from "lightgallery/react";

import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import Image from "next/image";
import Link from "next/link";

interface IProps {
  images: string[];
}

export default function ImageGallery({ images }: IProps) {
  return (
    <LightGallery
      elementClassNames={` mt-2 gap-2 grid place-items-center grid-cols-2
         ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"} `}
      speed={500}
      plugins={[lgThumbnail, lgZoom]}
    >
      {images?.map((image, index) => (
        <Link
          className={`w-full ${
            images.length === 3 && index === 0 && "col-span-2"
          } ${images.length === 1 && "col-span-2"}`}
          key={index}
          href={image}
        >
          <Image
            className={`w-full object-cover ${
              images.length === 1 ? "h-[400px]" : "h-[300px]"
            }`}
            src={image}
            height={300}
            width={300}
            alt={`image-${index}`}
          />
        </Link>
      ))}
    </LightGallery>
  );
}
