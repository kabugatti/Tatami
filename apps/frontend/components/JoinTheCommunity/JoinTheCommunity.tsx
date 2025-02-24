import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AvatarImag from "@/public/avatar_joinCommunity.png";
import x_icon from "@/public/x.png";
import { Github, Send } from "lucide-react";
import Image from "next/image";

interface TestimonialProps {
  content: string;
  author: string;
  avatar: string;
  className?: string;
}

function Testimonial({
  content,
  author,
  avatar,
  className = "",
}: TestimonialProps) {
  return (
    <Card
      className={`bg-[#101010] border-[#2C2C2C] p-4 flex flex-col w-full relative ${className}`}
    >
      <div className="relative flex items-center gap-2 mb-2">
        <div className="relative w-8 h-8">
          <Image
            src={avatar || "/placeholder.svg"}
            alt={`${author}'s avatar`}
            width={32}
            height={32}
            className="rounded-full"
          />
          <Image
            src={x_icon}
            alt="X Icon"
            width={12}
            height={12}
            className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <span className="text-[#FFFFFF]">{author}</span>
      </div>
      <p className="text-[#FFFFFF] text-sm flex-grow">{content}</p>
    </Card>
  );
}

export default function JoinCommunity() {
  return (
    <div className="text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
            Join the community
          </h2>
          <p className="mx-auto max-w-[700px] text-secondary md:text-xl">
            Lorem ipsum dolor sit ammet letarsha wut et mortem lortem vitae lid
            perplexit
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="action"
              className="bg-yellow text-black hover:bg-yellow/90"
            >
              GitHub
              <div className="bg-black rounded-full p-1.5 ml-2 flex items-center justify-center">
                <Github className="h-3.5 w-3.5 text-[#FEB913]" />
              </div>
            </Button>
            <Button
              variant="action"
              className="bg-yellow text-black hover:bg-yellow/90"
            >
              Telegram
              <div className="bg-black rounded-full p-1.5 ml-2 flex items-center justify-center">
                <Send className="h-3.5 w-3.5 text-[#FEB913]" />
              </div>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[900px] mx-auto">
          <div className="flex flex-col gap-6">
            <Testimonial
              content="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              author="@drew_tex"
              avatar={AvatarImag.src}
              className="h-[150px] lg:h-[200px]"
            />
            <Testimonial
              content="Good tool!"
              author="@drew_tex"
              avatar={AvatarImag.src}
              className="h-[120px]"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-1 flex items-stretch">
            <Testimonial
              content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              author="@drew_tex"
              avatar={AvatarImag.src}
              className="h-full"
            />
          </div>

          <div className="flex flex-col gap-6">
            <Testimonial
              content="Good tool!"
              author="@drew_tex"
              avatar={AvatarImag.src}
              className="h-[120px]"
            />
            <Testimonial
              content="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              author="@drew_tex"
              avatar={AvatarImag.src}
              className="h-[150px] lg:h-[200px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
