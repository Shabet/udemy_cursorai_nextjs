"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "./components/theme-toggle";

export default function Home() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Team Tasks</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">
              Welcome to Team Tasks
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A modern task management application built with Next.js 15, React 19, and shadcn/ui components.
              Experience beautiful design with full light/dark mode support.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>shadcn/ui Button</CardTitle>
                <CardDescription>
                  Various button styles and variants
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Components</CardTitle>
                <CardDescription>
                  Input and Label components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Submit Form</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dialog Component</CardTitle>
                <CardDescription>
                  Modal dialogs with shadcn/ui
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Open Dialog
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Welcome to Team Tasks!</DialogTitle>
                      <DialogDescription>
                        This is a demo dialog showing how shadcn/ui components work together.
                        You can customize these components to fit your needs.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dialog-name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="dialog-name"
                          placeholder="Enter name"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>🎉 Installation Complete!</CardTitle>
              <CardDescription>
                shadcn/ui has been successfully configured with the following components:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">UI Components Installed:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Button</li>
                    <li>Card</li>
                    <li>Dialog</li>
                    <li>Form</li>
                    <li>Input</li>
                    <li>Label</li>
                    <li>Dropdown Menu</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Features Configured:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>✅ Light/Dark mode with next-themes</li>
                    <li>✅ Theme toggle component</li>
                    <li>✅ CSS variables for theming</li>
                    <li>✅ Tailwind CSS v4 integration</li>
                    <li>✅ Next.js 15 & React 19 compatibility</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                You can now start building your application with these beautifully designed components!
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
