"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-sm text-center ">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
          <CardDescription className="text-black">
            Failed to load products
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
