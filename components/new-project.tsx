"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from './ui/textarea';
import { Loader2, Plus } from 'lucide-react';
import { createProject } from '@/actions/projects.action';
import { useRouter } from 'next/navigation';

const NewProject = () => {
  const [ error, setError ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await createProject(formData);

      if (result.redirectTo) {
        router.push(result.redirectTo);
      } else {
        console.log('Project created successfully');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" size="icon">
          <Plus className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Create a new project to get started.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="text-red-500 text-sm">
            <p>{error}</p>
          </div>
        )}
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input id="name" name='name' placeholder="Project Name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="url">URL</Label>
              <Input type="url" id="url" name="url" placeholder="https://example.com" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Description (optional)" className="h-[100px]" />
          </div>
          <DialogFooter>
            <Button type="submit">{loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Creating...</> : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProject;
