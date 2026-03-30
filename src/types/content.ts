export interface LinkItem {
  label: string
  href: string
}

export interface ImageAsset {
  src: string
  alt: string
}

export interface SiteContent {
  siteName: string
  language: string
  phase: string
  footer: {
    navigationAriaLabel: string
    menu: LinkItem[]
    copyright: string
    agencyLink?: LinkItem
    sponsorLink?: LinkItem
  }
}

export interface HeroContent {
  sectionId: string
  title: string
  subtitle: string
  description: string
  impactHighlight?: string
  backgroundImage: ImageAsset
  logoImage: ImageAsset
  primaryCta: LinkItem
  secondaryCta: LinkItem
}

export interface ProgressContent {
  sectionId: string
  title: string
  goalEur: number
  labels: {
    totalRaised: string
    teamGoal: string
    lastUpdated: string
  }
  primaryCta?: LinkItem
  secondaryCta?: LinkItem
}

export interface AboutContent {
  sectionId: string
  title: string
  paragraphs: string[]
  donationLink?: LinkItem
  image: ImageAsset
}

export interface FundingContent {
  sectionId: string
  title: string
  paragraphs: string[]
  links?: LinkItem[]
}

export interface ActionItem {
  title: string
  description: string
  image: ImageAsset
  imageFit?: 'cover' | 'contain'
  meta?: string
}

export interface ActionsContent {
  sectionId: string
  title: string
  notice?: string
  items: ActionItem[]
}

export interface GalleryImage {
  src: string
  alt: string
  caption?: string
  layout?: 'default' | 'featured'
}

export interface GalleryContent {
  sectionId: string
  title: string
  intro?: string
  images: GalleryImage[]
}

export interface SponsorshipTier {
  name: string
  contribution: string
  benefits: string[]
}

export interface SponsoringContent {
  sectionId: string
  title: string
  intro: string
  note?: string
  cta?: LinkItem
  tableHeaders: {
    package: string
    contribution: string
    benefits: string
  }
  tiers: SponsorshipTier[]
}

export interface SponsorItem {
  name: string
  href: string
  logoSrc: string
  logoAlt: string
  logoSize?: 'default' | 'large'
  logoScale?: number
}

export interface SponsorsContent {
  sectionId: string
  title: string
  subtitle?: string
  items: SponsorItem[]
}

export interface ContactItem {
  label: string
  value: string
  href: string
}

export interface ContactContent {
  sectionId: string
  title: string
  introParagraphs?: string[]
  items: ContactItem[]
}

export interface ContentBundle {
  site: SiteContent
  hero: HeroContent
  progress: ProgressContent
  about: AboutContent
  funding: FundingContent
  actions: ActionsContent
  gallery: GalleryContent
  sponsoring: SponsoringContent
  sponsors: SponsorsContent
  contact: ContactContent
}
