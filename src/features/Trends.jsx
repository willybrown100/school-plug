import React from 'react'
import UserDetails from '../components/UserDetails';
import Bills from '../components/Bills';
import DefaultSchool from '../components/DefaultSchool';
import DesktopCreatingPostButton from '../components/DesktopCreatingPostButton';

export default function Trends() {
   const className = "md:max-w-[1250px]   md:w-[90vw]  m-auto";


 return (
   <div className="min-h-screen  ">
     <div
       className={`${className} md:grid lg:grid-cols-[16rem,1fr,auto] md:grid-cols-[16rem,1fr] gap-x-3 `}
     >
       <UserDetails />
       <div className=" ">
         
           {/* <div className={``}> */}
            
             <div className=" p-4 bg-white flex flex-col gap-y-3">
               <div className="flex gap-x-3 items-center">
                 <img
                   src="\images\yabatech.png"
                   alt="person"
                   className="rounded-full"
                 />
                 <div>
                   <h4 className="uppercase mb-1">yaba tech</h4>
                   <h4 className="capitalize text-sm mb-0 text-stone-500 ">
                     lagos nigeria
                   </h4>
                 </div>
               </div>

               <div>
                 <h4 className="font-heading text-secondary600 font-semibold ">
                   #TrendinginYabaTech
                 </h4>
                 <p className="font-heading">
                   This section contains all the important and trending school
                   gist within the campus. You can use the hashtag above to
                   create a trending post.
                 </p>
               </div>
             {/* </div> */}
           
         </div>
        <p>

         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum minima
         nesciunt in, odit labore unde eius quidem, doloribus libero recusandae
         necessitatibus ut consectetur? Iure eius fuga quia facilis voluptas,
         molestias saepe molestiae harum, voluptatem dolorum iste est. Deserunt
         doloremque sed blanditiis alias, aspernatur perferendis quidem, nam
         consequatur sint sit eaque esse illum magni dolores necessitatibus sunt
         quisquam facere. Impedit pariatur incidunt hic soluta beatae earum
         porro vitae maiores minus, et quidem neque amet consequatur vero id
         quasi ipsum ducimus eum inventore numquam deserunt quam alias? Deserunt
         sed laboriosam adipisci earum ipsam. Nisi labore fuga hic provident
         deleniti adipisci, unde impedit aliquid, autem sunt modi! At numquam
         error consequatur? Praesentium explicabo eos repellat commodi cum
         labore odio iure deleniti sapiente deserunt voluptatem dolor quaerat
         vitae architecto amet aut, officiis quam accusantium rem. Eligendi amet
         illum, eius fugit necessitatibus minima a cum rem? Error sunt cum iste
         quos ipsum mollitia aliquid dolor. A temporibus eveniet quod illum
         voluptates quidem reiciendis doloribus quibusdam recusandae possimus,
         mollitia sed veritatis amet repudiandae sunt debitis natus cupiditate
         laboriosam eius! Et id voluptates laudantium odit sapiente itaque
         accusamus suscipit, natus impedit. Recusandae, tenetur, ullam nihil
         inventore voluptatem dolor quidem aspernatur laudantium voluptatibus,
         fuga eligendi incidunt? Maxime, quia. Lorem ipsum dolor sit, amet
         consectetur adipisicing elit. Distinctio porro optio nobis harum,
         facilis mollitia sit, quos quas deserunt, possimus obcaecati quisquam
         sunt quo alias accusantium cum est quae totam omnis voluptatem iure.
         Magni rem at ab eaque aspernatur praesentium ullam. Nostrum quae
         officiis fugiat dolores qui temporibus reiciendis, maiores
         exercitationem earum. Soluta nisi debitis aliquam eum impedit magnam
         non distinctio officiis, eaque excepturi accusantium animi molestiae
         doloribus? Dicta consequatur esse pariatur accusamus at quam libero
         saepe? Dolorem labore unde in repudiandae molestias accusantium eos
         ullam, excepturi soluta. Modi quas repudiandae optio aut facere cumque
         consequatur dolor quisquam ipsam quod?
        </p>
       </div>



       <Bills />
     </div>
   </div>
 );
}

  