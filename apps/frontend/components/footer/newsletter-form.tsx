"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FormEvent } from "react";

export const NewsletterForm = () => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // TODO: Handle subscription to newsletter
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex gap-2">
      <Input
        type="email"
        placeholder="Email"
        className="border-width-2 p-0 mr-2"
        variant="footer"
      />
      <Button
        type="submit"
        className="bg-primary text-black hover:bg-primary/90 px-6 text-sm px-4 rounded-full"
      >
        Subscribe
      </Button>
    </form>
  );
};
