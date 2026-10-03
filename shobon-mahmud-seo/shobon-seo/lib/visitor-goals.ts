import copy from "@/content/copy-components-content-ContextCta.json";
import formCopy from "@/content/copy-components-forms-ContactForm.json";

export const visitorGoals = [
  { id: "traffic", label: copy.text_005, description: copy.text_006, service: "/services/keyword-research", formGoal: formCopy.text_005 },
  { id: "leads", label: copy.text_007, description: copy.text_008, service: "/services/on-page-seo", formGoal: formCopy.text_006 },
  { id: "local", label: copy.text_009, description: copy.text_010, service: "/services/local-seo", formGoal: formCopy.text_007 },
] as const;
