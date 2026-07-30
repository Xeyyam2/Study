import { getTranslations } from 'next-intl/server';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/config/site';
import { FadeIn } from '@/components/motion/fade-in';

export async function CTASection() {
  const t = await getTranslations('HomePage.cta');
  const wa = `https://wa.me/${siteConfig.contact.whatsapp.number}`;

  return (
    <section className="section-padding">
      <FadeIn className="container-page">
        <div className="overflow-hidden rounded-xl border border-primary-container bg-primary px-6 py-12 text-center text-primary-foreground shadow-flat-plus sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-2xl font-display text-headline-xl text-balance">
            {t('title')}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            {t('subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="cta" size="lg" className="gap-2">
              <Link href="/apply">
                {t('primary')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                {t('whatsapp')}
              </a>
            </Button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
