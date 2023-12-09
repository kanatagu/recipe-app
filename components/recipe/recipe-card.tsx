'use client';

import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heading } from '@/components/ui';
import { Stars } from '@/components/recipe';

export function RecipeCard() {
  const isFavorite = false;
  const rating = 3.5;
  const router = useRouter();

  return (
    <Card
      className='group cursor-pointer'
      onClick={() => router.push(`/recipes/${1}`)}
    >
      <CardHeader className='p-0 relative overflow-hidden'>
        <AspectRatio ratio={3 / 2}>
          <Image
            fill
            src='/images/default_image.jpg'
            alt='Image'
            className='object-cover h-full w-full group-hover:scale-110 transition'
          />
        </AspectRatio>
        <Button
          className={`absolute right-2 z-10 rounded-full ${
            isFavorite ? 'bg-red-200' : 'bg-white'
          }`}
          variant='outline'
          size='icon'
        >
          {isFavorite ? (
            <FaHeart size={18} className='fill-rose-500' />
          ) : (
            <FiHeart size={18} className='text-gray-400' />
          )}
        </Button>
      </CardHeader>

      <CardContent className='p-4'>
        <div className='flex gap-3'>
          <Badge variant='outline'>Italian</Badge>
          <Badge variant='outline'>Simply & Quick</Badge>
        </div>

        <div className='mt-3 line-clamp-3 group-hover:text-slate-600 transition'>
          <Heading as='h2'>Recipe Title</Heading>
        </div>

        <div className='mt-4 flex gap-4'>
          <Stars rating={rating} />
          <span className='text-sm'>{rating} rating</span>
        </div>
      </CardContent>
    </Card>
  );
}
