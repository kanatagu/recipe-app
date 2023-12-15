import { Container } from '@/components/layout';
import { Heading } from '@/components/ui';
import { PostForm } from '@/app/posts/components';

export default function CreatePost() {
  return (
    <Container maxWidth={'max-w-[910px]'}>
      <main>
        <div className='sm:mt-8'>
          <Heading>Add You Recipe</Heading>
          <PostForm />
        </div>
      </main>
    </Container>
  );
}
