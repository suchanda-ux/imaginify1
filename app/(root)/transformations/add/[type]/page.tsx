import Header from '@/components/shared/Header';
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params }: { params: Promise<{ type: string }> }) => {
  const { type } = await params; 

  const { userId } = await auth();
  console.log("Clerk Authenticated User ID:", userId);
  if (!userId) redirect('/sign-in');

  const transformation = transformationTypes[type as keyof typeof transformationTypes]; // Safe indexing.
  const user = await getUserById("user_2qAMzAtrZNWLvnPF1MMJneXCYp3");

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}  
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;
