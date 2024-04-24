import Overlay from '@/components/ui/Overlay';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="w-[95%] mx-auto max-w-[1450px]">
      <div className="relative h-[500px] w-full">
        <Image
          src="/assets/about (1).jpg"
          alt="about page image"
          fill
          className="object-cover"
        />
        <Overlay />
        <h1 className="flex absolute w-full h-full justify-center items-center text-4xl font-extrabold uppercase text-white">
          About Us
        </h1>
      </div>

      <div className="leading-8 text-lg bg-white mt-[-80px] relative w-[90%] m-auto rounded-lg p-5 shadow-xl text-center max-md:mt-0 max-md:w-full max-md:bg-transparent max-md:shadow-none">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum
          officiis beatae animi. Odit illum voluptates, autem voluptatem ratione
          eaque in placeat. Pariatur enim atque magni error dolorum ad ut
          numquam! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Maiores quaerat sequi hic quidem tenetur, omnis amet aut doloremque
          consectetur ullam, et voluptas molestias dolorem beatae illum
          accusamus nihil saepe est! Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Dolorum ut velit sit dolorem dolore iure ex
          voluptatibus excepturi, illum temporibus incidunt eligendi nam?
          Dignissimos, accusantium veritatis dolorum vitae maxime deserunt!
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
          aspernatur corporis quo adipisci voluptates? A explicabo quod quas
          adipisci voluptas, asperiores, incidunt fugiat ab, pariatur nisi sed
          officiis quaerat aliquid! Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Dolore nobis ea mollitia quisquam, eius id provident
          repellat a quae. Obcaecati facilis dignissimos, reiciendis beatae
          perspiciatis saepe ipsum voluptatibus quam maxime? Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quasi, rem. At necessitatibus
          aliquam tempore ea soluta assumenda aut, iusto, corrupti, sit quaerat
          numquam quibusdam explicabo temporibus reprehenderit minima. Nam,
          quaerat.
        </p>

        <div className="w-full items-center flex justify-center">
          <Image
            src="/assets/signature (1).png"
            width={500}
            height={500}
            alt="signature"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
