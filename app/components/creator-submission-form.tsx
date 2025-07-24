import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const validationSchema = Yup.object({
  tiktokHandle: Yup.string()
    .required('TikTok handle is required')
    .matches(/^@/, 'TikTok handle must start with @'),
  videoLinks: Yup.array()
    .of(Yup.string().url('Please enter valid URLs'))
    .min(1, 'At least one video link is required'),
  contactEmail: Yup.string()
    .email('Please enter a valid email address')
    .required('Contact email is required'),
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must agree to the terms to submit'),
});

interface CreatorSubmissionFormProps {
  onSubmit: (values: any) => void;
}

export default function CreatorSubmissionForm({ onSubmit }: CreatorSubmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      tiktokHandle: '',
      videoLinks: [''],
      contactEmail: '',
      agreeToTerms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleAddVideo = () => {
    formik.setFieldValue('videoLinks', [...formik.values.videoLinks, '']);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="tiktokHandle" className="block text-sm font-medium text-gray-700">
          TikTok Handle
        </label>
        <input
          type="text"
          id="tiktokHandle"
          name="tiktokHandle"
          value={formik.values.tiktokHandle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.tiktokHandle && formik.errors.tiktokHandle && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.tiktokHandle}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Video Links
        </label>
        {formik.values.videoLinks.map((link, index) => (
          <div key={index} className="mt-2 flex space-x-2">
            <input
              type="url"
              name={`videoLinks[${index}]`}
              value={link}
              onChange={(e) => {
                const newLinks = [...formik.values.videoLinks];
                newLinks[index] = e.target.value;
                formik.setFieldValue('videoLinks', newLinks);
              }}
              onBlur={formik.handleBlur}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => {
                  const newLinks = [...formik.values.videoLinks];
                  newLinks.splice(index, 1);
                  formik.setFieldValue('videoLinks', newLinks);
                }}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddVideo}
          className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
        >
          Add Another Video
        </button>
      </div>

      <div>
        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
          Contact Email
        </label>
        <input
          type="email"
          id="contactEmail"
          name="contactEmail"
          value={formik.values.contactEmail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.contactEmail && formik.errors.contactEmail && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.contactEmail}</p>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-center">
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            checked={formik.values.agreeToTerms}
            onChange={formik.handleChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
            I agree to have my content featured on this site
          </label>
        </div>
        {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.agreeToTerms}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
