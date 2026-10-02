import imageSources from "@/content/image-sources.json";
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
  studio: { src: imageSources.studio ? {...studio, src: imageSources.studio} : studio, alt: imageDescriptions.studio },
  outdoor: { src: imageSources.outdoor ? {...outdoor, src: imageSources.outdoor} : outdoor, alt: imageDescriptions.outdoor },
  coast: { src: imageSources.coast ? {...coast, src: imageSources.coast} : coast, alt: imageDescriptions.coast },
  smile: { src: imageSources.smile ? {...smile, src: imageSources.smile} : smile, alt: imageDescriptions.smile },
  formal: { src: imageSources.formal ? {...formal, src: imageSources.formal} : formal, alt: imageDescriptions.formal },
  casual: { src: imageSources.casual ? {...casual, src: imageSources.casual} : casual, alt: imageDescriptions.casual },
} as const;
