import type { CaseStudy, Category } from "../types";
import { aiTeacherPlatform } from "./ai-teacher-platform";
import { enterpriseLogisticsSaas } from "./enterprise-logistics-saas";
import { productDiscoveryFeatureDelivery } from "./product-discovery-feature-delivery";
import { digitalTicketingExperience } from "./digital-ticketing-experience";
import { modularLandingPageSystem } from "./modular-landing-page-system";
import { uxDesignEvaluation } from "./ux-design-evaluation";
import { earlyChildhoodEducatorOs } from "./early-childhood-educator-os";
import { caloriesFitnessApp } from "./calories-fitness-app";

/**
 * Display order for the whole site. Cards, the mission archive, prev/next
 * navigation and static route generation all read this one array, so adding a
 * project is a single import plus one entry here.
 *
 * The first six are the featured set and appear on the homepage in this order.
 * The independent products that follow are reachable from the archive and from
 * the Product Lab, where they belong to a different story.
 */
export const PROJECTS: CaseStudy[] = [
  aiTeacherPlatform,
  enterpriseLogisticsSaas,
  productDiscoveryFeatureDelivery,
  digitalTicketingExperience,
  modularLandingPageSystem,
  uxDesignEvaluation,
  earlyChildhoodEducatorOs,
  caloriesFitnessApp,
];

export const FEATURED = PROJECTS.filter((p) => p.featured);

export const getProject = (slug: string): CaseStudy | undefined =>
  PROJECTS.find((p) => p.slug === slug);

/** Wraps around, so the last project leads back to the first. */
export function getNeighbours(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1) return { previous: undefined, next: undefined };
  const count = PROJECTS.length;
  return {
    previous: PROJECTS[(i - 1 + count) % count],
    next: PROJECTS[(i + 1) % count],
  };
}

/** Only categories actually in use, so the filter never shows an empty option. */
export function activeCategories(): Category[] {
  const seen = new Set<Category>();
  PROJECTS.forEach((p) => p.categories.forEach((c) => seen.add(c)));
  return Array.from(seen);
}
