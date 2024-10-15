import React, { useEffect, useRef, useState } from 'react'
import UserDetails from '../components/UserDetails'
import { GoPlus } from 'react-icons/go';
import Bills from '../components/Bills';
import DefaultSchool from '../components/DefaultSchool';
import DesktopCreatingPostButton from '../components/DesktopCreatingPostButton';

export default function HomePage() {
  const className = "md:max-w-[1170px]   md:w-[90vw]  m-auto";

  return (
    <div className="min-h-screen  ">
      <div
        className={`${className} md:grid lg:grid-cols-[16rem,1fr,auto] md:grid-cols-[16rem,1fr] gap-x-3 `}
      >
        <UserDetails />
        <div className=" ">
          <DefaultSchool />
          <DesktopCreatingPostButton />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum minima
          nesciunt in, odit labore unde eius quidem, doloribus libero recusandae
          necessitatibus ut consectetur? Iure eius fuga quia facilis voluptas,
          molestias saepe molestiae harum, voluptatem dolorum iste est. Deserunt
          doloremque sed blanditiis alias, aspernatur perferendis quidem, nam
          consequatur sint sit eaque esse illum magni dolores necessitatibus
          sunt quisquam facere. Impedit pariatur incidunt hic soluta beatae
          earum porro vitae maiores minus, et quidem neque amet consequatur vero
          id quasi ipsum ducimus eum inventore numquam deserunt quam alias?
          Deserunt sed laboriosam adipisci earum ipsam. Nisi labore fuga hic
          provident deleniti adipisci, unde impedit aliquid, autem sunt modi! At
          numquam error consequatur? Praesentium explicabo eos repellat commodi
          cum labore odio iure deleniti sapiente deserunt voluptatem dolor
          quaerat vitae architecto amet aut, officiis quam accusantium rem.
          Eligendi amet illum, eius fugit necessitatibus minima a cum rem? Error
          sunt cum iste quos ipsum mollitia aliquid dolor. A temporibus eveniet
          quod illum voluptates quidem reiciendis doloribus quibusdam recusandae
          possimus, mollitia sed veritatis amet repudiandae sunt debitis natus
          cupiditate laboriosam eius! Et id voluptates laudantium odit sapiente
          itaque accusamus suscipit, natus impedit. Recusandae, tenetur, ullam
          nihil inventore voluptatem dolor quidem aspernatur laudantium
          voluptatibus, fuga eligendi incidunt? Maxime, quia. Lorem ipsum dolor
          sit, amet consectetur adipisicing elit. Distinctio porro optio nobis
          harum, facilis mollitia sit, quos quas deserunt, possimus obcaecati
          quisquam sunt quo alias accusantium cum est quae totam omnis
          voluptatem iure. Magni rem at ab eaque aspernatur praesentium ullam.
          Nostrum quae officiis fugiat dolores qui temporibus reiciendis,
          maiores exercitationem earum. Soluta nisi debitis aliquam eum impedit
          magnam non distinctio officiis, eaque excepturi accusantium animi
          molestiae doloribus? Dicta consequatur esse pariatur accusamus at quam
          libero saepe? Dolorem labore unde in repudiandae molestias accusantium
          eos ullam, excepturi soluta. Modi quas repudiandae optio aut facere
          cumque consequatur dolor quisquam ipsam quod?
        </div>
        <Bills />
        {/* <FloatingButton/> */}
      </div>
    </div>
  );
}





const FloatingButton = () => {
  const buttonRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      console.log(scrollTop, lastScrollTop);
      if (scrollTop < lastScrollTop) {
        // Scrolling up
        setIsVisible(true);
      } else {
        // Scrolling down
        setIsVisible(false);
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const positionButton = () => {
    if (buttonRef.current) {
      // Set the button to have some space from the right side of the screen
      const rightSpacing = 30; // Adjust this value to set your desired space
      buttonRef.current.style.left = `${window.innerWidth - buttonRef.current.offsetWidth - rightSpacing}px`;
    }
  };

  useEffect(() => {
    // Position the button initially
    positionButton();

    // Adjust the button's position on window resize
    window.addEventListener('resize', positionButton);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', positionButton);
    };
  }, []);

  return (
    <div>

      <button
        ref={buttonRef}
        className={`${isVisible ? "scale-[1]" : "scale-0"} transition-all duration-300 absolute top-[80%] transform -translate-y-1/2 bg-blue-500 text-white py-2 px-4 rounded`}
      >
        <GoPlus className={` text-3xl text-white `} />
      </button>
    </div>
  );
};
//  isVisible ? "translate-y-0" : "translate-y-full"




