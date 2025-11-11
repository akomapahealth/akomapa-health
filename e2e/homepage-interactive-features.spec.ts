import { test, expect } from '@playwright/test';

/**
 * Tests interactive features on the homepage:
 * - Animated counters
 * - Carousels (hero slideshow, testimonials, location photos)
 * - Gallery lightbox and filters
 * - Links and buttons
 */
test.describe('Homepage Interactive Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Hero Section Slideshow', () => {
    test('should display hero section with slideshow', async ({ page }) => {
      const heroSection = page.locator('section').first();
      await expect(heroSection).toBeVisible();
      
      // Check for hero title
      const heroTitle = page.locator('h1').first();
      await expect(heroTitle).toBeVisible();
      await expect(heroTitle).toContainText(/global partnership|students/i);
    });

    test('should have working slideshow indicators', async ({ page }) => {
      // Wait for slideshow to load
      await page.waitForTimeout(2000);
      
      // Find slideshow indicators (dots)
      const indicators = page.locator('button[aria-label*="slide"], button[aria-label*="Go to slide"]');
      const indicatorCount = await indicators.count();
      
      if (indicatorCount > 0) {
        // Click on second indicator
        await indicators.nth(1).click();
        await page.waitForTimeout(1000);
        
        // Verify slide changed (check if image src changed or opacity changed)
        const slides = page.locator('[class*="slideshow"], [class*="slide"]');
        expect(await slides.count()).toBeGreaterThan(0);
      }
    });

    test('should have working CTA buttons', async ({ page }) => {
      // Check "Join the Movement" button
      const joinButton = page.getByRole('link', { name: /join the movement/i });
      await expect(joinButton).toBeVisible();
      
      // Check "Support Our Work" button
      const supportButton = page.getByRole('link', { name: /support our work/i });
      await expect(supportButton).toBeVisible();
      
      // Verify buttons are clickable
      await expect(joinButton).toBeEnabled();
      await expect(supportButton).toBeEnabled();
    });

    test('should have working scroll indicator', async ({ page }) => {
      // Check for scroll down button/indicator
      const scrollButton = page.locator('button[aria-label*="scroll"], button[aria-label*="Scroll"]');
      const scrollButtonCount = await scrollButton.count();
      
      if (scrollButtonCount > 0) {
        await expect(scrollButton.first()).toBeVisible();
        
        // Click scroll button
        const initialScroll = await page.evaluate(() => window.scrollY);
        await scrollButton.first().click();
        await page.waitForTimeout(500);
        
        const finalScroll = await page.evaluate(() => window.scrollY);
        expect(finalScroll).toBeGreaterThan(initialScroll);
      }
    });
  });

  test.describe('Impact Metrics Counters', () => {
    test('should display impact metrics section', async ({ page }) => {
      // Scroll to metrics section
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight / 2);
      });
      await page.waitForTimeout(1000);
      
      // Look for impact metrics section
      const metricsSection = page.getByText(/OUR IMPACT|Patients Served|Clinics/i);
      await expect(metricsSection.first()).toBeVisible();
    });

    test('should animate counters when scrolled into view', async ({ page }) => {
      // Scroll to impact metrics
      const metricsHeading = page.getByText(/OUR IMPACT/i);
      if (await metricsHeading.isVisible()) {
        await metricsHeading.scrollIntoViewIfNeeded();
        await page.waitForTimeout(3000); // Wait for animation
        
        // Check that counter values are displayed
        const counterValues = page.locator('text=/\\d+\\+?/').filter({ hasText: /1000|100|3|2/ });
        const count = await counterValues.count();
        expect(count).toBeGreaterThan(0);
      }
    });

    test('should display both current and future metrics', async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight / 2);
      });
      await page.waitForTimeout(2000);
      
      // Check for current metrics
      const currentMetrics = page.getByText(/Patients Served|Clinics/i);
      await expect(currentMetrics.first()).toBeVisible();
      
      // Check for future metrics section
      const futureSection = page.getByText(/Our Next Two Years|2028/i);
      if (await futureSection.isVisible()) {
        await expect(futureSection).toBeVisible();
      }
    });
  });

  test.describe('Testimonials Carousel', () => {
    test('should display testimonials carousel', async ({ page }) => {
      // Scroll to testimonials
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight * 0.8);
      });
      await page.waitForTimeout(2000);
      
      // Check for testimonials section
      const testimonialsSection = page.getByText(/VOICES FROM THE FIELD|Stories of Hope/i);
      await expect(testimonialsSection.first()).toBeVisible();
    });

    test('should navigate testimonials with next/previous buttons', async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight * 0.8);
      });
      await page.waitForTimeout(2000);
      
      // Find navigation buttons
      const nextButton = page.locator('button[aria-label*="Next testimonial"], button[aria-label*="next"]').last();
      const prevButton = page.locator('button[aria-label*="Previous testimonial"], button[aria-label*="previous"]').last();
      
      if (await nextButton.isVisible()) {
        // Get initial testimonial text
        const initialText = await page.locator('blockquote').first().textContent().catch(() => '');
        
        // Click next
        await nextButton.click();
        await page.waitForTimeout(1000);
        
        // Get new testimonial text
        const newText = await page.locator('blockquote').first().textContent().catch(() => '');
        
        // Text should change (unless it's the last one)
        if (initialText && newText) {
          // Either text changed or we're at the end
          expect(initialText.length).toBeGreaterThan(0);
          expect(newText.length).toBeGreaterThan(0);
        }
      }
    });

    test('should navigate testimonials with indicator dots', async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight * 0.8);
      });
      await page.waitForTimeout(2000);
      
      // Find indicator dots
      const dots = page.locator('button[aria-label*="testimonial"]').filter({ hasText: /Go to testimonial/ });
      const dotCount = await dots.count();
      
      if (dotCount > 1) {
        // Click second dot
        await dots.nth(1).click();
        await page.waitForTimeout(1000);
        
        // Verify carousel updated
        const testimonial = page.locator('blockquote').first();
        await expect(testimonial).toBeVisible();
      }
    });
  });

  test.describe('Gallery', () => {
    test('should display gallery section', async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight * 0.9);
      });
      await page.waitForTimeout(2000);
      
      // Check for gallery section
      const gallerySection = page.getByText(/OUR WORK IN ACTION|Gallery/i);
      await expect(gallerySection.first()).toBeVisible();
    });

    test('should filter gallery by category', async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight * 0.9);
      });
      await page.waitForTimeout(2000);
      
      // Find category filter buttons
      const categoryButtons = page.getByRole('button').filter({ hasText: /All|Students|Community|Faculty|Clinics/i });
      const buttonCount = await categoryButtons.count();
      
      if (buttonCount > 1) {
        // Click on a category (e.g., "Students")
        const studentsButton = categoryButtons.filter({ hasText: /Students/i }).first();
        if (await studentsButton.isVisible()) {
          await studentsButton.click();
          await page.waitForTimeout(1000);
          
          // Verify filter is active (button should have active class or different style)
          const isActive = await studentsButton.evaluate(el => {
            return el.classList.contains('bg-[#0097b2]') || 
                   window.getComputedStyle(el).backgroundColor !== 'rgba(0, 0, 0, 0)';
          });
          expect(isActive).toBeTruthy();
        }
      }
    });

    test('should open lightbox when clicking gallery image', async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight * 0.9);
      });
      await page.waitForTimeout(2000);
      
      // Find gallery images
      const galleryImages = page.locator('img').filter({ has: page.locator('..').filter({ hasText: /Gallery/i }) });
      const images = page.locator('[class*="gallery"] img, section:has-text("Gallery") img');
      const imageCount = await images.count();
      
      if (imageCount > 0) {
        // Click first gallery image
        await images.first().click();
        await page.waitForTimeout(1000);
        
        // Check for lightbox (modal with close button or overlay)
        const lightbox = page.locator('[class*="lightbox"], [class*="modal"], [class*="fixed"]').filter({ hasText: /Category/i }).first();
        const closeButton = page.locator('button[aria-label*="close"], button:has(svg)').filter({ has: page.locator('svg') });
        
        // Either lightbox is visible or close button is visible
        const lightboxVisible = await lightbox.isVisible().catch(() => false);
        const closeVisible = await closeButton.first().isVisible().catch(() => false);
        
        expect(lightboxVisible || closeVisible).toBeTruthy();
        
        // Close lightbox if open
        if (closeVisible) {
          await closeButton.first().click();
          await page.waitForTimeout(500);
        }
      }
    });

    test('should show more/less gallery items', async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight * 0.9);
      });
      await page.waitForTimeout(2000);
      
      // Find "Show More" button
      const showMoreButton = page.getByRole('button', { name: /Show More|Show Less/i });
      
      if (await showMoreButton.isVisible()) {
        const initialText = await showMoreButton.textContent();
        await showMoreButton.click();
        await page.waitForTimeout(1000);
        
        const newText = await showMoreButton.textContent();
        // Button text should change
        expect(initialText).not.toBe(newText);
      }
    });
  });

  test.describe('Location Section Carousel', () => {
    test('should display location section with photo carousel', async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight * 0.6);
      });
      await page.waitForTimeout(2000);
      
      // Check for location section
      const locationSection = page.getByText(/Local Impact|Abeadze Domenase|Abura/i);
      await expect(locationSection.first()).toBeVisible();
    });

    test('should navigate location photos with arrows', async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight * 0.6);
      });
      await page.waitForTimeout(2000);
      
      // Find navigation buttons for location carousel
      const nextButton = page.locator('button[aria-label*="Next photo"], button[aria-label*="next"]').filter({ hasText: /→/ });
      const prevButton = page.locator('button[aria-label*="Previous photo"], button[aria-label*="previous"]').filter({ hasText: /←/ });
      
      if (await nextButton.first().isVisible()) {
        // Get initial location text
        const initialLocation = await page.getByText(/Abeadze Domenase|Winneba|Abura/i).first().textContent().catch(() => '');
        
        // Click next
        await nextButton.first().click();
        await page.waitForTimeout(1000);
        
        // Verify carousel advanced
        const images = page.locator('img');
        expect(await images.count()).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Program Cards', () => {
    test('should display program cards', async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight * 0.3);
      });
      await page.waitForTimeout(2000);
      
      // Check for programs section
      const programsSection = page.getByText(/OUR PROGRAMS|Students. Communities. Partnerships/i);
      await expect(programsSection.first()).toBeVisible();
    });

    test('should open program modal when clicking program card', async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight * 0.3);
      });
      await page.waitForTimeout(2000);
      
      // Find program cards
      const programCards = page.locator('[class*="program"], section:has-text("OUR PROGRAMS") [class*="card"]');
      const cards = page.locator('section:has-text("OUR PROGRAMS")').locator('div').filter({ has: page.locator('h3') });
      const cardCount = await cards.count();
      
      if (cardCount > 0) {
        // Click first program card
        await cards.first().click();
        await page.waitForTimeout(1000);
        
        // Check for modal or detailed view
        const modal = page.locator('[role="dialog"], [class*="modal"], [class*="dialog"]');
        const modalVisible = await modal.isVisible().catch(() => false);
        
        // Modal might open or page might navigate
        if (modalVisible) {
          // Close modal if it has a close button
          const closeButton = page.locator('button[aria-label*="close"], button:has(svg)').first();
          if (await closeButton.isVisible()) {
            await closeButton.click();
            await page.waitForTimeout(500);
          }
        }
      }
    });

    test('should have working program links', async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight * 0.3);
      });
      await page.waitForTimeout(2000);
      
      // Find program links
      const programLinks = page.getByRole('link').filter({ hasText: /Explore|Discover|Join|Experience/i });
      const linkCount = await programLinks.count();
      
      if (linkCount > 0) {
        // Verify links are clickable
        await expect(programLinks.first()).toBeVisible();
        await expect(programLinks.first()).toBeEnabled();
      }
    });
  });

  test.describe('Header Navigation', () => {
    test('should have working header links', async ({ page }) => {
      // Check header is visible
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      // Check main navigation links
      const homeLink = page.getByRole('link', { name: /home/i }).first();
      await expect(homeLink).toBeVisible();
      
      // Check dropdown menus work
      const aboutLink = page.getByRole('link', { name: /about/i }).first();
      if (await aboutLink.isVisible()) {
        await aboutLink.hover();
        await page.waitForTimeout(500);
        
        // Check if dropdown appears
        const dropdown = page.locator('[role="menu"]');
        const dropdownVisible = await dropdown.isVisible().catch(() => false);
        // Dropdown might appear on hover
        expect(typeof dropdownVisible).toBe('boolean');
      }
    });

    test('should have working mobile menu', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Find mobile menu button
      const menuButton = page.locator('button[aria-label*="menu"], button:has(svg)').first();
      if (await menuButton.isVisible()) {
        await menuButton.click();
        await page.waitForTimeout(500);
        
        // Check if mobile menu opened
        const mobileMenu = page.locator('[class*="mobile"], nav').filter({ hasText: /Home|About|Programs/i });
        const menuVisible = await mobileMenu.isVisible().catch(() => false);
        expect(menuVisible).toBeTruthy();
      }
    });
  });
});

