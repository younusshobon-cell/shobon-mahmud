import studio from "@/assets/images/portrait-studio.jpg";
import outdoor from "@/assets/images/portrait-outdoor.jpg";
import coast from "@/assets/images/portrait-coast.jpg";
import smile from "@/assets/images/portrait-smile.jpg";
import formal from "@/assets/images/portrait-formal.jpg";
import casual from "@/assets/images/portrait-casual.jpg";

/**
 * Shobon's photos. Static imports give Next/Image intrinsic sizes and blur placeholders.
 * To swap a photo, replace the file in /assets/images and keep the same name.
 */
export const photos = {
  studio: { src: studio, alt: "Shobon Mahmud, SEO specialist, smiling in a white shirt against a navy background" },
  outdoor: { src: outdoor, alt: "Shobon Mahmud standing on a tree-lined road in a white shirt" },
  coast: { src: coast, alt: "Black and white photo of Shobon Mahmud sitting on his motorbike by the sea" },
  smile: { src: smile, alt: "Close-up portrait of Shobon Mahmud smiling" },
  formal: { src: formal, alt: "Shobon Mahmud in a dark suit and tie" },
  casual: { src: casual, alt: "Portrait of Shobon Mahmud in a navy t-shirt" },
} as const;
