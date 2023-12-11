import { FiUser } from 'react-icons/fi';
import { format } from 'date-fns';

import { Heading } from '@/components/ui';
import { Stars, Rating } from '@/components/recipe';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { SafeReviewType, SafeUserType } from '@/types';

type ReviewProps = {
  reviews: SafeReviewType[];
  currentUser: SafeUserType | null;
};

export const Review = ({ reviews, currentUser }: ReviewProps) => {
  const test = [...reviews, ...reviews, ...reviews];
  return (
    <div className='flex flex-col gap-4'>
      <Heading as='h2'>Reviews ( {reviews.length} )</Heading>

      {currentUser && (
        <div className='p-4 border flex flex-col gap-4 rounded-sm'>
          <p className='sm:text-lg'>Leave you review!</p>
          <div className='flex flex-col sm:flex-row gap-1 sm:gap-4'>
            <span className='font-semibold  w-20'>Rating</span>
            <Rating />
          </div>
          {/* TODO POST Review + need to update averageReview  */}
          <form>
            <div className='flex flex-col sm:flex-row gap-1 sm:gap-4'>
              <span className='font-semibold  w-20 flex-shrink-0'>Comment</span>
              <Textarea placeholder='What do you think about this recipe?' />
            </div>
            <div className='text-right mt-2'>
              <Button>Submit</Button>
            </div>
          </form>
        </div>
      )}

      <div className='bg-orange-50 px-4'>
        {test.map((review, index) => {
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
                    <AvatarImage src={review.reviewedBy.image || ''} />
                    <AvatarFallback>
                      <FiUser />
                    </AvatarFallback>
                  </Avatar>
                  <div>{review.reviewedBy.username || 'Posted User'}</div>
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
