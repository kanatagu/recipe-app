'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser } from 'react-icons/fi';
import { format } from 'date-fns';

import { Heading } from '@/components/ui';
import { Stars, Rating } from '@/components/recipe';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { SubmitButton } from '@/components/ui/submit-button';
import { Input } from '@/components/ui/input';

import { SafeReviewType, SafeUserType } from '@/types';
import { createReview } from '@/lib/actions';

type ReviewProps = {
  reviews: SafeReviewType[];
  currentUser: SafeUserType | null;
  recipeId: string;
};

type ValidationErrors = {
  errors?: {
    rating?: string[];
    comment?: string[];
  };
};

export const Review = ({ reviews, currentUser, recipeId }: ReviewProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState<ValidationErrors | null>(
    null
  );
  const [rating, setRating] = useState<number>(0);

  const handleRating = useCallback((rate: number) => {
    setRating(rate);
  }, []);

  const onSubmit = async (formData: FormData) => {
    setErrorMessage(null);
    await createReview(formData, recipeId)
      .then((res) => {
        if (res?.errors) {
          setErrorMessage(res);
          return;
        }

        router.refresh();
        toast({
          variant: 'success',
          title: 'Successfully posted your review!',
        });
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Something went wrong...',
          description: 'Please try again later.',
        });
      });
  };

  return (
    <div className='flex flex-col gap-4'>
      <Heading as='h2'>Reviews ( {reviews.length} )</Heading>

      {currentUser && (
        <form
          action={onSubmit}
          className='p-4 border flex flex-col gap-4 rounded-sm'
        >
          <p className='sm:text-lg'>Leave you review!</p>
          <div className='flex flex-col sm:flex-row gap-1 sm:gap-4'>
            <span className='font-semibold  w-20'>Rating</span>
            <div className='flex flex-col'>
              <Rating onClick={handleRating} />
              <Input
                type='number'
                name='rating'
                value={rating}
                className='hidden'
                // NOTE Need to pass onChange prop to avoid React warning
                onChange={() => {}}
              />
              {errorMessage?.errors?.rating &&
                errorMessage.errors.rating.map((error) => (
                  <p
                    key={error}
                    className='text-red-600 text-sm'
                    id='name-error'
                    aria-live='polite'
                  >
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className='flex flex-col sm:flex-row gap-1 sm:gap-4'>
            <span className='font-semibold  w-20 flex-shrink-0'>Comment</span>
            <div className='w-full'>
              <Textarea
                name='comment'
                placeholder='What do you think about this recipe?'
              />
              {errorMessage?.errors?.comment &&
                errorMessage.errors.comment.map((error) => (
                  <p
                    key={error}
                    className='text-red-600 text-sm'
                    id='name-error'
                    aria-live='polite'
                  >
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className='text-right mt-2'>
            <SubmitButton text='Submit' showPendingText={false} />
          </div>
        </form>
      )}

      <div className='bg-orange-50 px-4'>
        {reviews.map((review, index) => {
          const date = new Date(review.createdAt);
          const formattedDate = format(date, 'MMMM dd, yyyy');
          return (
            <div
              className={`flex flex-col gap-4  ${
                index > 0 && 'border-t'
              } border-t-stone-200 border-solid py-4`}
              key={review.id}
            >
              <div className='flex gap-4 items-center justify-between'>
                <div className='flex gap-2 items-center'>
                  <Avatar>
                    <AvatarImage src={review.reviewedBy?.image || ''} />
                    <AvatarFallback>
                      <FiUser />
                    </AvatarFallback>
                  </Avatar>
                  <div>{review.reviewedBy?.username}</div>
                </div>
                <span className='text-sm'>{formattedDate}</span>
              </div>
              <div className='flex gap-2'>
                <Stars rating={review.rating} />
              </div>
              <div className='flex gap-4'>
                <p>{review.comment}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
