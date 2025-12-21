import { ArrowDownRightIcon } from "lucide-react";

import { MotionPreset } from "@/components/ui/motion-preset";
import { SpinningText } from "@/components/spinning-text";
import { TextScramble } from "@/components/text-scramble";

import { InfoSvg } from "@/components/assets/info-svg";

export function Hero() {
  return (
    <section className="flex-1 pt-10 mb-10 sm:mb-16 md:24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <MotionPreset
          component="h1"
          fade
          slide={{ direction: "up", offset: 50 }}
          delay={0.2}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 text-center text-9xl leading-[1.15] font-black text-balance max-md:text-4xl"
        >
          SHOP SMARTER, SHOP FASTER
        </MotionPreset>
        <div className="relative flex h-full flex-col items-center justify-center gap-10 max-lg:pb-10 lg:max-2xl:flex-row">
          <div className="pointer-events-none z-10 shrink lg:-mt-47">
            <MotionPreset
              fade
              zoom
              delay={0.5}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <img
                src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/hero/image-35.png"
                alt="socialmedia"
                className="w-full max-w-212"
              />
            </MotionPreset>
          </div>
          <div className="flex shrink-0 grow flex-col gap-6">
            <div className="max-w-sm 2xl:absolute 2xl:top-26 2xl:-left-69 2xl:max-w-64">
              <div className="relative z-10">
                <MotionPreset
                  blur
                  fade
                  delay={1.5}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  <TextScramble className="z-10 text-lg font-semibold 2xl:max-w-55">
                    Wide Product Selection
                  </TextScramble>

                  <p className="text-muted-foreground z-10 font-light 2xl:max-w-55">
                    Browse thousands of products across multiple categories,
                    from electronics to home essentials.
                  </p>
                </MotionPreset>
                <span className="absolute top-1 left-53 z-10 max-2xl:hidden">
                  <InfoSvg />
                </span>
              </div>
            </div>
            <div className="max-w-sm 2xl:absolute 2xl:bottom-72 2xl:-left-79 2xl:max-w-64">
              <div className="relative z-10">
                <MotionPreset
                  blur
                  fade
                  delay={1.5}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  <TextScramble className="z-10 text-lg font-semibold">
                    Secure Checkout
                  </TextScramble>
                  <p className="text-muted-foreground z-10 font-light">
                    Shop with confidence using our secure Stripe payment
                    integration and encrypted transactions for all your
                    purchases.
                  </p>
                </MotionPreset>
                <span className="absolute top-1 left-53 z-10 max-2xl:hidden">
                  <InfoSvg />
                </span>
              </div>
            </div>
            <div className="max-w-sm 2xl:absolute 2xl:top-21 2xl:-right-68 2xl:max-w-64">
              <div className="relative z-10">
                <MotionPreset
                  blur
                  fade
                  delay={1.5}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  <TextScramble className="z-10 text-lg font-semibold">
                    Fast Order Tracking
                  </TextScramble>
                  <p className="text-muted-foreground z-10 font-light">
                    Track your orders in real-time and view your complete
                    purchase history anytime, anywhere with ease.
                  </p>
                </MotionPreset>
                <span className="absolute top-1 right-66 z-10 rotate-y-180 max-2xl:hidden">
                  <InfoSvg />
                </span>
              </div>
            </div>
          </div>
          <MotionPreset
            component="div"
            fade
            slide={{ direction: "down", offset: 50 }}
            delay={1}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="-right-100 bottom-70 duration-300 2xl:absolute"
          >
            <div className="relative">
              <div className="border-foreground outline-foreground flex size-26 items-center justify-center rounded-full border outline outline-offset-24">
                <ArrowDownRightIcon className="z-10 size-20" />
              </div>
              <div className="absolute inset-0 w-full translate-y-1/2">
                <SpinningText className="z-10" radius={6}>
                  Shop now • Shop now • Shop now • Shop now •
                </SpinningText>
              </div>
            </div>
          </MotionPreset>
        </div>
      </div>
    </section>
  );
}
