import React, { FormEvent } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { data, setData, post, processing, errors } = useForm<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post("/login");
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={processing}
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
            />
            {errors.email && (
              <Alert variant="destructive">
                <AlertDescription>{errors.email}</AlertDescription>
              </Alert>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Password</Label>
            <Input
              id="password"
              placeholder="*****"
              type="password"
              disabled={processing}
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
            />
            {errors.password && (
              <Alert variant="destructive">
                <AlertDescription>{errors.password}</AlertDescription>
              </Alert>
            )}
          </div>
          <Button className="w-full" disabled={processing}>
            {processing && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
