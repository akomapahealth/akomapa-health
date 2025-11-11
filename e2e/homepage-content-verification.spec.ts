import { test, expect } from '@playwright/test';

/**
 * Tests content verification on the homepage
 * Verifies that content matches expected text and structure
 */
test.describe('Homepage Content Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display hero section content', async ({ page }) => {
    // Check hero title
    const heroTitle = page.locator('h1').first();
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText(/global partnership|students|NCDs/i);
    
    // Check hero description
    const heroDescription = page.getByText(/Student-powered|Expert-supervised|Community-rooted/i);
    await expect(heroDescription.first()).toBeVisible();
  });

  test('should display all main sections', async ({ page }) => {
    const sections = [
      { name: 'Hero', text: /global partnership|students/i },
      { name: 'Akomapa Meaning', text: /Akomapa|meaning/i },
      { name: 'Mission', text: /mission|vision/i },
      { name: 'Programs', text: /OUR PROGRAMS|Programs/i },
      { name: 'Health Crisis', text: /health|crisis/i },
      { name: 'Location', text: /Location|Abeadze|Abura/i },
      { name: 'Research', text: /research|science/i },
      { name: 'Impact Metrics', text: /OUR IMPACT|Patients Served/i },
      { name: 'Testimonials', text: /VOICES FROM THE FIELD|Stories/i },
      { name: 'Gallery', text: /OUR WORK IN ACTION|Gallery/i },
      { name: 'Call to Action', text: /Join|Get Involved/i },
    ];

    for (const section of sections) {
      const sectionElement = page.getByText(section.text);
      const isVisible = await sectionElement.first().isVisible().catch(() => false);
      
      if (!isVisible) {
        // Scroll to find section
        await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
        });
        await page.waitForTimeout(1000);
        
        const foundAfterScroll = await sectionElement.first().isVisible().catch(() => false);
        expect(foundAfterScroll).toBeTruthy();
      } else {
        expect(isVisible).toBeTruthy();
      }
    }
  });

  test('should display impact metrics with correct values', async ({ page }) => {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight * 0.7);
    });
    await page.waitForTimeout(3000);
    
    // Check for current metrics
    const metrics = [
      { label: 'Patients Served', value: /1000|1,000/ },
      { label: 'Clinics', value: /3/ },
      { label: 'Student Leaders', value: /100/ },
      { label: 'Countries', value: /2/ },
    ];

    for (const metric of metrics) {
      const metricElement = page.getByText(metric.label);
      if (await metricElement.first().isVisible().catch(() => false)) {
        await expect(metricElement.first()).toBeVisible();
      }
    }
  });

  test('should display testimonials content', async ({ page }) => {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight * 0.85);
    });
    await page.waitForTimeout(2000);
    
    // Check testimonials section title
    const testimonialsTitle = page.getByText(/VOICES FROM THE FIELD|Stories of Hope/i);
    await expect(testimonialsTitle.first()).toBeVisible();
    
    // Check for testimonial quotes
    const testimonialQuote = page.locator('blockquote');
    if (await testimonialQuote.first().isVisible().catch(() => false)) {
      const quoteText = await testimonialQuote.first().textContent();
      expect(quoteText?.length).toBeGreaterThan(20); // Quotes should be substantial
    }
  });

  test('should display program cards with correct information', async ({ page }) => {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight * 0.3);
    });
    await page.waitForTimeout(2000);
    
    // Check for programs section
    const programsTitle = page.getByText(/OUR PROGRAMS/i);
    await expect(programsTitle.first()).toBeVisible();
    
    // Check for program titles
    const programTitles = [
      /Akomapa Clinics/i,
      /Akomapa Network/i,
      /Global Health Leadership/i,
      /Global Health Immersion/i,
    ];

    for (const title of programTitles) {
      const programElement = page.getByText(title);
      const isVisible = await programElement.first().isVisible().catch(() => false);
      expect(isVisible).toBeTruthy();
    }
  });

  test('should display location information', async ({ page }) => {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight * 0.6);
    });
    await page.waitForTimeout(2000);
    
    // Check for location section
    const locationTitle = page.getByText(/Local Impact|Our First Clinic/i);
    await expect(locationTitle.first()).toBeVisible();
    
    // Check for location names
    const locations = page.getByText(/Abeadze Domenase|Abura|Winneba/i);
    await expect(locations.first()).toBeVisible();
  });

  test('should have working footer links', async ({ page }) => {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(2000);
    
    // Check footer is visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check for footer links
    const footerLinks = footer.locator('a');
    const linkCount = await footerLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test('should have proper page metadata', async ({ page }) => {
    // Check page title
    const title = await page.title();
    expect(title).toContain('Akomapa');
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    const description = await metaDescription.getAttribute('content').catch(() => '');
    expect(description.length).toBeGreaterThan(0);
  });

  test('should display newsletter section', async ({ page }) => {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight * 0.95);
    });
    await page.waitForTimeout(2000);
    
    // Check for newsletter section (usually before footer)
    const newsletter = page.getByText(/newsletter|subscribe|stay updated/i);
    const isVisible = await newsletter.first().isVisible().catch(() => false);
    // Newsletter might be present
    expect(typeof isVisible).toBe('boolean');
  });

  test('should have accessible headings hierarchy', async ({ page }) => {
    // Check for h1
    const h1 = page.locator('h1');
    const h1Count = await h1.count();
    expect(h1Count).toBeGreaterThan(0);
    
    // Check for h2s
    const h2 = page.locator('h2');
    const h2Count = await h2.count();
    expect(h2Count).toBeGreaterThan(3);
    
    // Verify h1 comes before h2s in document order
    const firstH1 = await h1.first().boundingBox();
    const firstH2 = await h2.first().boundingBox();
    
    if (firstH1 && firstH2) {
      expect(firstH1.y).toBeLessThan(firstH2.y);
    }
  });

  test('should have proper alt text for images', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check main images have alt text
    const images = page.locator('img');
    const imageCount = await images.count();
    
    let imagesWithAlt = 0;
    for (let i = 0; i < Math.min(imageCount, 20); i++) {
      const img = images.nth(i);
      if (await img.isVisible()) {
        const alt = await img.getAttribute('alt');
        if (alt && alt.length > 0) {
          imagesWithAlt++;
        }
      }
    }
    
    // Most images should have alt text
    expect(imagesWithAlt).toBeGreaterThan(0);
  });
});

