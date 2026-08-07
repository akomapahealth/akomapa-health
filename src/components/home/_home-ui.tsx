/**
 * Backward-compatible homepage names for the shared editorial primitives.
 *
 * New public-page work should import the neutral `Editorial*` API directly.
 */
export {
  EditorialArrow as InlineArrow,
  EditorialArrowLink as HomeArrowLink,
  EditorialBand as HomeBand,
  EditorialButton as HomeButton,
  EditorialChevron as InlineChevron,
  EditorialEyebrow as HomeEyebrow,
  EditorialHeading as HomeHeading,
  EditorialLead as HomeLead,
  EditorialPlay as InlinePlay,
} from "@/components/shared/EditorialPrimitives";

export type {
  EditorialBandTone as HomeBandTone,
  EditorialBandProps as HomeBandProps,
  EditorialButtonProps as HomeButtonProps,
} from "@/components/shared/EditorialPrimitives";
