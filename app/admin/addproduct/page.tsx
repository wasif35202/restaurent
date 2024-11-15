'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Wrapper from '@/Components/Wrapper';
import { ProductFormValuesZT, productSchema } from '@/types/zodtypes';
import Image from 'next/image';

const ProductForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValuesZT>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      desc: '',
      img: '',
      price: 0,
      options: [{ title: '', additionalPrice: 0 }],
      catSlug: '',
      isFeatured: false,
    },
  });

  const [options, setOptions] = useState([{ title: '', additionalPrice: 0 }]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const addOption = () =>
    setOptions([...options, { title: '', additionalPrice: 0 }]);
  const removeOption = (index: number) =>
    setOptions(options.filter((_, i) => i !== index));

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'restaurent');

    setUploading(true);
    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/wasif/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `Upload failed with status: ${response.status} - ${errorDetails}`
        );
      }
      const data = await response.json();
      if (data.secure_url) {
        setImagePreview(data.secure_url);
        return data.secure_url;
      }
      throw new Error('Upload failed');
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      alert('Image upload failed');
      return '';
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: ProductFormValuesZT) => {
    const response = await fetch('http://localhost:3000/admin/addproduct/api/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    const responseData = await response.json();
    if (!response.ok) {
      alert('Form Submission Failed');
      return;
    }
    if (responseData.errors) {
      const errors = responseData.errors;
      Object.keys(errors).forEach(key => {
        setError(key as keyof ProductFormValuesZT, {
          type: 'server',
          message: errors[key],
        });
      });
    }
    if (responseData.success) {
      alert('Product added successfully');
      reset();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await uploadToCloudinary(file);
      if (imageUrl) {
        setImagePreview(imageUrl);
        setValue('img', imageUrl); // Set Cloudinary URL to img field
      }
    }
  };

  return (
    <Wrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-lg bg-white p-6 shadow-md"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            {...register('title')}
            className="focus:ring-primary mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register('desc')}
            className="focus:ring-primary mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2"
          ></textarea>
          {errors.desc && (
            <p className="mt-1 text-sm text-red-500">{errors.desc.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="focus:ring-primary mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2"
              disabled={uploading}
            />
          </div>
          {imagePreview && (
            <div className="w-20">
              <Image
                src={imagePreview}
                width={200}
                height={200}
                alt="Preview"
                className="mt-2 w-full rounded-lg"
              />
            </div>
          )}
          {errors.img && (
            <p className="mt-1 text-sm text-red-500">{errors.img.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            {...register('price', { valueAsNumber: true })}
            className="focus:ring-primary mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Options
          </label>
          {options.map((_, index) => (
            <div key={index} className="mt-2 flex items-center space-x-2">
              <input
                {...register(`options.${index}.title`)}
                placeholder="Option Title"
                className="focus:ring-primary w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2"
              />
              <input
                type="number"
                {...register(`options.${index}.additionalPrice`, {
                  valueAsNumber: true,
                })}
                placeholder="Additional Price"
                className="focus:ring-primary w-24 rounded-lg border border-gray-300 p-2 outline-none focus:ring-2"
              />
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="hover:bg-primary-dark mt-2 rounded-lg bg-red-500 p-2 text-white"
          >
            Add Option
          </button>
          {errors.options && (
            <p className="mt-1 text-sm text-red-500">
              {errors.options.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category Slug
          </label>
          <input
            {...register('catSlug')}
            className="focus:ring-primary mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2"
          />
          {errors.catSlug && (
            <p className="mt-1 text-sm text-red-500">
              {errors.catSlug.message}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <label className="text-sm font-medium text-gray-700">Featured</label>
          <Controller
            name="isFeatured"
            control={control}
            render={({
              field: { onChange, onBlur, name, ref, value, ...rest },
            }) => (
              <input
                type="checkbox"
                onChange={onChange} // Controlled with `onChange`
                onBlur={onBlur}
                name={name}
                ref={ref}
                checked={value ?? false} // Set `checked` to handle state
                className="text-primary focus:ring-primary ml-2 h-5 w-5 rounded border-gray-300"
                {...rest} // Spread other properties
              />
            )}
          />
        </div>

        <button
          disabled={isSubmitting || uploading}
          type="submit"
          className="hover:bg-primary-dark w-full rounded-lg bg-red-500 p-2 text-white"
        >
          Submit
        </button>
      </form>
    </Wrapper>
  );
};

export default ProductForm;
