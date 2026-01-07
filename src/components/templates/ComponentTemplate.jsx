/**
 * 📝 COMPONENT TEMPLATE
 * Use this as a starting point for new pages/components
 * Copy and customize as needed
 */

import { useState } from 'react';
import { Button, Card, Input, Modal } from '../components/ui';
import ThemeToggle from '../components/Shared/ThemeToggle';
import { validateEmail, validateRequired } from '../utils/validation';

const ComponentTemplate = () => {
  // State
  const [formData, setFormData] = useState({
    email: '',
    name: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    const newErrors = {};
    
    const nameError = validateRequired(formData.name, 'Name');
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit logic
    setLoading(true);
    try {
      // Your API call here
      console.log('Submitting:', formData);
      
      // Success
      setIsModalOpen(true);
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Header */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto container-padding py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
            Page Title
          </h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto container-padding section-spacing">
        <Card variant="base">
          <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
            Form Example
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            {errors.general && (
              <div className="error-message bg-red-900/20 p-3 rounded-lg border border-red-500/50">
                {errors.general}
              </div>
            )}

            <div className="flex gap-4">
              <Button type="submit" variant="primary" loading={loading}>
                Submit
              </Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </Card>

        {/* Additional Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card variant="hover">
            <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">
              Card 1
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Card content goes here
            </p>
          </Card>

          <Card variant="hover">
            <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">
              Card 2
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Card content goes here
            </p>
          </Card>

          <Card variant="hover">
            <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">
              Card 3
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Card content goes here
            </p>
          </Card>
        </div>
      </main>

      {/* Success Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Success!"
        footer={
          <Button variant="primary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        }
      >
        <p className="text-neutral-600 dark:text-neutral-400">
          Your form has been submitted successfully!
        </p>
      </Modal>
    </div>
  );
};

export default ComponentTemplate;
