import imageDescriptions from "@/content/image-descriptions.json";
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
  studio: { src: studio, alt: imageDescriptions.studio },
  outdoor: { src: outdoor, alt: imageDescriptions.outdoor },
  coast: { src: coast, alt: imageDescriptions.coast },
  smile: { src: smile, alt: imageDescriptions.smile },
  formal: { src: formal, alt: imageDescriptions.formal },
  casual: { src: casual, alt: imageDescriptions.casual },
} as const;
