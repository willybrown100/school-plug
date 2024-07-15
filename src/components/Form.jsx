import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import signup from '../services/contactApi';

export default function Form() {
      const {mutate,isLoading,isPending,isError} = useMutation({
        mutationFn: signup,
      });
      console.log(isError, isPending,isLoading);
      
      const { register, reset, handleSubmit } = useForm();
      const onSubmit = function (data) {
        mutate(data);
        console.log(data)
      };
  return (
    <form className="flex gap-2 flex-col" onClick={handleSubmit(onSubmit)}>
      <input
        type="text"
        id="name"
        placeholder="enter name"
        {...register("name")}
        className='text-black'
      />
      <input
        type="email"
        id="email"
        name="email"
        className="text-black"
        {...register("Email")}
      />
      <input type="password" id="password" className='text-black' {...register("Password")} />
      <button className="text-black bg-slate-100">signup</button>
    </form>
  );
}
