import { AccountRow } from './account-row';

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
    <div className='flex flex-col gap-4 w-full md:w-3/4 mx-auto'>
      <AccountRow label={'Name'} defaultValue={name} name='name' />
      <AccountRow label={'Username'} defaultValue={username} name='username' />
      <AccountRow label={'Email'} defaultValue={email} name='email' />
      <AccountRow
        label={'Image'}
        defaultValue={image || ''}
        isImage
        name='image'
      />
    </div>
  );
};
