import { Container, EmptyResult, ClientWrapper } from '@/components/layout';
import { Heading } from '@/components/ui';
import { PostForm } from '@/app/posts/components/post-form';
import { getRecipe } from '@/lib/service';

export default async function EditPost({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id);

  if (!recipe) return <EmptyResult />;

  return (
    <Container maxWidth={'max-w-[910px]'}>
      <main>
        <div className='sm:mt-8'>
          <Heading>Edit You Recipe</Heading>
          <ClientWrapper>
            <PostForm recipe={recipe} />
          </ClientWrapper>
        </div>
      </main>
    </Container>
  );
}
