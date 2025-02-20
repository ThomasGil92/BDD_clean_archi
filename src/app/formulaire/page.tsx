import { CreateTicketDTO } from "@/domain/entities/Ticket";
import { useState } from "react";

export default function Formulaire() {
   const [formData, setFormData] = useState<CreateTicketDTO>({ title: "", description: "" });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     alert(`Nom: ${formData.title}, Email: ${formData.description}`);
   };

   return (
     <form
       onSubmit={handleSubmit}
       className='max-w-sm mx-auto p-4 border rounded-lg'
     >
       <div className='mb-4'>
         <label className='block text-sm font-medium'>Nom</label>
         <input
           type='text'
           name='name'
           value={formData.title}
           onChange={handleChange}
           className='mt-1 p-2 w-full border rounded'
         />
       </div>
       <div className='mb-4'>
         <label className='block text-sm font-medium'>Email</label>
         <input
           type='email'
           name='email'
           value={formData.description}
           onChange={handleChange}
           className='mt-1 p-2 w-full border rounded'
         />
       </div>
       <button
         type='submit'
         className='w-full bg-blue-500 text-white p-2 rounded'
       >
         Envoyer
       </button>
     </form>
   );
}