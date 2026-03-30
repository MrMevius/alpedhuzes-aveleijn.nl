import siteJson from '../../content/site.json'
import aboutJson from '../../content/sections/about.json'
import actionsJson from '../../content/sections/actions.json'
import contactJson from '../../content/sections/contact.json'
import fundingJson from '../../content/sections/funding.json'
import galleryJson from '../../content/sections/gallery.json'
import heroJson from '../../content/sections/hero.json'
import progressJson from '../../content/sections/progress.json'
import sponsoringJson from '../../content/sections/sponsoring.json'
import sponsorsJson from '../../content/sections/sponsors.json'
import type {
  AboutContent,
  ActionsContent,
  ContactContent,
  ContentBundle,
  FundingContent,
  GalleryContent,
  HeroContent,
  LinkItem,
  ProgressContent,
  SiteContent,
  SponsoringContent,
  SponsorsContent
} from '../types/content'
import {
  optionalString,
  requiredNumber,
  requiredObject,
  requiredObjectArray,
  requiredString,
  requiredStringArray
} from './validators'

function parseLink(value: unknown, context: string): LinkItem {
  const object = requiredObject(value, context)

  return {
    label: requiredString(object.label, `${context}.label`),
    href: requiredString(object.href, `${context}.href`)
  }
}

function parseImage(value: unknown, context: string) {
  const object = requiredObject(value, context)

  return {
    src: requiredString(object.src, `${context}.src`),
    alt: requiredString(object.alt, `${context}.alt`)
  }
}

function parseSiteContent(value: unknown): SiteContent {
  const object = requiredObject(value, 'site')
  const footer = requiredObject(object.footer, 'site.footer')
  const agencyLink = footer.agencyLink ? parseLink(footer.agencyLink, 'site.footer.agencyLink') : undefined
  const sponsorLink = footer.sponsorLink ? parseLink(footer.sponsorLink, 'site.footer.sponsorLink') : undefined

  const menu = requiredObjectArray(footer.menu, 'site.footer.menu').map((item, index) =>
    parseLink(item, `site.footer.menu[${index}]`)
  )

  return {
    siteName: requiredString(object.siteName, 'site.siteName'),
    language: requiredString(object.language, 'site.language'),
    phase: requiredString(object.phase, 'site.phase'),
    footer: {
      navigationAriaLabel: requiredString(footer.navigationAriaLabel, 'site.footer.navigationAriaLabel'),
      menu,
      copyright: requiredString(footer.copyright, 'site.footer.copyright'),
      agencyLink,
      sponsorLink
    }
  }
}

function parseHeroContent(value: unknown): HeroContent {
  const object = requiredObject(value, 'hero')

  return {
    sectionId: requiredString(object.sectionId, 'hero.sectionId'),
    title: requiredString(object.title, 'hero.title'),
    subtitle: requiredString(object.subtitle, 'hero.subtitle'),
    description: requiredString(object.description, 'hero.description'),
    impactHighlight: optionalString(object.impactHighlight),
    backgroundImage: parseImage(object.backgroundImage, 'hero.backgroundImage'),
    logoImage: parseImage(object.logoImage, 'hero.logoImage'),
    primaryCta: parseLink(object.primaryCta, 'hero.primaryCta'),
    secondaryCta: parseLink(object.secondaryCta, 'hero.secondaryCta')
  }
}

function parseProgressContent(value: unknown): ProgressContent {
  const object = requiredObject(value, 'progress')
  const labels = requiredObject(object.labels, 'progress.labels')
  const primaryCta = object.primaryCta ? parseLink(object.primaryCta, 'progress.primaryCta') : undefined
  const secondaryCta = object.secondaryCta ? parseLink(object.secondaryCta, 'progress.secondaryCta') : undefined

  return {
    sectionId: requiredString(object.sectionId, 'progress.sectionId'),
    title: requiredString(object.title, 'progress.title'),
    goalEur: requiredNumber(object.goalEur, 'progress.goalEur'),
    labels: {
      totalRaised: requiredString(labels.totalRaised, 'progress.labels.totalRaised'),
      teamGoal: requiredString(labels.teamGoal, 'progress.labels.teamGoal'),
      activeFundraisers: requiredString(labels.activeFundraisers, 'progress.labels.activeFundraisers'),
      lastUpdated: requiredString(labels.lastUpdated, 'progress.labels.lastUpdated')
    },
    primaryCta,
    secondaryCta
  }
}

function parseAboutContent(value: unknown): AboutContent {
  const object = requiredObject(value, 'about')
  const donationLink = object.donationLink ? parseLink(object.donationLink, 'about.donationLink') : undefined

  return {
    sectionId: requiredString(object.sectionId, 'about.sectionId'),
    title: requiredString(object.title, 'about.title'),
    paragraphs: requiredStringArray(object.paragraphs, 'about.paragraphs'),
    donationLink,
    image: parseImage(object.image, 'about.image')
  }
}

function parseFundingContent(value: unknown): FundingContent {
  const object = requiredObject(value, 'funding')
  const links = object.links
    ? requiredObjectArray(object.links, 'funding.links').map((item, index) =>
        parseLink(item, `funding.links[${index}]`)
      )
    : undefined

  return {
    sectionId: requiredString(object.sectionId, 'funding.sectionId'),
    title: requiredString(object.title, 'funding.title'),
    paragraphs: requiredStringArray(object.paragraphs, 'funding.paragraphs'),
    links
  }
}

function parseActionsContent(value: unknown): ActionsContent {
  const object = requiredObject(value, 'actions')
  const items = requiredObjectArray(object.items, 'actions.items').map((item, index) => ({
    title: requiredString(item.title, `actions.items[${index}].title`),
    description: requiredString(item.description, `actions.items[${index}].description`),
    image: parseImage(item.image, `actions.items[${index}].image`),
    meta: optionalString(item.meta)
  }))

  return {
    sectionId: requiredString(object.sectionId, 'actions.sectionId'),
    title: requiredString(object.title, 'actions.title'),
    notice: optionalString(object.notice),
    items
  }
}

function parseGalleryContent(value: unknown): GalleryContent {
  const object = requiredObject(value, 'gallery')
  const images = requiredObjectArray(object.images, 'gallery.images').map((image, index) => ({
    src: requiredString(image.src, `gallery.images[${index}].src`),
    alt: requiredString(image.alt, `gallery.images[${index}].alt`),
    caption: optionalString(image.caption)
  }))

  return {
    sectionId: requiredString(object.sectionId, 'gallery.sectionId'),
    title: requiredString(object.title, 'gallery.title'),
    intro: optionalString(object.intro),
    images
  }
}

function parseSponsoringContent(value: unknown): SponsoringContent {
  const object = requiredObject(value, 'sponsoring')
  const tableHeaders = requiredObject(object.tableHeaders, 'sponsoring.tableHeaders')
  const cta = object.cta ? parseLink(object.cta, 'sponsoring.cta') : undefined
  const tiers = requiredObjectArray(object.tiers, 'sponsoring.tiers').map((tier, index) => ({
    name: requiredString(tier.name, `sponsoring.tiers[${index}].name`),
    contribution: requiredString(tier.contribution, `sponsoring.tiers[${index}].contribution`),
    benefits: requiredStringArray(tier.benefits, `sponsoring.tiers[${index}].benefits`)
  }))

  return {
    sectionId: requiredString(object.sectionId, 'sponsoring.sectionId'),
    title: requiredString(object.title, 'sponsoring.title'),
    intro: requiredString(object.intro, 'sponsoring.intro'),
    note: optionalString(object.note),
    cta,
    tableHeaders: {
      package: requiredString(tableHeaders.package, 'sponsoring.tableHeaders.package'),
      contribution: requiredString(tableHeaders.contribution, 'sponsoring.tableHeaders.contribution'),
      benefits: requiredString(tableHeaders.benefits, 'sponsoring.tableHeaders.benefits')
    },
    tiers
  }
}

function parseSponsorsContent(value: unknown): SponsorsContent {
  const object = requiredObject(value, 'sponsors')
  const items = requiredObjectArray(object.items, 'sponsors.items').map((item, index) => ({
    name: requiredString(item.name, `sponsors.items[${index}].name`),
    href: requiredString(item.href, `sponsors.items[${index}].href`),
    logoSrc: requiredString(item.logoSrc, `sponsors.items[${index}].logoSrc`),
    logoAlt: requiredString(item.logoAlt, `sponsors.items[${index}].logoAlt`)
  }))

  return {
    sectionId: requiredString(object.sectionId, 'sponsors.sectionId'),
    title: requiredString(object.title, 'sponsors.title'),
    subtitle: optionalString(object.subtitle),
    items
  }
}

function parseContactContent(value: unknown): ContactContent {
  const object = requiredObject(value, 'contact')
  const introParagraphs = object.introParagraphs
    ? requiredStringArray(object.introParagraphs, 'contact.introParagraphs')
    : undefined
  const items = requiredObjectArray(object.items, 'contact.items').map((item, index) => ({
    label: requiredString(item.label, `contact.items[${index}].label`),
    value: requiredString(item.value, `contact.items[${index}].value`),
    href: requiredString(item.href, `contact.items[${index}].href`)
  }))

  return {
    sectionId: requiredString(object.sectionId, 'contact.sectionId'),
    title: requiredString(object.title, 'contact.title'),
    introParagraphs,
    items
  }
}

export function loadContentBundle(): ContentBundle {
  return {
    site: parseSiteContent(siteJson),
    hero: parseHeroContent(heroJson),
    progress: parseProgressContent(progressJson),
    about: parseAboutContent(aboutJson),
    funding: parseFundingContent(fundingJson),
    actions: parseActionsContent(actionsJson),
    gallery: parseGalleryContent(galleryJson),
    sponsoring: parseSponsoringContent(sponsoringJson),
    sponsors: parseSponsorsContent(sponsorsJson),
    contact: parseContactContent(contactJson)
  }
}
