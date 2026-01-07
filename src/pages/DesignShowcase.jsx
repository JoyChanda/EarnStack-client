/**
 * 🎨 DESIGN SYSTEM SHOWCASE
 * Live examples of all UI components
 * This page demonstrates proper usage and serves as a visual test
 */

import { useState } from 'react';
import { Button, Card, Input, Modal, Spinner, PulseLoader, Skeleton, SkeletonText, CardSkeleton } from '../components/ui';
import ThemeToggle from '../components/Shared/ThemeToggle';
import { validateEmail, validatePassword } from '../utils/validation';

const DesignShowcase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const error = validateEmail(value);
    setEmailError(error || '');
  };
  
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const error = validatePassword(value);
    setPasswordError(error || '');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto container-padding py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
            EarnStack Design System
          </h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto container-padding section-spacing">
        
        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
            🎨 Color Palette
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="base">
              <h3 className="text-xl font-bold mb-4 text-primary-600 dark:text-primary-400">Primary (Purple)</h3>
              <div className="space-y-2">
                <div className="h-12 bg-primary-500 rounded flex items-center justify-center text-white font-semibold">500</div>
                <div className="h-8 bg-primary-400 rounded"></div>
                <div className="h-8 bg-primary-600 rounded"></div>
              </div>
            </Card>
            
            <Card variant="base">
              <h3 className="text-xl font-bold mb-4 text-secondary-600 dark:text-secondary-400">Secondary (Blue)</h3>
              <div className="space-y-2">
                <div className="h-12 bg-secondary-500 rounded flex items-center justify-center text-white font-semibold">500</div>
                <div className="h-8 bg-secondary-400 rounded"></div>
                <div className="h-8 bg-secondary-600 rounded"></div>
              </div>
            </Card>
            
            <Card variant="base">
              <h3 className="text-xl font-bold mb-4 text-accent-600 dark:text-accent-400">Accent (Emerald)</h3>
              <div className="space-y-2">
                <div className="h-12 bg-accent-500 rounded flex items-center justify-center text-white font-semibold">500</div>
                <div className="h-8 bg-accent-400 rounded"></div>
                <div className="h-8 bg-accent-600 rounded"></div>
              </div>
            </Card>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
            🔘 Buttons
          </h2>
          <Card variant="base">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" loading>Loading</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
            📦 Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="base">
              <h3 className="text-xl font-bold mb-2">Base Card</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Standard card with shadow and border</p>
            </Card>
            
            <Card variant="hover">
              <h3 className="text-xl font-bold mb-2">Hover Card</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Lifts up on hover with increased shadow</p>
            </Card>
            
            <Card variant="glass">
              <h3 className="text-xl font-bold mb-2">Glass Card</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Glassmorphism effect with blur</p>
            </Card>
          </div>
        </section>

        {/* Inputs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
            📝 Input Fields
          </h2>
          <Card variant="base">
            <div className="space-y-6 max-w-md">
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                required
              />
              
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
                required
              />
              
              <Input
                label="Success State"
                type="text"
                name="success"
                placeholder="This looks good!"
                success="Validation passed!"
              />
            </div>
          </Card>
        </section>

        {/* Modal */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
            🪟 Modal
          </h2>
          <Card variant="base">
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>
            
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Example Modal"
              footer={
                <>
                  <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                    Confirm
                  </Button>
                </>
              }
            >
              <p className="text-neutral-600 dark:text-neutral-400">
                This is a modal dialog with a title, body content, and custom footer actions.
                Press ESC or click outside to close.
              </p>
            </Modal>
          </Card>
        </section>

        {/* Loaders */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
            ⏳ Loaders
          </h2>
          <Card variant="base">
            <div className="flex flex-wrap items-center gap-8">
              <div className="text-center">
                <Spinner size="sm" />
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Small</p>
              </div>
              
              <div className="text-center">
                <Spinner size="md" />
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Medium</p>
              </div>
              
              <div className="text-center">
                <Spinner size="lg" />
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Large</p>
              </div>
              
              <div className="text-center">
                <PulseLoader />
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Pulse</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Skeletons */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
            💀 Skeleton Loaders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="base">
              <h3 className="text-lg font-bold mb-4">Text Skeleton</h3>
              <SkeletonText lines={4} />
            </Card>
            
            <CardSkeleton />
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
            📖 Typography
          </h2>
          <Card variant="base">
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              This is a paragraph with regular text. All typography automatically adapts to light and dark modes.
            </p>
            <p className="mt-2 text-gradient font-bold text-lg">
              Gradient Text Effect
            </p>
          </Card>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 mt-20">
        <div className="max-w-7xl mx-auto container-padding py-6 text-center text-neutral-600 dark:text-neutral-400">
          <p>EarnStack Design System • Built with Tailwind CSS & React</p>
        </div>
      </footer>
    </div>
  );
};

export default DesignShowcase;
