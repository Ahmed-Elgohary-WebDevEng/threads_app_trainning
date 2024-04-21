"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { ThreadValidationSchema } from "@/lib/validations/thread";
import { addCommentToThread, createThread } from "@/lib/actions/thread.actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { CommentValidationSchema } from "@/lib/validations/comment";

interface CommentProps {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}
const Comment = ({ threadId, currentUserImg, currentUserId }: CommentProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidationSchema),
    defaultValues: {
      thread: "",
      accountId: currentUserId,
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidationSchema>) => {
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname,
    );

    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className={"flex items-center gap-3 w-full"}>
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt={"Profile Img"}
                  width={48}
                  height={48}
                  className={"rounded-full object-cover"}
                />
              </FormLabel>
              <FormControl className={"border-none bg-transparent"}>
                <Input
                  type={"text"}
                  className={"no-focus text-light-1 outline-none"}
                  placeholder={"Comment..."}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type={"submit"} className={"comment-form_btn"}>
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
