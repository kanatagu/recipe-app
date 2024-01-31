'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { FiUser } from 'react-icons/fi';

import { SubmitButton } from '@/components/ui';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { updateAccount } from '@/lib/actions';

type AccountRowProps = {
  label: string;
  defaultValue: string;
  isImage?: boolean;
  placeholder?: string;
  name: string;
  type: string;
  onAction?: () => Promise<void>;
};

export const AccountRow = ({
  label,
  defaultValue,
  isImage,
  placeholder,
  name,
  type,
}: AccountRowProps) => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const initialState = {
    errors: {},
    values: {},
    message: null,
    status: null,
  };

  const [state, dispatch] = useFormState(updateAccount, initialState);

  console.log('state', state);

  if (isImage)
    return (
      <div className='border-solid border-b'>
        <h2 className='font-semibold'>{label}</h2>
        <div className='flex justify-between py-2 items-center'>
          {isOpenForm ? (
            <form
              action={dispatch}
              className='flex w-full flex-wrap gap-y-2 justify-end md:justify-between'
            >
              <Input
                type={type}
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className='w-full md:w-[340px]'
              />

              <div className='flex gap-3'>
                <SubmitButton text='Save' className='w-8 h-auto' />
                <Button
                  variant={'outline'}
                  onClick={() => setIsOpenForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              <Avatar>
                <AvatarImage src={defaultValue} />
                <AvatarFallback>
                  <FiUser />
                </AvatarFallback>
              </Avatar>

              <Button variant={'outline'} onClick={() => setIsOpenForm(true)}>
                Edit
              </Button>
            </>
          )}
        </div>
      </div>
    );

  return (
    <div className='border-solid border-b'>
      <h2 className='font-semibold'>{label}</h2>
      <div className='flex justify-between py-2 items-center'>
        {isOpenForm ? (
          <form
            action={dispatch}
            className='flex w-full flex-wrap gap-y-2 justify-end md:justify-between'
          >
            <Input
              type={type}
              name={name}
              placeholder={placeholder}
              defaultValue={defaultValue}
              className='w-full md:w-[340px]'
            />
            <div className='flex gap-3'>
              <SubmitButton text='Save' className='w-8 h-auto' />
              <Button variant={'outline'} onClick={() => setIsOpenForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <>
            <div>{defaultValue}</div>
            <Button variant={'outline'} onClick={() => setIsOpenForm(true)}>
              Edit
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
