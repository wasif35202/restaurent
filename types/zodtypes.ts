import { z } from 'zod';

export const productSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    desc: z.string().min(1, 'Description is required'),
    img: z.string().url('Must be a valid URL'),
    price: z.number().positive('Price must be a positive number'),
    options: z
      .array(
        z.object({
          title: z.string(),
          additionalPrice: z.number().min(0),
        })
      )
      .nonempty('At least one option is required'),
    catSlug: z.string().min(1, 'Category is required'),
    isFeatured: z.boolean().optional().default(false),
  });
  
export type ProductFormValuesZT = z.infer<typeof productSchema>;