"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function AddEmployeeDialog() {
  const [employeeCode, setEmployeeCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("L1");
  const [gender, setGender] = useState("Male");

  function handleSave() {
    console.log({
      employeeCode,
      fullName,
      role,
      gender,
    });
  }

  return (
    <Dialog>

      <DialogTrigger
        render={<Button />}
      >
        Add Employee
      </DialogTrigger>

      <DialogContent className="max-w-xl">

        <DialogHeader>

          <DialogTitle>
            Add Employee
          </DialogTitle>

          <DialogDescription>
            Fill in employee information.
          </DialogDescription>

        </DialogHeader>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Employee Code
            </label>

            <Input
              value={employeeCode}
              onChange={(e)=>setEmployeeCode(e.target.value)}
              placeholder="L1008"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <Input
              value={fullName}
              onChange={(e)=>setFullName(e.target.value)}
              placeholder="John Smith"
            />

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>

              <label className="mb-2 block text-sm font-medium">
                Role
              </label>

              <select
                value={role}
                onChange={(e)=>setRole(e.target.value)}
                className="h-10 w-full rounded-md border px-3"
              >
                <option>L1</option>
                <option>L2</option>
              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Gender
              </label>

              <select
                value={gender}
                onChange={(e)=>setGender(e.target.value)}
                className="h-10 w-full rounded-md border px-3"
              >
                <option>Male</option>
                <option>Female</option>
              </select>

            </div>

          </div>

        </div>

        <DialogFooter showCloseButton>

          <Button
            onClick={handleSave}
          >
            Save Employee
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>
  );
}