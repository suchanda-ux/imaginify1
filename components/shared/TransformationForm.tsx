"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { defaultValues, transformationTypes } from "@/constants";
import { CustomField } from "./CustomField";
// ✅ Explicitly Export `formSchema`
export const formSchema = z.object({
  username: z.string().min(2).max(50),
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});const TransformationForm = ({ action, data = null,userId, type, creditBalance }: TransformationFormProps) => {

  const transformationType=transformationTypes[type];
  const [image, setImage] = useState(data)
  const [newTransformation, setnewTransformation] = useState<Transformations | null>(null)
  const initialValues =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const onSelectFileHandler =(value:String,onChangeField:(value:string)=>void)=>{

  }

  const onInputChangeHandler =(fieldName:string, value:string, type:string, onChangeField:(value:string)=>
  void)=>{
    
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <CustomField 
          control={form.control}
          name="title"
          formLabel="Image Title"
          className="w-full"
          render={({ field }) => <Input {...field} className="input-field" />}
        />
        <Button 
          type="submit"
          className="submit-button capitalize">Submit
        </Button>

        { type ==='fill' && (
          <FormField
            control={form.control}
            name="aspectRatio"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Aspect Ratio</FormLabel> {/* ✅ Move label inside FormItem */}
                <Select {...field}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Aspect Ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16:9">16:9</SelectItem>
                    <SelectItem value="4:3">4:3</SelectItem>
                    <SelectItem value="1:1">1:1</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        {(type==='remove' || type==='recolor') && (
          <div className="prompt-field">
            <CustomField
              control={form.control}
              name="prompt"
              formLabel={
                type ==='remove' ? 'Object to remove' : 'object to recolor'
              }
              className="w-full"
              render={(({field})=>(
                <Input
                  value={field.value}
                  className="input-field"
                  onChange={(e) => onInputChangeHandler(
                    'prompt',
                    e.target.value,
                    type,
                    field.onChange
                  )}
                />

        ))}
            />
            {type === 'recolor' && (
              <CustomField
                control={form.control}
                name="color"
                formLabel="Repalcement Color"
                className="w-full"
                render={({field})=>(
                  <Input
                  />
                )}
                />

            )}
          </div>
        )}

      </form>
    </Form>
  );
};
export default TransformationForm;
