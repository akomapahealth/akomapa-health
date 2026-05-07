"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { parseVideoUrl } from "@/lib/video-utils";

type Props = {
  open: boolean;
  videoUrl: string | null;
  title: string;
  onOpenChange: (open: boolean) => void;
};

export default function HeroVideoModal({ open, videoUrl, title, onOpenChange }: Props) {
  const embed = videoUrl ? parseVideoUrl(videoUrl) : null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[70] w-[min(96vw,1100px)] -translate-x-1/2 -translate-y-1/2 outline-none focus:outline-none"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
            <div className="relative aspect-video w-full">
              {embed ? (
                <iframe
                  src={embed.embedUrl}
                  title={title}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[#FCFAEF]">
                  Video unavailable
                </div>
              )}
            </div>
            <Dialog.Close
              className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black/40"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
