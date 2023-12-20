import { LinkType, MetaType } from "@/types/common";
import { Link } from "@inertiajs/react";
import React from "react";
import { buttonVariants } from "./ui/button";

export const SimplePagination = ({
  meta,
  links,
}: {
  meta: MetaType;
  links: LinkType;
}) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <span className="text-sm text-muted-foreground">
          Showing <strong>{meta.from}</strong> to <strong>{meta.to}</strong> of{" "}
          <strong>{meta.total}</strong> results
        </span>
      </div>
      <div className="flex items-center justify-end gap-x-2">
        <Link
          className={buttonVariants({
            variant: "outline",
            size: "sm",
          })}
          disabled={links?.prev === null}
          as="button"
          preserveScroll
          preserveState
          href={links?.prev as string}
        >
          Previous
        </Link>
        <Link
          className={buttonVariants({
            variant: "outline",
            size: "sm",
          })}
          disabled={links?.next === null}
          as="button"
          preserveScroll
          preserveState
          href={links?.next as string}
        >
          Next
        </Link>
      </div>
    </div>
  );
};
