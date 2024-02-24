import { Container } from '@/components/layout';
import { Heading } from '@/components/ui';
import { AccountInfo } from './components/account-info';

import { getCurrentUser } from '@/lib/service';

export default async function Account() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error('No current user');
  }

  return (
    <Container maxWidth={'max-w-[910px]'}>
      <main>
        <div className='sm:mt-8'>
          <Heading>Account Info</Heading>
          <div className='mt-10'>
            <AccountInfo
              id={currentUser.id}
              name={currentUser.name}
              username={currentUser.username || ''}
              email={currentUser.email}
              image={currentUser.image}
            />
          </div>
        </div>
      </main>
    </Container>
  );
}
