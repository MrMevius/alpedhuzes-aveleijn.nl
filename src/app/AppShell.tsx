import { loadContentBundle } from '../lib/contentLoader'
import { AboutSection } from '../sections/About/AboutSection'
import { ActionsSection } from '../sections/Actions/ActionsSection'
import { ContactSection } from '../sections/Contact/ContactSection'
import { FooterSection } from '../sections/Footer/FooterSection'
import { FundingSection } from '../sections/Funding/FundingSection'
import { GallerySection } from '../sections/Gallery/GallerySection'
import { HeroSection } from '../sections/Hero/HeroSection'
import { ProgressSection } from '../sections/Progress/ProgressSection'
import { SponsoringSection } from '../sections/Sponsoring/SponsoringSection'
import { SponsorsSection } from '../sections/Sponsors/SponsorsSection'

const content = loadContentBundle()

export function AppShell() {
  return (
    <main className="container">
      <HeroSection content={content.hero} />
      <ProgressSection content={content.progress} />
      <AboutSection content={content.about} />
      <FundingSection content={content.funding} />
      <ActionsSection content={content.actions} />
      <GallerySection content={content.gallery} />
      <SponsoringSection content={content.sponsoring} />
      <SponsorsSection content={content.sponsors} />
      <ContactSection content={content.contact} />
      <FooterSection content={content.site} />
    </main>
  )
}
