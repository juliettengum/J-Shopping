import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Logo Icon */}
      <div className="relative flex items-center justify-center">
        <div className="bg-foreground p-2 rounded-lg">
          <ShoppingBag className="h-6 w-6 text-background" strokeWidth={2.5} />
        </div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col leading-tight">
        <span className="text-xl font-black text-foreground">JShopping</span>
        <span className="text-[0.6rem] font-medium text-muted-foreground tracking-wider uppercase">
          Shop Smarter
        </span>
      </div>
    </div>
  );
};

export default Logo;
