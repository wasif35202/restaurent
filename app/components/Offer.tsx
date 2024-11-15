import Image from 'next/image';
import CountDown from '../Count';
import Wrapper from '@/Components/Wrapper';

export const Offer: React.FC = () => {
  return (
    <Wrapper className="relative max-h-[600px] h-[30vw]  bg-white bg-opacity-30 shadow-lg backdrop-blur-lg">
      <Image src="/offer/of1.jpg" fill className="object-cover" alt="" />
   
        <div className="absolute text-3xl font-bold text-white flex gap-5 justify-center items-center flex-col top-0 bottom-0 right-0 left-0">
         <div> Get 25% OFF On Your First Order</div> <div>Offer Ends In</div>  <div><CountDown /></div>
        </div>
    
    </Wrapper>
  );
};
