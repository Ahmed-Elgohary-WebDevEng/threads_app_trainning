"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThreadValidationSchema } from "@/lib/validations/thread";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { isBase64Image } from "@/lib/utils";
import { updateUser } from "@/lib/actions/user.actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createThread } from "@/lib/actions/thread.actions";

const PostThread = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(ThreadValidationSchema),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidationSchema>) => {
    await createThread({
      threadData: {
        text: values.thread,
        author: userId,
      },
      path: pathname,
    });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className={"flex flex-col gap-3 w-full"}>
              <FormLabel className={"text-base-semibold text-light-2"}>
                Content
              </FormLabel>
              <FormControl
                className={"flex-1 text-base font-semibold text-gray-200"}
              >
                <Textarea
                  className={
                    "account-form_input no-focus border border-dark-4 bg-dark-3 text-light-1"
                  }
                  rows={15}
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage className={"text-red-400"} />
            </FormItem>
          )}
        />
        <Button type={"submit"} className={"bg-primary-500"}>
          Post Thread
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;
