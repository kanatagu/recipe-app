import { FiUser } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type AccountInfoProps = {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string | null;
};
export const AccountInfo = ({
  id,
  name,
  username,
  email,
  image,
}: AccountInfoProps) => {
  return (
    <div className='flex flex-col gap-4 w-3/4 mx-auto'>
      <div className='border-solid border-b'>
        <h2 className='font-semibold'>Name</h2>
        <div className='flex justify-between py-2 items-center'>
          <div>{name}</div>
          <Button variant={'outline'}>Edit</Button>
        </div>
      </div>

      <div className='border-solid border-b'>
        <h2 className='font-semibold'>Username</h2>
        <div className='flex justify-between py-2 items-center'>
          <div>{username}</div>
          <Button variant={'outline'}>Edit</Button>
        </div>
      </div>

      <div className='border-solid border-b'>
        <h2 className='font-semibold'>Email</h2>
        <div className='flex justify-between py-2 items-center'>
          <div>{email}</div>
          <Button variant={'outline'}>Edit</Button>
        </div>
      </div>

      <div className='border-solid border-b'>
        <h2 className='font-semibold'>Image</h2>
        <div className='flex justify-between py-2 items-center'>
          <Avatar>
            <AvatarImage src={image || ''} />
            <AvatarFallback>
              <FiUser />
            </AvatarFallback>
          </Avatar>
          <Button variant={'outline'}>Edit</Button>
        </div>
      </div>
    </div>
  );
};
