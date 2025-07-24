import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const validationSchema = Yup.object({
  display_name: Yup.string()
    .required('Display name is required')
    .min(2, 'Display name must be at least 2 characters'),
  tiktok_handle: Yup.string()
    .required('TikTok handle is required')
    .matches(/^@?[\w.]+$/, 'Invalid TikTok handle format')
    .min(3, 'TikTok handle must be at least 3 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  video_url: Yup.string()
    .matches(/^https?:\/\/(?:www\.)?tiktok\.com\//, 'Please provide a valid TikTok video URL'),
  video_description: Yup.string()
    .max(200, 'Description must be 200 characters or less'),
  consent: Yup.boolean()
    .oneOf([true], 'You must agree to the terms to submit'),
});

export function ConsentForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      // TODO: Implement form submission to Supabase
      console.log('Form submitted:', values);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Thank you!</h2>
        <p className="text-gray-600 mb-4">
          Your submission has been received. We'll review your content and add it to our index.
        </p>
        <p className="text-sm text-gray-500">
          You can request to have your content removed at any time by contacting us.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-8">Submit Your Content</h2>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Consent Information</h3>
        <p className="text-gray-600 mb-4">
          By submitting your content, you agree to have your TikTok profile and video links featured on this website.
          This site is dedicated to preserving and sharing community-generated knowledge about hormone therapy and related health conditions.
        </p>
        <p className="text-sm text-gray-500">
          Participation is voluntary. You can request to have your content removed at any time.
        </p>
      </div>
      <Formik
        initialValues={{
          display_name: '',
          tiktok_handle: '',
          email: '',
          video_url: '',
          video_description: '',
          consent: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className="space-y-6">
            <div>
              <Label htmlFor="display_name">Display Name</Label>
              <Input
                id="display_name"
                name="display_name"
                type="text"
                placeholder="Your preferred name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.display_name}
                className={errors.display_name && touched.display_name ? 'border-red-500' : ''}
              />
              {errors.display_name && touched.display_name && (
                <p className="text-red-500 text-sm mt-1">{errors.display_name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="tiktok_handle">TikTok Handle</Label>
              <Input
                id="tiktok_handle"
                name="tiktok_handle"
                type="text"
                placeholder="@yourhandle"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tiktok_handle}
                className={errors.tiktok_handle && touched.tiktok_handle ? 'border-red-500' : ''}
              />
              {errors.tiktok_handle && touched.tiktok_handle && (
                <p className="text-red-500 text-sm mt-1">{errors.tiktok_handle}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={errors.email && touched.email ? 'border-red-500' : ''}
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="video_url">Video URL (Optional)</Label>
              <Input
                id="video_url"
                name="video_url"
                type="text"
                placeholder="https://tiktok.com/..."
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.video_url}
                className={errors.video_url && touched.video_url ? 'border-red-500' : ''}
              />
              {errors.video_url && touched.video_url && (
                <p className="text-red-500 text-sm mt-1">{errors.video_url}</p>
              )}
            </div>

            <div>
              <Label htmlFor="video_description">Video Description (Optional)</Label>
              <Textarea
                id="video_description"
                name="video_description"
                placeholder="Briefly describe your video content..."
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.video_description}
                className={errors.video_description && touched.video_description ? 'border-red-500' : ''}
              />
              {errors.video_description && touched.video_description && (
                <p className="text-red-500 text-sm mt-1">{errors.video_description}</p>
              )}
            </div>

            <div className="flex items-start">
              <Checkbox
                id="consent"
                checked={values.consent}
                onChange={handleChange}
                onBlur={handleBlur}
                name="consent"
              />
              <Label htmlFor="consent" className="ml-2">
                I agree to have my TikTok content featured on this website
              </Label>
            </div>

            <Button type="submit" className="w-full">
              Submit Content
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
